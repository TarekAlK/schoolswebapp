import React from 'react'
import { Link } from 'react-router-dom'
import schoolImageFive from '../../assets/school-5.jpg'
import GenerateRandomText from '../../utils/GenerateRandomText'
import GoToTop from '../../utils/GoToTop'

export default function Kindergarten() {
  return (
    <div className='p-10'>
      <h1 className='text-2xl mb-5'>
        Kindergarten
      </h1>
      <div className='border-t border-dimColor mb-2'></div>
      <div className='flex flex-col gap-2 sm:flex sm:flex-row'>
        <img src={schoolImageFive} alt="school image" className='sm:w-1/4' />
        <p>
          <GenerateRandomText
            numParagraphs = '3'
            numSentencesPerParagraph = '3'
          />
        </p>
      </div>
      <div className='border-t border-dimColor mb-10'></div>
      <div className='mb-3'>
        <h1 className='font-bold'>Arabic Language</h1>
        <p>
          <GenerateRandomText
            numParagraphs = '3'
            numSentencesPerParagraph = '1'
          />
        </p>
      </div>
      <div className='mb-3'>
        <h1 className='font-bold'>Physical and personal development</h1>
        <p>
          <GenerateRandomText
            numParagraphs = '3'
            numSentencesPerParagraph = '1'
          />
        </p>
      </div>
      <div className='mb-3'>
        <h1 className='font-bold'>Cognitive Development</h1>
        <p>
          <GenerateRandomText
            numParagraphs = '3'
            numSentencesPerParagraph = '1'
          />
        </p>
      </div>
      <div className='mb-3'>
        <h1 className='font-bold'>Science & Math</h1>
        <p>
          <GenerateRandomText
            numParagraphs = '3'
            numSentencesPerParagraph = '1'
          />
        </p>
      </div>
      <div className='mb-3'>
        <h1 className='font-bold'>Social and moral development</h1>
        <p>
          <GenerateRandomText
            numParagraphs = '3'
            numSentencesPerParagraph = '1'
          />
        </p>
      </div>
      <div className='mb-3'>
        <h1 className='font-bold'>ICT Information and Communication Technology</h1>
        <p>
          <GenerateRandomText
            numParagraphs = '3'
            numSentencesPerParagraph = '1'
          />
        </p>
      </div>
      <div className='mb-3'>
        <h1 className='font-bold'>Aesthetics and Fine Arts Appreciation</h1>
        <p>
          <GenerateRandomText
            numParagraphs = '3'
            numSentencesPerParagraph = '1'
          />
        </p>
      </div>
      <div className='flex justify-center gap-5 sm:gap-10'>
        <Link to='../curriculum/primary'>
          <button className='text-mainTextColor bg-btnColor rounded-lg px-6 py-2 hover:opacity-75'>Primary</button>
        </Link>
        <Link to='../curriculum/secondary'>
          <button className='text-mainTextColor bg-btnColor rounded-lg px-6 py-2 hover:opacity-75'>Secondary</button>
        </Link>
      </div>
      <GoToTop />
    </div>
  )
}
