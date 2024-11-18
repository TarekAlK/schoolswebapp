import React from 'react'
import { CiLogin } from "react-icons/ci";
import { MdAccountBox } from "react-icons/md";

export default function DropDownMenu() {
  return (
    <div className='p-4 absolute top-full right-1/2 bg-mainTextColor text-btnColor w-auto h-32 rounded-md shadow-xl shadow-sky-700 hover:shadow-2xl hover:shadow-btnColor'>
        <div className='flex items-center gap-3 mb-4'>
            <CiLogin className='w-7 h-7' />
            <h1><a href="/login">Sign In</a></h1>
        </div>
        <div className='flex items-center gap-3'>
            <MdAccountBox className='w-12 h-12' />
            <h1><a href="#">Create An Account</a></h1>
        </div>
    </div>
  )
}