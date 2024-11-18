import React, {useState, useEffect} from 'react'
import useAxios from "./useAxios";

export default function useAxiosStudentProgress() {
    const [studentProgress, setStudentprogress] = useState([])
    const studentId = JSON.parse(localStorage.getItem('user')).id

    const [response, , , , fetchData] = useAxios();

    const fetchStudentProgress = async () => {
        await fetchData({
          method: 'get',
          url: `/studentcourses?studentid=${studentId}&&role=`
        })
    }
    
    useEffect(() => {
            fetchStudentProgress()
    }, [])

    useEffect(() => {
      if(response.length !== 0) {
        let noOfSubjects = 0
        let midtermSum = 0
        let finalExamSum = 0
        let progressArray
        response.filter(subject => subject.students.finalGrade !== '_').forEach(subject => {
            noOfSubjects = noOfSubjects + 1
            midtermSum = midtermSum + subject.students.midterm
            finalExamSum = finalExamSum + subject.students.finalExam
        })
        progressArray = [{test: 'midterm', 'grades percentage': midtermSum / noOfSubjects}, {test: 'final', 'grades percentage': finalExamSum / noOfSubjects}]
        setStudentprogress(progressArray)
      }
    }, [response])

  return studentProgress
}
