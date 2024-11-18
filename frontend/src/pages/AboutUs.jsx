import React from 'react'
import { Link } from 'react-router-dom'
import GenerateRandomText from '../utils/GenerateRandomText'

export default function AboutUs() {
  return (
    <div className='p-8'>
      <div className='mb-4'>
        <h1 className='font-bold text-2xl'>Mission</h1>
        <div className='border-t border-dimColor mb-2'></div>
        <p>
        <GenerateRandomText
            numParagraphs = '3'
            numSentencesPerParagraph = '1'
        />
        </p>
      </div>
      <div className='mb-8'>
        <h1 className='font-bold text-2xl'>Vision</h1>
        <div className='border-t border-dimColor mb-2'></div>
        <p>
        <GenerateRandomText
            numParagraphs = '4'
            numSentencesPerParagraph = '1'
          />
        </p>
      </div>
      <Link to='../'>
          <button className='text-mainTextColor bg-btnColor rounded-lg px-6 py-2 hover:opacity-75'>Home</button>
        </Link>
    </div>
  )
}
