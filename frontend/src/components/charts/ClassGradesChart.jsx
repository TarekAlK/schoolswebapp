import React from 'react'
import { BarChart,Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import useAxiosClassGrades from '../../hooks/useAxiosClassGrades'

export default function ClassGradesChart({subjectId}) {
    const classGrades = useAxiosClassGrades(subjectId)

  return (
    <BarChart width={500} height={300} data={classGrades}>
      <XAxis dataKey="grade" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey='class grades spread' fill='#32CD32'/>
    </BarChart>
  )
}
