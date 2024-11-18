import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import useAxiosStudentProgress from '../../hooks/useAxiosStudentProgress'

export default function StudentProgressChart() {
    const studentProgress = useAxiosStudentProgress()
    const commentOnResult = studentProgress.length === 0 ? '' :
        studentProgress[1]['grades percentage'] - studentProgress[0]['grades percentage'] < -35 ? 'Major decline between average in the midterm and final' :
        studentProgress[1]['grades percentage'] - studentProgress[0]['grades percentage'] < -15 ? 'Noticible decline between average in the midterm and final' :
        studentProgress[1]['grades percentage'] - studentProgress[0]['grades percentage'] < 0 ? 'Minor decline between average in the midterm and final' :
        studentProgress[1]['grades percentage'] - studentProgress[0]['grades percentage'] === 0 ? 'Dead even, surprisingly same average in the midterm and final' :
        studentProgress[1]['grades percentage'] - studentProgress[0]['grades percentage'] < 15 ? 'Minor progress between average in the midterm and final' :
        studentProgress[1]['grades percentage'] - studentProgress[0]['grades percentage'] < 35 ? 'Noticible Progress between average in the midterm and final' : 'Major Progress between class average in the midterm and final'

  if(studentProgress.length === 0) {
    return (
        <div className='text-xl font-bold text-center'>
            <h1>Come Back When Results Are Published To Have Some Statistics In This Section</h1>
        </div>
    )
  }
  
  return (
    <div className='flex flex-col items-center gap-5'>
        <LineChart width={500} height={300} data={studentProgress}>
        <XAxis dataKey="test" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey='grades percentage' fill='#9400D3'/>
        </LineChart>
        <h1 className='text-2xl text-mainColor'>{commentOnResult}</h1>
    </div>
  )
}