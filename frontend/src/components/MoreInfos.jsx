import React from 'react'
import { FcAbout } from "react-icons/fc";
import { FaBriefcase } from "react-icons/fa";
import { FiMousePointer } from "react-icons/fi";
import { Link } from 'react-router-dom';
import ContentSlider from '../utils/ContentSlider';

export default function MoreInfos() {
    const content = [
        {
            quotes: 'Im happy with what Future Genertaion school has made out of Fahad',
            writer: 'Ahmed Kareem (Parent)'
        },
        {
            quotes: 'The school is like a second home to me…Im never tired of being there!',
            writer: 'Sarah Farid (Alumni)'
        },
        {
            quotes: 'Teaching is fun! I just love it.',
            writer: 'Mohammad Moustafa (Former Chemistry Teacher)'
        }
    ]

  return (
    <section className='p-8'>
        <div className='border-t border-dimColor mb-6'></div>
        <div className='flex flex-col items-center gap-4 mb-4 sm:gap-16 sm:flex-row sm:justify-center'>
            <div className='p-6 flex flex-col items-center gap-2 w-44 h-44 bg-btnColor rounded-bl-3xl rounded-tr-3xl'>
                <Link to='/aboutus'>
                    <FcAbout className='text-center w-16 h-16 hover:opacity-75'/>
                </Link>
                <h1 className='text-mainTextColor text-lg'>About Us</h1>
            </div>
            <div className='p-6 flex flex-col items-center gap-2 w-44 h-44 bg-btnColor rounded-bl-3xl rounded-tr-3xl'>
                <Link to='/career'>
                    <FaBriefcase className='text-mainTextColor text-center w-16 h-16 hover:opacity-75'/>
                </Link>
                <h1 className='text-mainTextColor text-lg'>Career</h1>
            </div>
            <div className='p-6 flex flex-col items-center gap-2 w-44 h-44 bg-btnColor rounded-bl-3xl rounded-tr-3xl'>
                <Link to='admission'>
                    <FiMousePointer className='text-mainTextColor text-center w-16 h-16 hover:opacity-75'/>
                </Link>
                <h1 className='text-mainTextColor text-lg'>Admission</h1>
            </div>
        </div>
        <div className='flex flex-col items-center gap-2'>
            <h1 className='font-bold text-2xl'>Testimonials</h1>              
                <ContentSlider
                    content = {content}
                />
        </div>
    </section>
  )
}
