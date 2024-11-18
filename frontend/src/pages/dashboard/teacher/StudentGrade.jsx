import React, {useState} from 'react'
import FormContainer from '../../../utils/FormContainer'
import useAxios from '../../../hooks/useAxios'
import { useLocation, useNavigate } from 'react-router-dom'

export default function StudentGrade() {
  const [midtermGrade, setMidtermGrade] = useState('')
  const [finalExam, setFinalExam] = useState('')
    
  const location = useLocation()
  const navigate = useNavigate()

  const [, , , , fetchData] = useAxios();
  const subjectId = JSON.parse(localStorage.getItem('user')).subjectId[0]
    
  const modifyGrades = async (e) => {
    e.preventDefault()
    await fetchData({
      method: 'patch',
      url: '/addstudentscores',
      data: {
        studentId: location.state.studentId,
        studentRecordId: location.state.studentRecordId,
        subjectId,
        midtermGrade,
        finalExam,
      }
    })
    navigate('../dashboard/teacher/studentslist')
  }

  const hOnes = [{
      text: `Student Name: ${location.state.name}`,
      extraClasses: 'text-xl',
  }, {
      text: `Student Email: ${location.state.email}`,
      extraClasses: 'text-xl',
  }]

  const multipleInputs = [{
      type: 'text',
      onChangeFunction: setMidtermGrade,
      value: midtermGrade,
      name: 'midtermGrade',
      placeHolder: 'midterm Grade',
      required: false,
      extraClasses: '',
  }, {
      type: 'text',
      onChangeFunction: setFinalExam,
      value: finalExam,
      name: 'finalExam',
      placeHolder: 'Final Grade',
      required: false,
      extraClasses: '',
  }]
  const multipleButtons = [{
      click: modifyGrades,
      type: 'submit',
      text: 'Enter Student Scores',
      extraClasses: '',
  }]

  return (
    <div>
      <FormContainer
        hOnes = {hOnes}
        multipleInputs = {multipleInputs}
        multipleButtons = {multipleButtons}
      />
    </div>
  )
}
