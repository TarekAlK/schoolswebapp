import React from 'react'
import StudentClasses from '../admin/StudentClasses'
import { useLocation } from 'react-router-dom'

export default function MyGrades() {
    const studentId = JSON.parse(localStorage.getItem('user')).id
    const name = JSON.parse(localStorage.getItem('user')).name
    const email = JSON.parse(localStorage.getItem('user')).email

    const location = useLocation()

    const studentInfo = {
        studentId,
        name,
        email
    }
console.log(location)
  return (
    <div>
        <StudentClasses
            studentInfo = {studentInfo}
         />
    </div>
  )
}
