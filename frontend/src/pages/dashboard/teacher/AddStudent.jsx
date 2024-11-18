import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardNav from '../../../components/DashboardNav'
import useAxios from '../../../hooks/useAxios'

export default function AddStudent() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const [, , , , fetchData] = useAxios()
    const subjectId = JSON.parse(localStorage.getItem('user')).subjectId

    const firstLink = '/dashboard/teacher'
    const firstLinkText = 'Main Dashboard'
    const secondLink = '/dashboard/teacher/studentslist'
    const secondLinkText = "Student's List"
    
    //function onSubmit(e) {
    const onSubmit = async (e) => {
      e.preventDefault()
      await fetchData({
        method: 'post',
        url: '/registerstudent',
        data: {
          name: name,
          email: email,
          password: password,
          subjectId: subjectId,
          role: 'student'
        }
      })

      navigate('../dashboard/teacher/studentslist')
    }

  return (
    <div>
        <DashboardNav
            firstLink={firstLink}
            firstLinkText={firstLinkText}
            secondLink={secondLink}
            secondLinkText={secondLinkText}
        />
        <div className='h-screen w-screen p-20'>
        <form className='flex justify-center' onSubmit={onSubmit}>
          <div className='flex flex-col items-center'>
              <h1 className='text-2xl mb-8 sm:text-4xl'>Add New Student</h1>
              <input type="text" onChange={(e) => setName(e.target.value)} value={name} name='name' placeholder='Enter name' required className='border border-mainColor rounded-md shadow-lg px-4 py-3 mb-6' />
              <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} name='email' placeholder='Enter Email' required className='border border-mainColor rounded-md shadow-lg px-4 py-3 mb-6' />
              <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} name='password' placeholder='Enter Password' required className='border border-mainColor rounded-md shadow-lg px-4 py-3 mb-6' />
              <button className='bg-btnColor text-mainTextColor rounded-md w-full px-6 py-3' type='submit'>Add Student</button>
          </div>
        </form>
      </div>
    </div>
  )
}
