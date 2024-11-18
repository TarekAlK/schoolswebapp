import React from 'react'
import { Link } from 'react-router-dom'
import GenerateRandomText from '../utils/GenerateRandomText'

export default function Career() {
  return (
    <div className='p-8'>
      <div className='mb-4'>
        <h1 className='font-bold text-2xl'>Job Vacancies</h1>
        <div className='border-t border-dimColor mb-2'></div>
        <p className='mb-2'>
        <GenerateRandomText
            numParagraphs = '3'
            numSentencesPerParagraph = '1'
        />
        </p>
        <p className='font-bold mb-2'>
          Please submit the following documents after filling up the job application form
        </p>
        <p className='mb-4'>
          1. <GenerateRandomText
            numParagraphs = '1'
            numSentencesPerParagraph = '1'
          /><br />
          2. <GenerateRandomText
            numParagraphs = '1'
            numSentencesPerParagraph = '1'
          /><br />
          3. <GenerateRandomText
            numParagraphs = '1'
            numSentencesPerParagraph = '1'
          /><br />
          4. <GenerateRandomText
            numParagraphs = '1'
            numSentencesPerParagraph = '1'
          />
        </p>
        <p className='font-bold mb-2'>
          Eligibility to apply
        </p>
        <p>
          1. <GenerateRandomText
            numParagraphs = '1'
            numSentencesPerParagraph = '1'
          /><br />
          2. <GenerateRandomText
            numParagraphs = '1'
            numSentencesPerParagraph = '1'
          /><br />
          3. <GenerateRandomText
            numParagraphs = '1'
            numSentencesPerParagraph = '1'
          /><br />
          4. <GenerateRandomText
            numParagraphs = '1'
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
