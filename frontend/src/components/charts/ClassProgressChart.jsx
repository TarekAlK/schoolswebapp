import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import useAxiosClassProgress from '../../hooks/useAxiosClassProgress'

export default function StudentProgressChart({subjectId}) {
    const classProgress = useAxiosClassProgress(subjectId)
    
    const commentOnResult = classProgress.length === 0 ? '' :
        classProgress[1]['grades percentage'] - classProgress[0]['grades percentage'] < -35 ? 'Major decline between class average in the midterm and final' :
        classProgress[1]['grades percentage'] - classProgress[0]['grades percentage'] < -15 ? 'Noticible decline between class average in the midterm and final' :
        classProgress[1]['grades percentage'] - classProgress[0]['grades percentage'] < 0 ? 'Minor decline between class average in the midterm and final' :
        classProgress[1]['grades percentage'] - classProgress[0]['grades percentage'] === 0 ? 'Dead even, surprisingly same class average in the midterm and final' :
        classProgress[1]['grades percentage'] - classProgress[0]['grades percentage'] < 15 ? 'Minor progress between class average in the midterm and final' :
        classProgress[1]['grades percentage'] - classProgress[0]['grades percentage'] < 35 ? 'Noticible Progress between class average in the midterm and final' :
        classProgress[1]['grades percentage'] - classProgress[0]['grades percentage'] > 35 ? 'Major Progress between class average in the midterm and final' : ''
console.log(classProgress)
  if(classProgress.length === 0) {
    return (
        <div className='text-xl font-bold text-center'>
            <h1>Come Back When Results Are Published To Have Some Statistics In This Section</h1>
        </div>
    )
  }
  return (
    <div className='flex flex-col items-center gap-5'>
        <LineChart width={500} height={300} data={classProgress}>
        <XAxis dataKey="test" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey='class grades percentage' fill='#32CD32'/>
        </LineChart>
        <h1 className='text-2xl text-mainColor'>{commentOnResult}</h1>
    </div>
  )
}