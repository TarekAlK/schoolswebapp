import React, { useEffect, useState } from 'react'

export default function ContentSlider(props) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const content = props.content

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex(prev => {
                if(prev === content.length - 1) return 0
                else return prev + 1
            })
        }, 4000)

        return () => clearInterval(intervalId)
    }, [])
  return (
    <div className='text-mainTextColor p-6 flex flex-col items-center gap-2 w-60 h-60 grow bg-btnColor rounded-bl-3xl rounded-tr-3xl'>
        <div className='flex items-center gap-4 h-full'>
            <div className='h-1/2 pr-1 bg-mainTextColor'></div>
            <h1><i>{content[currentIndex].quotes}</i></h1>
        </div>
        <h1 className='ml-3'>{content[currentIndex].writer}</h1>
    </div>
  )
}
