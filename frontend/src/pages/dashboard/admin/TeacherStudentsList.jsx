import React, {useState, useEffect} from 'react'
import useAxios from '../../../hooks/useAxios';
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

export default function TeacherStudentsList() {
  const [searchValue, setSearchValue] = useState('')
  const [page, setPage] = useState(1)
  
  const [response, duplicatedResponse, loading, error, fetchData, setResponse, setDuplicatedResponse] = useAxios();

  const location = useLocation()
  const navigate = useNavigate()
  const subjectId = location.state.subject._id

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

  const handleStudentClasses = (name, email, id) => {
    navigate(`../dashboard/admin/studentclasses`, {state:{name: name, email:email, studentId: id}})
  }

  const handleSearchClick = () => {
    if(searchValue === '') {return setDuplicatedResponse(response)}
    const filterBySearch = response.filter((student) => {
      if(student.student.name.toLowerCase().includes(searchValue.toLocaleLowerCase())) {return student}
    })
    if(filterBySearch.length !== 0) {setDuplicatedResponse(filterBySearch)}
    return
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
        <h1>No Students In Class</h1>
        <Link to={'../dashboard/admin/teacherslist'}>
          <h1 className='text-btnColor hover:opacity-70'>Go Back</h1>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className='flex flex-col justify-center items-center gap-3 text-2xl mt-8'>
        <h1>Subject: {location.state.subject.name}</h1>
        <h1>Teacher: {location.state.name}</h1>
      </div>
      <div className='flex justify-center items-center mt-6'>
        <input type="text" onChange={(e) => setSearchValue(e.target.value)} value={searchValue} name='searchValue' placeholder='Search By Name' className='border border-mainColor rounded-md shadow-lg px-10 py-3' />
        <CiSearch onClick={handleSearchClick} className='w-10 h-10 text-btnColor cursor-pointer' />
      </div>
      <div className='grid grid-cols-5 p-5 justify-items-center'>
        <h1>Student's Name</h1>
        <h1>Student's Email</h1>
        <h1>Midterm</h1>
        <h1>Final Exam</h1>
        <h1>Final Score</h1>
      </div>
      {duplicatedResponse.slice(page * 7 - 7, page * 7).map((student) => {
        return <div onClick={() => handleStudentClasses(student.student.name, student.student.email, student.student._id)} key = {student.student._id} className='break-words mb-1 grid grid-cols-5 p-5 border-2 border-btnColor rounded-md cursor-pointer hover:opacity-50'>
          <h1>{student.student.name}</h1>
          <h1 className='pl-5 border-l-2 border-btnColor'>{student.student.email}</h1>
          <h1 className='pl-5 border-l-2 border-r-2 border-btnColor'>{student.midterm || 'null'}</h1>
          <h1 className='pl-5 border-r-2 border-btnColor'>{student.finalExam || 'null'}</h1>
          <h1 className={`pl-5 font-bold text-2xl ${student.finalGrade == 'F' ? 'text-red-600' : student.finalGrade == 'A' ? 'text-blue-600' : student.finalGrade == 'B' ? 'text-green-600' : 'text-gray-600'}`}>
            {student.finalGrade}
          </h1>
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
        <Link to={'../dashboard/admin/teacherslist'}>
          <h1 className='text-btnColor hover:opacity-70'>Go Back</h1>
        </Link>
      </div>
    </div>
  )
}
