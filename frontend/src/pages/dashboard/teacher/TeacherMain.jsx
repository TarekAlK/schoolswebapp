import React from 'react'
import DashboardNav from '../../../components/DashboardNav'
import ClassGradesChart from '../../../components/charts/ClassGradesChart'
import ClassProgressChart from '../../../components/charts/ClassProgressChart'

export default function TeacherMain() {
    const firstLink = '/dashboard/teacher/addstudent'
    const firstLinkText = 'Add Student'
    const secondLink = '/dashboard/teacher/studentslist'
    const secondLinkText = "student's List"

    const subjectId = JSON.parse(localStorage.getItem('user')).subjectId[0]
    const teacherName = JSON.parse(localStorage.getItem('user')).name

  return (
    <div>
      <DashboardNav
          firstLink={firstLink}
          firstLinkText={firstLinkText}
          secondLink={secondLink}
          secondLinkText={secondLinkText}
      />
      <div className='p-10 font-bold text-4xl flex flex-col items-center gap-5 text-teal-800'>
        <h1>Hi {teacherName}</h1>
        <h1>How Are We Today</h1>
      </div>
      <div className='p-10 flex flex-col items-center gap-10'>
        <ClassGradesChart subjectId={subjectId}/>
        <ClassProgressChart subjectId={subjectId}/>
      </div>
    </div>
  )
}
