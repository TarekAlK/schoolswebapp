import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import DashboardNav from '../../../components/DashboardNav';

export default function TeachersList() {
  const [teachersFullList, setTeachersFullList] = useState([])
  const [teachersList, setTeachersList] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [isLoading, setIsloading] = useState(false)
  const [page, setPage] = useState(1)

  const navigate = useNavigate()

  const firstLink = '/dashboard/admin'
  const firstLinkText = 'Main Dashboard'
  const secondLink = '/dashboard/admin/addteacher'
  const secondLinkText = 'Add Teacher'

  const fetchData = async () => {
      setIsloading(true)
      const teachers = await axios.get('http://localhost:5000/api/teacherslist', {
        withCredentials: true
      })
      setTeachersFullList(teachers.data)
      setTeachersList(teachers.data)
      setIsloading(false)
      //console.log(teachers.data)
  }

  useEffect(() => {
    try {
      if(teachersFullList.length === 0) {
        fetchData()
      }
    } catch (error) {
      console.error(error)
    }
  }, [])

  const handleStudentList = (e, name, subject) => {
    e.stopPropagation()
    navigate(`../dashboard/admin/teacherstudentslist`, {state:{name: name, subject: subject}})
  }

  const handleSearchClick = () => {
    if(searchValue === '') {return setTeachersList(teachersFullList)}
    const filterBySearch = teachersFullList.filter((teacher) => {
      if(teacher.name.toLowerCase().includes(searchValue.toLocaleLowerCase())) {return teacher}
    })
    if(filterBySearch.length !== 0) {setTeachersList(filterBySearch)}
    return
  }

  const handlePageChange = (pageNumber) => {
    if (
      pageNumber > 0 &&
      pageNumber <= Math.ceil(teachersFullList.length / 7) &&
      pageNumber !== page
    ) {
      setPage(pageNumber);    
    }
  };

  async function deleteTeacher(e, id) {
    e.stopPropagation()
    const deletedUser = await axios.delete(`http://localhost:5000/api/user/${id}`, {
        withCredentials: true
      })
      setTeachersFullList(prevState => {
        return prevState.filter((teacher) => teacher._id !== id)
      })
      setTeachersList(prevState => {
        return prevState.filter((teacher) => teacher._id !== id)
      })
  }

  if(isLoading || teachersFullList === undefined) {
    return (
      <div>
        <h1>
          Loading...
        </h1>
      </div>
    )
  }
  
  if(teachersFullList.length === 0) {
    return (
      <div className='p-20 text-2xl flex flex-col gap-10'>
        <h1>No Teachers In our System</h1>
        <h1>Someone Has Just Joined!</h1>
        <Link to={'../dashboard/admin/addteacher'}>
          <h1 className='text-btnColor hover:opacity-70'>Add Teacher To Our School</h1>
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
      <div className='grid grid-cols-4 p-5 justify-items-center'>
        <h1>Teacher's Name</h1>
        <h1>Teacher's Email</h1>
        <h1>Subject Name</h1>
        <h1>Teacher Have Left Our School</h1>
      </div>
      {teachersList.slice(page * 7 - 7, page * 7).map((teacher) => {
        return teacher.subject && teacher.subject.map((subjct) =>
        <div onClick={(e) => handleStudentList(e, teacher.name, ...teacher.subject)} key = {subjct._id} className='break-words mb-1 grid grid-cols-4 p-5 border-2 border-btnColor rounded-md cursor-pointer hover:opacity-50'>
          <h1 className=''>{teacher.name}</h1>
          <h1 className='pl-5 border-l-2 border-btnColor'>{teacher.email}</h1>
          <h1 className='pl-5 border-l-2 border-r-2 border-btnColor'>{subjct.name}</h1>
          <button onClickCapture={(e) => deleteTeacher(e, teacher._id)} className='bg-btnColor text-mainTextColor rounded-md py-2 hover:opacity-50'>DELETE</button>
        </div>)
      })}
      <div className=' flex justify-center gap-1'>
        <button onClick={() => handlePageChange(page - 1)}><FaArrowAltCircleLeft className='w-10 h-10 text-btnColor' /></button>
        {[...Array(Math.ceil(teachersList.length / 7))].map((_, i) => {
          return <span key={i + 1} onClick={() => handlePageChange(i + 1)} className='cursor-pointer p-3 rounded-md text-mainTextColor bg-secondaryColor opacity-85'>{i + 1}</span>
        })}
        <button onClick={() => handlePageChange(page + 1)}><FaArrowAltCircleRight className='w-10 h-10 text-btnColor' /></button>
      </div>
    </div>
  )
}

//products?limit=100