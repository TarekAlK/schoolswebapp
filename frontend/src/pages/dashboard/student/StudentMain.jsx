import React, {useState, useEffect} from 'react'
import useAxios from '../../../hooks/useAxios';
import { IoMdNotifications } from "react-icons/io";
import { MdNotificationsActive } from "react-icons/md";
import DashboardNav from '../../../components/DashboardNav'
import StudentGradesChart from '../../../components/charts/StudentGradesChart';
import StudentProgressChart from '../../../components/charts/StudentProgressChart';

export default function TeacherMain() {
  const [response, duplicatedResponse, loading, error, fetchData, setResponse, setDuplicatedResponse] = useAxios();

  const firstLink = ''
  const firstLinkText = response.notification && response.notification.length > 0 ? <MdNotificationsActive className='w-6 h-6 text-red-800' /> : <IoMdNotifications className='w-6 h-6'/>
  const secondLink = '/dashboard/student/studentgrades'
  const secondLinkText = "My Grades"
  const secondLinkState = {notification: response.notification}

  const studentId = JSON.parse(localStorage.getItem('user')).id
  const studentName = JSON.parse(localStorage.getItem('user')).name

  const fetchPossibleNotifications = async () => {
    await fetchData({
      method: 'get',
      url: `/possiblenotifications/${studentId}`,
    })
  }

  useEffect(() => {
    fetchPossibleNotifications()
  }, [])

  return (
    <div>
      <DashboardNav
        firstLink={firstLink}
        firstLinkText={firstLinkText}
        secondLink={secondLink}
        secondLinkText={secondLinkText}
        secondLinkState={secondLinkState}
      />
      {response.notification && response.notification.length > 0 &&
      <div className='w-fit p-5 text-xs text-mainTextColor font-bold mt-10 ml-10 bg-red-600 shadow-xl rounded sm:text-base'>
        <h1 className='mb-2'>New Exam Results Are Released!</h1>
        <h1>Please Check My Grades Tab</h1>
        <h1>Or Click On The Notification Bell</h1>
      </div>
      }
      <div className='p-10 font-bold text-4xl flex flex-col items-center gap-5 text-violet-800'>
        <h1>Hi {studentName}</h1>
        <h1>How Are We Today</h1>
      </div>
      <div className='p-10 flex flex-col items-center gap-10'>
        <StudentGradesChart />
        <StudentProgressChart />
      </div>
    </div>
  )
}
