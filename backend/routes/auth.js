const express = require('express')
const router = express.Router()
const {identifyUser, adminPermission, classListPermission, studentCoursesPermission, studentPermission, teacherPermission} = require('../middleware/authMiddleware')
const {login, logout, getUserProfile, registerTeacher, registerStudent, getTeachersList, getStudentsList, getStudentCourses, getPossibleNotifications, getSubjectId, getSchoolAvg, modifyStudentScores, eliminateStudentFromClass, deleteUser} = require('../controllers/auth')

router.get('/profile', identifyUser, getUserProfile)
router.get('/teacherslist', identifyUser, adminPermission, getTeachersList)
router.get('/studentslist/:subjectId', identifyUser, classListPermission, getStudentsList)
router.get('/studentcourses', identifyUser, studentCoursesPermission, getStudentCourses)
router.get('/possiblenotifications/:studentId', identifyUser, studentPermission, getPossibleNotifications)
router.get('/subjectid/:subjectname', identifyUser, adminPermission, getSubjectId)
router.get('/schoolaverage', identifyUser, adminPermission, getSchoolAvg)
router.post('/auth', login)
router.post('/registerteacher', identifyUser, adminPermission, registerTeacher)
router.post('/registerstudent', identifyUser, teacherPermission, registerStudent)
router.patch('/takeStudentOutOfClass', identifyUser, teacherPermission, eliminateStudentFromClass)
router.patch('/addstudentscores', identifyUser, teacherPermission, modifyStudentScores)
router.delete('/logout', logout)
router.delete('/user/:id', identifyUser, adminPermission, deleteUser)

module.exports = router