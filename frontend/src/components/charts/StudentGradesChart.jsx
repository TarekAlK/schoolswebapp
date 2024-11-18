import React from 'react'
import { BarChart,Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import useAxiosStudentGrades from '../../hooks/useAxiosStudentGrades'

export default function StudentGradesChart({url}) {
    const studentGrades = useAxiosStudentGrades(url)

  return (
    <BarChart width={500} height={300} data={studentGrades}>
      <XAxis dataKey="grade" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey='grades spread' fill='#9400D3'/>
    </BarChart>
  )
}
