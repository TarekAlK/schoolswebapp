import React, {useState, useEffect} from 'react'
import useAxios from "./useAxios";

export default function useAxiosClassGrades(subjectId) {
    const [classGrades, setClassGrades] = useState([])

    const [response, , , , fetchData] = useAxios();

    const fetchStudentGrades = async () => {
        await fetchData({
          method: 'get',
          url: `/studentslist/${subjectId}`
        })
    }
    
    useEffect(() => {
      fetchStudentGrades()
    }, [])

    useEffect(() => {
      if(response.length !== 0) {
        let a = 0
        let b = 0
        let c = 0
        let d = 0
        let f = 0
        let gradesArray
        response.forEach(subject => {
          subject.finalGrade === 'A' ? a = a + 1 :
          subject.finalGrade === 'B' ? b = b + 1 :
          subject.finalGrade === 'C' ? c = c + 1 :
          subject.finalGrade === 'D' ? d = d + 1 :
          subject.finalGrade === 'F' ? f = f + 1 : ''
      })
        gradesArray = [{grade: 'A', 'class grades spread': a}, {grade: 'B', 'class grades spread': b}, {grade: 'C', 'class grades spread': c}, {grade: 'D', 'class grades spread': d}, {grade: 'F', 'class grades spread': f}]
        setClassGrades(gradesArray)
      }
    }, [response])

  return classGrades
}
