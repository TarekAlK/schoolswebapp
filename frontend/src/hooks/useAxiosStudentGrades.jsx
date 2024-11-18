import React, {useState, useEffect} from 'react'
import useAxios from "./useAxios";

export default function useAxiosStudentGrades() {
    const [studentGrades, setStudentGrades] = useState([])
    const studentId = JSON.parse(localStorage.getItem('user')).id

    const [response, , , , fetchData] = useAxios();

    const fetchStudentGrades = async () => {
        await fetchData({
          method: 'get',
          url: `/studentcourses?studentid=${studentId}&&role=`
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
          subject.students.finalGrade === 'A' ? a = a + 1 :
          subject.students.finalGrade === 'B' ? b = b + 1 :
          subject.students.finalGrade === 'C' ? c = c + 1 :
          subject.students.finalGrade === 'D' ? d = d + 1 :
          subject.students.finalGrade === 'F' ? f = f + 1 : ''
      })
        gradesArray = [{grade: 'A', 'grades spread': a}, {grade: 'B', 'grades spread': b}, {grade: 'C', 'grades spread': c}, {grade: 'D', 'grades spread': d}, {grade: 'F', 'grades spread': f}]
        setStudentGrades(gradesArray)
      }
    }, [response])

  return studentGrades
}
