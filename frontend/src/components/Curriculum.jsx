import React from 'react'
import { Link } from 'react-router-dom'
import schoolImageFive from '../assets/school-5.jpg'
import schoolImageSix from '../assets/school-6.jpg'
import schoolImageSeven from '../assets/school-7.jpg'

export default function Curriculum() {
  return (
    <section className='mb-4'>
      <h1 className='font-bold text-3xl mb-6 text-center sm:text-4xl'>Curriculum</h1>
      <div className='sm:flex sm:justify-between sm:py-8 sm:px-20'>
        <div className='flex flex-col items-center mb-2'>
          <div className='w-48 h-48 rounded-full overflow-hidden mb-2 hover:opacity-75'>
            <Link to={'curriculum/kindergarten'}>
              <img src={schoolImageFive} alt="school image" className='w-full h-full object-cover' />
            </Link>
          </div>
          <h1 className='font-bold'>
            Kindergarten
          </h1>
        </div>
        <div className='flex flex-col items-center mb-2'>
          <div className='w-48 h-48 rounded-full overflow-hidden mb-2 hover:opacity-75'>
            <Link to={'curriculum/primary'}>
              <img src={schoolImageSix} alt="school image" className='w-full h-full object-cover' />
            </Link>
          </div>
          <h1 className='font-bold'>
            Primary
          </h1>
        </div>
        <div className='flex flex-col items-center mb-2'>
          <div className='w-48 h-48 rounded-full overflow-hidden mb-2 hover:opacity-75'>
            <Link to={'curriculum/secondary'}>
              <img src={schoolImageSeven} alt="school image" className='w-full h-full object-cover' />
            </Link>
          </div>
          <h1 className='font-bold'>
            Secondary
          </h1>
        </div>
      </div>
    </section>
  )
}
