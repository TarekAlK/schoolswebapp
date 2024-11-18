import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useAuth } from '../components/AuthContext';
import useAxios from '../hooks/useAxios';
import { toast } from 'react-toastify';

export default function LogIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if(JSON.parse(localStorage.getItem('user'))) {
      navigate(`/dashboard/${JSON.parse(localStorage.getItem('user')).role}`)
    }
  }, [])

  const onSubmit = async (e) => {
    try {
      e.preventDefault()
      if (!email || !password) {
        return;
      }

      await axios.post('http://localhost:5000/api/auth', {
        email: email,
        password: password
      }, {
        //credentials: 'include'
        withCredentials: true
      })

      const response = await axios('http://localhost:5000/api/profile', {
        //credentials: 'include'
        withCredentials: true
      })

      setUser(response.data)
      localStorage.setItem('user',
        JSON.stringify(response.data)
      )
      navigate(`/dashboard/${response.data.role}`)
      
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div className='h-screen w-screen p-20'>
      <form className='flex justify-center' onSubmit={onSubmit}>
        <div className='flex flex-col items-center'>
            <h1 className='text-4xl mb-8'>Log In</h1>
            <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} name='email' placeholder='Enter Email' required className='border border-mainColor rounded-md shadow-lg px-4 py-3 mb-6' />
            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} name='password' placeholder='Enter Password' required className='border border-mainColor rounded-md shadow-lg px-4 py-3 mb-6' />
            <button className='bg-btnColor text-mainTextColor rounded-md w-full px-6 py-3' type='submit'>Log In</button>
        </div>
      </form>
    </div>
  )
}
