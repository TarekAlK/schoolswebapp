import React from 'react'
import { Link } from 'react-router-dom'
import schoolImageSeven from '../../assets/school-7.jpg'
import GenerateRandomText from '../../utils/GenerateRandomText'
import GoToTop from '../../utils/GoToTop'

export default function Secondary() {
  return (
    <div className='p-10'>
      <h1 className='text-2xl mb-5'>
        Secondary
      </h1>
      <div className='border-t border-dimColor mb-2'></div>
      <div className='flex flex-col gap-2 sm:flex sm:flex-row'>
        <img src={schoolImageSeven} alt="school image" className='sm:w-1/4' />
        <p>
          <GenerateRandomText
            numParagraphs = '3'
            numSentencesPerParagraph = '3'
          />
        </p>
      </div>
      <div className='border-t border-dimColor mb-10'></div>
      <div className='mb-3'>
        <h1 className='font-bold'>Arabic curriculum</h1>
        <p>
          <GenerateRandomText
            numParagraphs = '3'
            numSentencesPerParagraph = '1'
          />
        </p>
      </div>
      <div className='mb-3'>
        <h1 className='font-bold'>English curriculum</h1>
        <p>
          <GenerateRandomText
            numParagraphs = '3'
            numSentencesPerParagraph = '1'
          />
        </p>
      </div>
      <div className='mb-3'>
        <h1 className='font-bold'>Science curriculum</h1>
        <p>
          <GenerateRandomText
            numParagraphs = '3'
            numSentencesPerParagraph = '1'
          />
        </p>
      </div>
      <div className='mb-3'>
        <h1 className='font-bold'>Math Curriculum</h1>
        <p>
          <GenerateRandomText
            numParagraphs = '3'
            numSentencesPerParagraph = '1'
          />
        </p>
      </div>
      <div className='mb-3'>
        <h1 className='font-bold'>Social studies</h1>
        <p>
          <GenerateRandomText
            numParagraphs = '3'
            numSentencesPerParagraph = '1'
          />
        </p>
      </div>
      <div className='mb-3'>
        <h1 className='font-bold'>Islamic Civilization</h1>
        <p>
          <GenerateRandomText
            numParagraphs = '3'
            numSentencesPerParagraph = '1'
          />
        </p>
      </div>
      <div className='mb-3'>
        <h1 className='font-bold'>ICT</h1>
        <p>
          <GenerateRandomText
            numParagraphs = '3'
            numSentencesPerParagraph = '1'
          />
        </p>
      </div>
      <div className='mb-3'>
        <h1 className='font-bold'>Physical Education</h1>
        <p>
          <GenerateRandomText
            numParagraphs = '3'
            numSentencesPerParagraph = '1'
          />
        </p>
      </div>
      <div className='flex justify-center gap-5 sm:gap-10'>
        <Link to='../curriculum/kindergarten'>
          <button className='text-mainTextColor bg-btnColor rounded-lg px-6 py-2 hover:opacity-75'>Kindergarten</button>
        </Link>
        <Link to='../curriculum/primary'>
          <button className='text-mainTextColor bg-btnColor rounded-lg px-6 py-2 hover:opacity-75'>Primary</button>
        </Link>
      </div>
      <GoToTop />
    </div>
  )
}
