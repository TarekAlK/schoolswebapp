import React from 'react'
import { PiCodesandboxLogoLight } from "react-icons/pi";
import { FaPhoneVolume } from "react-icons/fa6";
import ImageSlider from '../utils/ImageSlider'
import schoolImageOne from '../assets/school-1.jpg'
import schoolImageTwo from '../assets/school-2.jpg'
import schoolImageThree from '../assets/school-3.jpg'
import schoolImageFour from '../assets/school-4.jpg'

export default function MainContent() {
  return (
    <main className='mb-4 overflow-hidden'>
      <ImageSlider
        slides = {[schoolImageOne, schoolImageTwo, schoolImageThree]}
      />
      <div className='relative'>
        <img src={schoolImageFour} alt="school image" />
        <div className='absolute top-10 left-10'>
          <h1 className='text-xl font-bold sm:text-4xl'>Enroll Now</h1>
        </div>
        <div className='absolute top-24 left-10 flex items-center sm:top-32'>
          <PiCodesandboxLogoLight className='w-10 h-10 object-center sm:w-20 sm:h-20 sm:mr-7' />
          <h1 className='text-xl font-bold sm:text-4xl'>International School Of The Future Generation</h1>
        </div>
        <div className='absolute top-44 left-10 sm:top-72'>
          <h1 className='text-xl font-bold sm:text-4xl'>Addmission Opens<br/>For Year 2024-2025</h1>
        </div>
        <div className='flex items-center absolute top-60 left-10 sm:top-96'>
          <FaPhoneVolume className='text-btnColor text-xl mr-4 sm:text-4xl sm:mr-7'/>
          <h1 className='text-btnColor text-xl font-bold sm:text-4xl'>00* **-**** ****</h1>
        </div>
      </div>
    </main>
  )
}
