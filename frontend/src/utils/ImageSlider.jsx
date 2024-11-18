import React, { useEffect, useState } from 'react'

export default function ImageSlider(props) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const slides = props.slides

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex(prev => {
                if(prev === slides.length - 1) return 0
                else return prev + 1
            })
        }, 4000)

        return () => clearInterval(intervalId)
    }, [])
  return (
    <div>
        <img className='w-screen' src={slides[currentIndex]} alt="school image" />
    </div>
  )
}
