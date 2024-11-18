import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useAxios from '../../../hooks/useAxios'
import DashboardNav from '../../../components/DashboardNav'
//import { useAuth } from '../../components/AuthContext'

export default function AddTeacher() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [subject, setSubject] = useState('')
  const navigate = useNavigate()

  const [, , , , fetchData] = useAxios();

  const firstLink = '/dashboard/admin'
  const firstLinkText = 'Main Dashboard'
  const secondLink = '/dashboard/admin/teacherslist'
  const secondLinkText = "Teacher's List"

  const onSubmit = async (e) => {
    e.preventDefault()
    await fetchData({
      method: 'post',
      url: '/registerteacher',
      data: {
        name: name,
        email: email,
        password: password,
        subject: subject,
        role: 'teacher'
      }
    })
    navigate('../dashboard/admin/teacherslist')
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
              <h1 className='text-2xl mb-8 sm:text-4xl'>Add New Teacher</h1>
              <input type="text" onChange={(e) => setName(e.target.value)} value={name} name='name' placeholder='Enter name' required className='border border-mainColor rounded-md shadow-lg px-4 py-3 mb-6' />
              <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} name='email' placeholder='Enter Email' required className='border border-mainColor rounded-md shadow-lg px-4 py-3 mb-6' />
              <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} name='password' placeholder='Enter Password' required className='border border-mainColor rounded-md shadow-lg px-4 py-3 mb-6' />
              <input type="text" onChange={(e) => setSubject(e.target.value)} value={subject} name='subject' placeholder='Enter subject Name' required className='border border-mainColor rounded-md shadow-lg px-4 py-3 mb-6' />
              <button className='bg-btnColor text-mainTextColor rounded-md w-full px-6 py-3' type='submit'>Assign Teacher</button>
          </div>
        </form>
      </div>
    </div>
  )
}
