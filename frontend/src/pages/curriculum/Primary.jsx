import React from 'react'
import { Link } from 'react-router-dom'
import schoolImageSix from '../../assets/school-6.jpg'
import GenerateRandomText from '../../utils/GenerateRandomText'
import GoToTop from '../../utils/GoToTop'

export default function Primary() {
  return (
    <div className='p-10'>
      <h1 className='text-2xl mb-5'>
        Primary
      </h1>
      <div className='border-t border-dimColor mb-2'></div>
      <div className='flex flex-col gap-2 sm:flex sm:flex-row'>
        <img src={schoolImageSix} alt="school image" className='sm:w-1/4' />
        <p>
          <GenerateRandomText
            numParagraphs = '3'
            numSentencesPerParagraph = '3'
          />
        </p>
      </div>
      <div className='border-t border-dimColor mb-10'></div>
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
        <h1 className='font-bold'>Math & Science curriculum</h1>
        <p>
          <GenerateRandomText
            numParagraphs = '3'
            numSentencesPerParagraph = '1'
          />
        </p>
      </div>
      <div className='mb-3'>
        <h1 className='font-bold'>Information Technology</h1>
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
      <div className='mb-3'>
        <h1 className='font-bold'>Fine Arts</h1>
        <p>
          <GenerateRandomText
            numParagraphs = '3'
            numSentencesPerParagraph = '1'
          />
        </p>
      </div>
      <div className='mb-3'>
        <h1 className='font-bold'>Technology</h1>
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
        <Link to='../curriculum/secondary'>
          <button className='text-mainTextColor bg-btnColor rounded-lg px-6 py-2 hover:opacity-75'>Secondary</button>
        </Link>
      </div>
      <GoToTop />
    </div>
  )
}
