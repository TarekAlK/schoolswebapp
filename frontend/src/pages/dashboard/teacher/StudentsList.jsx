import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import DashboardNav from '../../../components/DashboardNav'
import useAxios from '../../../hooks/useAxios';

export default function StudentsList() {
  const [searchValue, setSearchValue] = useState('')
  const [page, setPage] = useState(1)
  
  const firstLink = '/dashboard/teacher'
  const firstLinkText = 'Main Dashboard'
  const secondLink = '/dashboard/teacher/addstudent'
  const secondLinkText = 'Add Student'

  const [response, duplicatedResponse, loading, error, fetchData, setResponse, setDuplicatedResponse] = useAxios();
  const subjectId = JSON.parse(localStorage.getItem('user')).subjectId
  const navigate = useNavigate()
 
  const getData = async () => {
    await fetchData({
      method: 'get',
      url: `/studentslist/${subjectId}`,
    })
  }

  useEffect(() => {
    if(response.length === 0 && subjectId !== null){
      getData()
    }
  }, [])

  const handleSearchClick = () => {
    if(searchValue === '') {return setDuplicatedResponse(response)}
    const filterBySearch = duplicatedResponse.filter((student) => {
      if(student.student.name.toLowerCase().includes(searchValue.toLocaleLowerCase())) {return student}
    })
    if(filterBySearch.length !== 0) {setDuplicatedResponse(filterBySearch)}
    return
  }

  const handleStudentGrade = (name, email, studentId, studentRecordId) => {
    navigate(`../dashboard/teacher/studentgrade`, {state:{name: name, email:email, studentId: studentId, studentRecordId: studentRecordId}})
  }

  const handlePageChange = (pageNumber) => {
    if (
      pageNumber > 0 &&
      pageNumber <= Math.ceil(response.length / 7) &&
      pageNumber !== page
    ) {
      setPage(pageNumber);    
    }
  };

  function takeStudentOutOfClass(id, studentId) {
    const userToBeDeleted = 'studentFromClass'
    fetchData({
      method: 'patch',
      //url: `/user/${id}`,
      url: '/takeStudentOutOfClass',
      data: {
          studentRecordId: id,
          studentId: studentId,
          userToBeDeleted: userToBeDeleted,
          subjectId: subjectId
      }
    })
  }

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
        <h1>No Students Yet In Your Class</h1>
        <h1>Add Someone!</h1>
        <Link to={'../dashboard/teacher/addstudent'}>
          <h1 className='text-btnColor hover:opacity-70'>Add Student To Your Class</h1>
        </Link>
      </div>
    )
  }

  return (
    <div>
        <DashboardNav
            firstLink={firstLink}
            firstLinkText={firstLinkText}
            secondLink={secondLink}
            secondLinkText={secondLinkText}
      />
      <div className='flex justify-center items-center mt-6'>
        <input type="text" onChange={(e) => setSearchValue(e.target.value)} value={searchValue} name='searchValue' placeholder='Search By Name' className='border border-mainColor rounded-md shadow-lg px-10 py-3' />
        <CiSearch onClick={handleSearchClick} className='w-10 h-10 text-btnColor cursor-pointer' />
      </div>
      <div className='grid grid-cols-6 p-5 justify-items-center'>
        <h1>Student's Name</h1>
        <h1>Student's Email</h1>
        <h1>Midterm</h1>
        <h1>Final Exam</h1>
        <h1>Final Score</h1>
        <h1>Student Have Left The Class</h1>
      </div>
      {duplicatedResponse.slice(page * 7 - 7, page * 7).map((student) => {
        return <div onClick={() => handleStudentGrade(student.student.name, student.student.email, student.student._id, student._id)} key = {student.student._id} className='break-words mb-1 grid grid-cols-6 p-5 border-2 border-btnColor rounded-md cursor-pointer hover:opacity-50'>
          <h1 className=''>{student.student.name}</h1>
          <h1 className='pl-5 border-l-2 border-btnColor'>{student.student.email}</h1>
          <h1 className='pl-5 border-l-2 border-r-2 border-btnColor'>{student.midterm || 'null'}</h1>
          <h1 className='pl-5 border-r-2 border-btnColor'>{student.finalExam || 'null'}</h1>
          <h1 className={`pl-5 font-bold text-2xl ${student.finalGrade == 'F' ? 'text-red-600' : student.finalGrade == 'A' ? 'text-blue-600' : student.finalGrade == 'B' ? 'text-green-600' : 'text-gray-600'}`}>
            {student.finalGrade}
          </h1>
          <button onClickCapture={() => takeStudentOutOfClass(student._id, student.student._id)} className='bg-btnColor text-mainTextColor rounded-md py-2 hover:opacity-50'>DELETE</button>
        </div>
      })}
      <div className=' flex justify-center gap-1'>
        <button onClick={() => handlePageChange(page - 1)}><FaArrowAltCircleLeft className='w-10 h-10 text-btnColor' /></button>
        {[...Array(Math.ceil(duplicatedResponse.length / 7))].map((_, i) => {
          return <span key={i + 1} onClick={() => handlePageChange(i + 1)} className='cursor-pointer p-3 rounded-md text-mainTextColor bg-secondaryColor opacity-85'>{i + 1}</span>
        })}
        <button onClick={() => handlePageChange(page + 1)}><FaArrowAltCircleRight className='w-10 h-10 text-btnColor' /></button>
      </div>
    </div>
  )
}

//products?limit=100