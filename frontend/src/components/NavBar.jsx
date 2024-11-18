import React, { useState } from 'react'
import { IoPersonCircleOutline } from "react-icons/io5"
import DropDownMenu from './DropDownMenu'

export default function NavBar() {
  const [dropDownMenu, setDropDownMenu] = useState(false)
  return (
    <nav className='flex bg-btnColor p-3 justify-between text-mainTextColor w-screen h-14'>
      <h1>International School Of The Future Generation</h1>
      <div className='relative w-8 z-10 mr-7'>
        <button onClick={() => setDropDownMenu(prevState => !prevState)}>
          <IoPersonCircleOutline className='w-8 h-8 absolute right-0 top-0'/>
        </button>
        {dropDownMenu && <DropDownMenu />}
      </div>
    </nav>
  )
}
