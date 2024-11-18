const mongoose = require('mongoose')

const SingleStudentScoresSchema = new mongoose.Schema({
    student: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        //required: true
    },
    midterm: {
        type: Number,
        min: 0,
        max: 100,
    },
    finalExam: {
        type: Number,
        min: 0,
        max: 100,
    },
    finalGrade: {
        type: String,
        enum: ['A', 'B', 'C', 'D', 'F', '_'],
        default: '_'
    }
  });

  const SubjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide subject name'],
        maxlength: 50,
        minlength: 3,
        unique: true
    },
    teacher: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    students: [SingleStudentScoresSchema],
})


    //     $match: {_id: this._conditions._id}    
// SubjectSchema.post('updateOne', async function() {
//     console.log(this.students.$)
//     if(this.getUpdate()['$set']['students.$.midterm'] && this.getUpdate()['$set']['students.$.finalExam']){
//         const total = this.getUpdate()['$set']['students.$.midterm'] + this.getUpdate()['$set']['students.$.finalExam']
//         if(total < 100) {
            
//         }
//     }
// })

module.exports = mongoose.model('Subject', SubjectSchema);