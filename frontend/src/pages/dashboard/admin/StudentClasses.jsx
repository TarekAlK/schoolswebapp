import React, {useState, useEffect} from 'react'
import useAxios from '../../../hooks/useAxios'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

export default function StudentClasses({studentInfo}) {
    const [response, duplicatedResponse, loading, error, fetchData,] = useAxios();
    const [page, setPage] = useState(1)

    const location = useLocation()
    const navigate = useNavigate();

    const userRole = JSON.parse(localStorage.getItem('user')).role
    
    const studentId = studentInfo === undefined ? location.state.studentId : studentInfo.studentId
    const studentName = studentInfo === undefined ? location.state.name : studentInfo.name
    const studentEmail = studentInfo === undefined ? location.state.email : studentInfo.email
    // const studentId = location.state.notification === undefined ? location.state.studentId : studentInfo.studentId
    // const studentName = location.state.notification === undefined ? location.state.name : studentInfo.name
    // const studentEmail = location.state.notification === undefined ? location.state.email : studentInfo.email

    const getData = async () => {
        await fetchData({
          method: 'get',
          url: `/studentcourses?studentid=${studentId}&&role=${userRole}`,
        })
      }

    useEffect(() => {
        if(response.length === 0 && studentId !== null){
          getData()
        }
      }, [])

      const handlePageChange = (pageNumber) => {
        if (
          pageNumber > 0 &&
          pageNumber <= Math.ceil(response.length / 7) &&
          pageNumber !== page
        ) {
          setPage(pageNumber);    
        }
      };

      if(loading || response === undefined) {
        return (
          <div>
            <h1>
              Loading...
            </h1>
          </div>
        )
      }
    
      if(response.length === 0) {
        return (
          <div className='p-20 text-2xl flex flex-col gap-10'>
            <h1>Student Have No classes</h1>
            {/* <Link to={'../dashboard/admin/teacherslist'}> */}
            <Link to='..' relative='path'>
              <h1 className='text-btnColor hover:opacity-70'>Go Back</h1>
            </Link>
          </div>
        )
      }

  return (
    <div>
      <div className='flex flex-col justify-center items-center gap-3 text-2xl mt-8'>
        <h1>Student Name: {studentName}</h1>
        <h1>Student Email: {studentEmail}</h1>
      </div>
      <div className='grid grid-cols-4 p-5 justify-items-center'>
        <h1>Class Name</h1>
        <h1>Midterm</h1>
        <h1>Final Exam</h1>
        <h1>Final Score</h1>
      </div>
      {duplicatedResponse.slice(page * 7 - 7, page * 7).map((student) => {
        return <div key = {student._id}
          className={`relative break-words mb-1 p-5 border-2 border-btnColor rounded-md`}>
          {userRole !== 'admin' && <div className={`animate-[fading_3s_ease-in-out_forwards] absolute inset-y-0 left-0 w-full h-full ${location.state.notification && location.state.notification.includes(student._id) &&
            //`transition-colors ease-in-out duration-500 ${student.students.finalGrade === 'A' ? 'bg-blue-200' :
            `${student.students.finalGrade === 'A' ? 'bg-blue-200 text-blue-800' :
            student.students.finalGrade === 'B' ? 'bg-green-200 text-green-800' :
            student.students.finalGrade === 'F' ? 'bg-red-200 text-red-800' : 'bg-gray-200 text-gray-800'}`}`}>
            {location.state.notification && location.state.notification.includes(student._id) &&
            <h1 className='h-full text-4xl flex items-center justify-center'>
              {student.students.finalGrade === 'A' ? 'Hard Work Paid Off' :
              student.students.finalGrade === 'B' ? 'Great Result' :
              student.students.finalGrade === 'F' ? 'We Can Do Better Next Time' :
              student.students.finalGrade === '_' ? 'Keep Up The Work' : 'Congratulations You Passed'}
            </h1>}
          </div>}
          <div className='grid grid-cols-4'>
            <h1>{student.name}</h1>
            <h1 className='pl-5 border-l-2 border-r-2 border-btnColor'>{student.students.midterm || 'null'}</h1>
            <h1 className='pl-5 border-r-2 border-btnColor'>{student.students.finalExam || 'null'}</h1>
            <h1 className={`pl-5 font-bold text-2xl ${student.students.finalGrade == 'F' ? 'text-red-600' : student.students.finalGrade == 'A' ? 'text-blue-600' : student.students.finalGrade == 'B' ? 'text-green-600' : 'text-gray-600'}`}>
              {student.students.finalGrade}
            </h1>
          </div>
        </div>
      })}
      <div className=' flex justify-center gap-1'>
        <button onClick={() => handlePageChange(page - 1)}><FaArrowAltCircleLeft className='w-10 h-10 text-btnColor' /></button>
        {[...Array(Math.ceil(duplicatedResponse.length / 7))].map((_, i) => {
          return <span key={i + 1} onClick={() => handlePageChange(i + 1)} className='cursor-pointer p-3 rounded-md text-mainTextColor bg-secondaryColor opacity-85'>{i + 1}</span>
        })}
        <button onClick={() => handlePageChange(page + 1)}><FaArrowAltCircleRight className='w-10 h-10 text-btnColor' /></button>
      </div>
      <div className='ml-6'>
        <button onClick={() => navigate(-1)}><h1 className='text-btnColor hover:opacity-70'>Go Back</h1></button>          
      </div>
    </div>
  )
}
