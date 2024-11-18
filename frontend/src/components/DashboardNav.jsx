import React from 'react'
import axios from 'axios'
import { CiLogout } from "react-icons/ci";
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export default function DashboardNav({firstLink, firstLinkText, secondLink, secondLinkText, secondLinkState}) {
  const navigate = useNavigate()

  const logout = async () => {
    try {
      const response = await axios.delete('http://localhost:5000/api/logout', {
        withCredentials: true
      })
      localStorage.removeItem('user')
      navigate('/', {replace: true})
      
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <nav className='flex justify-between items-center p-2 bg-mainTextColor text-btnColor w-full h-16 rounded-md shadow-lg shadow-sky-700 hover:shadow-lg hover:shadow-btnColor'>
      <div className='flex gap-4 text-secondaryColor'>
        <Link to={firstLink} className='border border-btnColor border-2 px-4 py-2 rounded-md'>{firstLinkText}</Link>
        <Link to={secondLink} state={secondLinkState} className='border border-btnColor border-2 px-4 py-2 rounded-md'>{secondLinkText}</Link>
        {/* <Link to={secondLink} className='border border-btnColor border-2 px-4 py-2 rounded-md'>{secondLinkText}</Link> */}
      </div>
      <div className='flex gap-3'>
          <CiLogout onClick={logout} className='w-7 h-7' />
          <button onClick={logout}>Log Out</button>
      </div>
    </nav>
  )
}
