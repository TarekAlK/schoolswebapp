import React from 'react'
import { Link } from 'react-router-dom'
import GenerateRandomText from '../utils/GenerateRandomText'
import { PiCodesandboxLogoLight } from "react-icons/pi";

export default function Career() {
  return (
    <div className='p-8'>
      <div className='mb-4'>
        <div className='flex items-center gap-2'>
            <PiCodesandboxLogoLight className='w-20 h-20 text-btnColor' />
            <h1 className='font-bold text-2xl'>International School Of The Future Generation</h1>
        </div>
        <div className='border-t border-dimColor mb-2'></div>
        <h1 className='font-bold text-lg mb-2'>
            Documents Required During Registration
        </h1>
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
          /><br />
          5. <GenerateRandomText
            numParagraphs = '1'
            numSentencesPerParagraph = '1'
          />
        </p>
        <h1 className='font-bold mb-2'>
          Documents For Student Visa Application Submission
        </h1>
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
