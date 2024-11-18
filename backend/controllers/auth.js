const mongoose = require('mongoose')
const nodemailer = require('nodemailer');
const User = require('../models/User')
const Subject = require('../models/Subject')
const {createJWT} = require('../utils/createJWT')
const {BadRequestError, UnauthenticatedError} = require('../errors')

const login = async (req, res, next) => {
    try {
        const {email, password} = req.body
        if (!email || !password) {
            throw new BadRequestError('Please provide email and password');
        }
        const user = await User.findOne({email: email})
        if (!user) {
            throw new UnauthenticatedError('Invalid Credentials');
        }
        const isPasswordCorrect = await user.comparePassword(password)
        if (!isPasswordCorrect) {
            throw new UnauthenticatedError('Invalid Credentials');
        }
        createJWT(res, user._id)
        res.status(200).json({userId: user._id, userRole: user.role})
    } catch (error) {
        next(error)
    }
}

const logout = async (req, res, next) => {
    try {
        res.cookie('jwt', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            expires: new Date(0)
            
        })
        //res.clearCookie('jwt')
        res.status(200).json({message: 'user logged out'})
    } catch (error) {
        next(error)
    }
}

const registerTeacher = async (req, res, next) => {
    try {
        // const {email} = req.body.email
        // const userExists = await User.findOne({email: email})
        // if(userExists){
        //     throw new BadRequestError('user already exists')
        // }

        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,
            secure: false, // true for port 465, false for other ports
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASSWORD,
            },
          });

        const info = await transporter.sendMail({
          from: process.env.MAIL_USER,
          to: req.body.email,
          subject: 'Welcome To The Internation School Of The Future Generation',
          text: `Mr ${req.body.name} we are glad to have you aboard with us, we hope you have a pleasant journey at our school.
          Please use your id number to login to your account`,
        });

        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
        })

        if(req.body.role === 'teacher') {
            const subject = await Subject.create({
                name: req.body.subject,
                teacher: user._id
            })
            user.subject.push(subject._id)
            user.save()
            return res.status(200).json({name: user.name, id: user._id, subjectId: subject._id})
        }
    } catch (error) {
        next(error)
    }
}

const registerStudent = async (req, res, next) => {
    try {
        // const {email} = req.body.email
        // const userExists = await User.findOne({email: email})
        // if(userExists){
        //     throw new BadRequestError('user already exists')
        // }

        const userExists = await User.findOne({email: req.body.email})
        if(userExists && req.body.role === 'student'){
            const {subjectId} = req.body
            await Subject.updateOne({ _id: subjectId },
             { $push: { students: {student: userExists._id} } });
             userExists.subject.push(subjectId)
             userExists.save()

             return res.status(201).json({name: userExists.name, id: userExists._id, subject: subjectId})
        }

        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,
            secure: false, // true for port 465, false for other ports
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASSWORD,
            },
          });

        const info = await transporter.sendMail({
          from: process.env.MAIL_USER,
          to: req.body.email,
          subject: 'Welcome To The Internation School Of The Future Generation',
          text: `Dear ${req.body.name} we are glad to have you aboard with us, we hope you have a pleasant journey at our school.
          Please use your id number to login to your account`,
        });

        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
        })

        if(req.body.role === 'student') {
            const {subjectId} = req.body
            await Subject.updateOne({ _id: subjectId },
             { $push: { students: {student: user._id} } });
             user.subject.push(subjectId)
             user.save()

             return res.status(201).json({name: user.name, id: user._id, subject: subjectId})
        }

    } catch (error) {
        next(error)
    }
}

const getUserProfile = async (req, res, next) => {
    try {
        if(req.user) {
            res.status(200).json({
                id:req.user._id,
                name: req.user.name,
                email: req.user.email,
                role: req.user.role,
                subjectId: req.user.subject
            })
        } else {
            res.status(404);
            throw new Error('User not found');
          }
    } catch (error) {
        next(error)
    }
}

const getTeachersList = async (req, res, next) => {
    try {
        const teachers = await User.find({role: 'teacher'}).populate('subject', 'name').select('-password')
        if(teachers.length === 0) {
            return res.status(200).json([])
            //return res.status(200).json([{message: 'we have no teachers yet'}])
        }
        res.status(200).json(teachers)
    } catch (error) {
        next(error)
    }
}

const getStudentsList = async (req, res, next) => {    
    try {
        const students = await Subject.findOne({_id: req.params.subjectId}).populate('students.student', '-password')
        if(students.length === 0) {
            return res.status(200).json([])
            //return res.status(200).json([{message: 'you dont have students in your class yet'}])
        }
        res.status(200).json(students.students)
    } catch (error) {
        next(error)
    }
}

const getStudentCourses = async (req, res, next) => {
    try {
        const studentCourses = await Subject.aggregate([{
            $unwind: {path: '$students'}
        }, {
            $match: {'students.student': new mongoose.Types.ObjectId(`${req.query.studentid}`)}
        }, {
            $project: {teacher: 0, __v: 0, 'students._id': 0, 'students.student': 0}
        }])

        if(req.query.role === 'student') {
            await User.updateOne({_id: req.query.studentid}, {$set: {gradeNotification: []}})
            //await User.updateOne({_id: req.query.studentid}, {gradeNotification: false})
            // const notification = await User.findById(req.query.studentid)
            // const pushGradeNotification = {...studentCourses[0], notification: notification.gradeNotification}
            // studentCourses.splice(0, 1, pushGradeNotification)
            // return res.status(200).json(studentCourses)
        }

        res.status(200).json(studentCourses)
    } catch (error) {
        next(error)
    }
}

const getPossibleNotifications = async (req, res, next) => {
    try {
        const notification = await User.findById(req.params.studentId)
        res.status(200).json({notification: notification.gradeNotification})
    } catch (error) {
        next(error)
    }
}

const getSubjectId = async (req, res, next) => {
    try {
        const subject = await Subject.find({name: req.params.subjectname})
        console.log(subject)
        if(subject.length !== 0) {
            return res.status(200).json([{subjectId: subject[0]._id}])
        } else {
            res.status(404);
            throw new Error('Subject not found');
        }
        //const allSubjects = await Subject.find()
        //const randomSubject = allSubjects[Math.floor(Math.random() * allSubjects.length)]
    } catch (error) {
        next(error)
    }
}

const getSchoolAvg = async (req, res, next) => {
    try {
        let a = 0
        let b = 0
        let c = 0
        let d = 0
        let f = 0
        let numberOfGrades = 0
        let totalMidtermScore = 0
        let totalFinalScore = 0

        const gradesInfo = await Subject.find().populate('students')

        gradesInfo.forEach(subject => subject.students.forEach(singleRecord => {
            if(singleRecord.finalGrade === 'A') {
                a = a + 1
                numberOfGrades = numberOfGrades + 1
                totalMidtermScore = totalMidtermScore + singleRecord.midterm
                totalFinalScore = totalFinalScore + singleRecord.finalExam
            }
            if(singleRecord.finalGrade === 'B') {
                b = b + 1
                numberOfGrades = numberOfGrades + 1
                totalMidtermScore = totalMidtermScore + singleRecord.midterm
                totalFinalScore = totalFinalScore + singleRecord.finalExam
            }
            if(singleRecord.finalGrade === 'C') {
                c = c + 1
                numberOfGrades = numberOfGrades + 1
                totalMidtermScore = totalMidtermScore + singleRecord.midterm
                totalFinalScore = totalFinalScore + singleRecord.finalExam
            }
            if(singleRecord.finalGrade === 'D') {
                d = d + 1
                numberOfGrades = numberOfGrades + 1
                totalMidtermScore = totalMidtermScore + singleRecord.midterm
                totalFinalScore = totalFinalScore + singleRecord.finalExam
            }
            if(singleRecord.finalGrade === 'F') {
                f = f + 1
                numberOfGrades = numberOfGrades + 1
                totalMidtermScore = totalMidtermScore + singleRecord.midterm
                totalFinalScore = totalFinalScore + singleRecord.finalExam
            }
        }))

        res.status(200).json({
            schoolGrades: [{grade: 'A', 'school grades spread': a},
                {grade: 'B', 'school grades spread': b},
                {grade: 'C', 'school grades spread': c},
                {grade: 'D', 'school grades spread': d},
                {grade: 'F', 'school grades spread': f}],
                schoolProgress: [{test: 'midterm', 'school progress percentage': totalMidtermScore / numberOfGrades},
                {test: 'final', 'school progress percentage': totalFinalScore / numberOfGrades}],
                schoolPassPercentage: [{result: 'pass', 'school overall result': a + b + c + d}, {result: 'fail', 'school overall result': f}],
        })
    } catch (error) {
        next(error)
    }
}

const modifyStudentScores = async (req, res, next) => {
    try {
        const {midtermGrade, finalExam} = req.body

        if (Number(midtermGrade) < 0 || Number(midtermGrade) > 100 || Number(finalExam) < 0 || Number(finalExam) > 100) {
            throw new BadRequestError('Grades can only be between 0 and 100');
        }

        if(midtermGrade && finalExam) {
            const total = Number(midtermGrade) + Number(finalExam)
            const gradeScale = 
                total < 100 ? 'F' :
                total < 125 ? 'D' :
                total < 150 ? 'C' :
                total < 175 ? 'B' :
                "A"

            await Subject.updateOne({_id: req.body.subjectId, "students._id": req.body.studentRecordId}, {
                $set: {
                    "students.$.midterm": Number(midtermGrade),
                    'students.$.finalExam': Number(finalExam),
                    'students.$.finalGrade': gradeScale,
                }
            })
        } else {
            await Subject.updateOne({_id: req.body.subjectId, "students._id": req.body.studentRecordId}, {
                $set: {
                    "students.$.midterm": Number(midtermGrade),
                    'students.$.finalExam': Number(finalExam),
                    'students.$.finalGrade': '_',
                }
            })
        }
        await User.updateOne({_id: req.body.studentId}, {$push: {gradeNotification: req.body.subjectId}})
        //await User.updateOne({_id: req.body.studentId}, {gradeNotification: true})
        //res.status(204)
        res.status(200).json({message: 'Grades Added'})
    } catch (error) {
        next(error)
    }
}

const eliminateStudentFromClass = async (req, res, next) => {
    try {
        await Subject.updateOne({_id: req.body.subjectId}, {$pull: {students: {_id: req.body.studentRecordId}}})
        await User.updateOne({_id: req.body.studentId}, {$pull: {subject: new mongoose.Types.ObjectId(`${req.body.subjectId}`), gradeNotification: new mongoose.Types.ObjectId(`${req.body.subjectId}`)}})        
        // await User.updateOne({_id: req.body.studentId}, {$pull: {subject: new mongoose.Types.ObjectId(`${req.body.subjectId}`)}})        
        // await User.updateOne({_id: req.body.studentId}, {$pull: {gradeNotification: new mongoose.Types.ObjectId(`${req.body.subjectId}`)}})        
        const students = await Subject.findOne({_id: req.body.subjectId}).populate('students.student', '-password')
        res.status(200).json(students.students)
    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await User.findOneAndDelete({_id: req.params.id})
        res.status(200).json(deletedUser)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    login,
    logout,
    registerTeacher,
    registerStudent,
    getUserProfile,
    getTeachersList,
    getStudentsList,
    getStudentCourses,
    getPossibleNotifications,
    getSubjectId,
    getSchoolAvg,
    modifyStudentScores,
    eliminateStudentFromClass,
    deleteUser
}