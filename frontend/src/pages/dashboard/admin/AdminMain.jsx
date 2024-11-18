import React, {useState, useEffect} from 'react'
import useAxios from '../../../hooks/useAxios'
import DashboardNav from '../../../components/DashboardNav'
import SchoolCharts from '../../../components/charts/SchoolCharts'
import ClassGradesChart from '../../../components/charts/ClassGradesChart'
import ClassProgressChart from '../../../components/charts/ClassProgressChart'
import FormContainer from '../../../utils/FormContainer'

export default function AdminMain() {
  const [subjectName, setSubjectName] = useState('')
  const [subjectId, setSubjectId] = useState('')
  const [triggerClassCharts, setTriggerClassCharts] = useState(false)
  const [triggerSecondUseEffect, setTriggerSecondUseEffect] = useState(false)

  const [response, , , , fetchData] = useAxios();
  
  const firstLink = '/dashboard/admin/addteacher'
  const firstLinkText = 'Add Teacher'
  const secondLink = '/dashboard/admin/teacherslist'
  const secondLinkText = "Teacher's List"

  const name = JSON.parse(localStorage.getItem('user')).name

  const paintCharts = async (e) => {
    e.preventDefault()
    await fetchData({
      method: 'get',
      url: `/subjectid/${subjectName}`
    })
  }

  const containerClasses = 'h-auto p-4'

  const hOnes = [{
    text: 'Get some Statistics About Specific Subject',
    extraClasses: 'text-xl mb-0',
  }, {
    text: 'Please make sure you spell all the capital letters correctly',
    extraClasses: ''
  }]

  const multipleInputs = [{
    type: 'text',
    onChangeFunction: setSubjectName,
    value: subjectName,
    name: 'subjectName',
    placeHolder: 'Enter Subject Name',
    required: true,
    extraClasses: 'w-full',
  }]

  const multipleButtons = [{
    click: paintCharts,
    type: 'submit',
    text: 'Get Graphs',
    extraClasses: '',
  }]

  useEffect(() => {
    if(response.length === 1) {
      setSubjectId(response[0].subjectId)
      setTriggerClassCharts(false)
      setTriggerSecondUseEffect(prevState => !prevState)
    }
  },[response])

  useEffect(() => {
    if(response.length === 1) {
      setTriggerClassCharts(true)
    }
  },[triggerSecondUseEffect])

  return (
    <div>
      <DashboardNav
        firstLink={firstLink}
        firstLinkText={firstLinkText}
        secondLink={secondLink}
        secondLinkText={secondLinkText}
      />
      <div className='p-10 font-bold text-4xl flex flex-col items-center gap-5 text-blue-800'>
        <h1>Hi {name}</h1>
        <h1>How Are We Today</h1>
      </div>
      <SchoolCharts />
      <div className='p-10 flex flex-col items-center gap-10'>
        <FormContainer
          containerClasses = {containerClasses}
          hOnes = {hOnes}
          multipleInputs = {multipleInputs}
          multipleButtons = {multipleButtons}
        />
        {triggerClassCharts && <ClassGradesChart subjectId = {subjectId}/>}
        {triggerClassCharts && <ClassProgressChart subjectId = {subjectId}/>}
      </div>
    </div>
  )
}
