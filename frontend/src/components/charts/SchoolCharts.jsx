import React, {useEffect} from 'react'
import useAxios from '../../hooks/useAxios'
import { BarChart,Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts'

export default function SchoolCharts() {
    const [response, , , , fetchData] = useAxios();

    const commentOnResult = response.length === 0 ? '' :
        response.schoolProgress[1]['school grades percentage'] - response.schoolProgress[0]['school grades percentage'] < -35 ? 'Major decline between school average in the midterm and final' :
        response.schoolProgress[1]['school grades percentage'] - response.schoolProgress[0]['school grades percentage'] < -15 ? 'Noticible decline between school average in the midterm and final' :
        response.schoolProgress[1]['school grades percentage'] - response.schoolProgress[0]['school grades percentage'] < 0 ? 'Minor decline between school average in the midterm and final' :
        response.schoolProgress[1]['school grades percentage'] - response.schoolProgress[0]['school grades percentage'] === 0 ? 'Dead even, surprisingly same school average in the midterm and final' :
        response.schoolProgress[1]['school grades percentage'] - response.schoolProgress[0]['school grades percentage'] < 15 ? 'Minor progress between school average in the midterm and final' :
        response.schoolProgress[1]['school grades percentage'] - response.schoolProgress[0]['school grades percentage'] < 35 ? 'Noticible Progress between school average in the midterm and final' : 'Major Progress between school average in the midterm and final'

    const fetchSchoolAverage = async () => {
        await fetchData({
          method: 'get',
          url: '/schoolaverage',
        })
      }

    useEffect(() => {
        fetchSchoolAverage()
      }, [])

  if(response.length === 0) {
    return (
        <div className='text-xl font-bold text-center'>
            <h1>Come Back When Results Are Published To Have Some Statistics In This Section</h1>
        </div>
    )
  }

  return (
    <div className='p-10 flex flex-col items-center gap-16'>
      <BarChart width={500} height={300} data={response.schoolGrades}>
        <XAxis dataKey="grade" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='school grades spread' fill='#0080ff'/>
      </BarChart>
      <BarChart width={500} height={300} data={response.schoolPassPercentage}>
        <XAxis dataKey="result" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='school overall result' fill='#0080ff'/>
      </BarChart>
      <div className='flex flex-col items-center gap-5'>
        <LineChart width={500} height={300} data={response.schoolProgress}>
            <XAxis dataKey="test" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey='school progress percentage' fill='#0080ff'/>
        </LineChart>
        {response.length !== 0 && <h1 className='text-2xl text-mainColor'>{commentOnResult}</h1>}
      </div>
    </div>
  )
}
