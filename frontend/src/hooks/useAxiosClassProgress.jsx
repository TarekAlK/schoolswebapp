import React, {useState, useEffect} from 'react'
import useAxios from "./useAxios";

export default function useAxiosClassProgress(subjectId) {
    const [classProgress, setClassprogress] = useState([])

    const [response, , , , fetchData] = useAxios();

    const fetchStudentProgress = async () => {
        await fetchData({
          method: 'get',
          url: `/studentslist/${subjectId}`
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
        response.filter(subject => subject.finalGrade !== '_').forEach(subject => {
            noOfSubjects = noOfSubjects + 1
            midtermSum = midtermSum + subject.midterm
            finalExamSum = finalExamSum + subject.finalExam
        })
        progressArray = [{test: 'midterm', 'class grades percentage': midtermSum / noOfSubjects}, {test: 'final', 'class grades percentage': finalExamSum / noOfSubjects}]
        setClassprogress(progressArray)
      }
    }, [response])

  return classProgress
}
