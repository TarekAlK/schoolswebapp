import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx'
import Kindergarten from './pages/curriculum/Kindergarten.jsx';
import Primary from './pages/curriculum/Primary.jsx';
import Secondary from './pages/curriculum/Secondary.jsx';
import AboutUs from './pages/AboutUs.jsx'
import Career from './pages/Career.jsx'
import Admission from './pages/Admission.jsx'
import LogIn from './pages/LogIn.jsx';
import AdminMain from './pages/dashboard/admin/AdminMain.jsx'
import AddTeacher from './pages/dashboard/admin/AdminAddTeacher.jsx';
import TeachersList from './pages/dashboard/admin/AdminTeachersList.jsx';
import TeacherStudentsList from './pages/dashboard/admin/TeacherStudentsList.jsx';
import StudentClasses from './pages/dashboard/admin/StudentClasses.jsx';
import TeacherMain from './pages/dashboard/teacher/TeacherMain.jsx';
import AddStudent from './pages/dashboard/teacher/AddStudent.jsx';
import StudentsList from './pages/dashboard/teacher/StudentsList.jsx';
import StudentGrade from './pages/dashboard/teacher/StudentGrade.jsx';
import StudentMain from './pages/dashboard/student/StudentMain.jsx';
import MyGrades from './pages/dashboard/student/MyGrades.jsx';
import ProtectedRoute from './utils/ProtectedRoute.jsx';
import NotFound from './pages/NotFound.jsx';
import NotAllowed from './pages/NotAllowed.jsx';
import './index.css'
import { AuthProvider } from './components/AuthContext.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />
  },
  {
    path: '/notallowed',
    element: <NotAllowed />,
  },
  {
    path: '/curriculum/kindergarten',
    element: <Kindergarten />,
  },
  {
    path: '/curriculum/primary',
    element: <Primary />,
  },
  {
    path: '/curriculum/secondary',
    element: <Secondary />,
  },
  {
    path: '/aboutus',
    element: <AboutUs />,
  },
  {
    path: '/career',
    element: <Career />,
  },
  {
    path: '/admission',
    element: <Admission />,
  },
  {
    path: '/login',
    element: <AuthProvider><LogIn /></AuthProvider>,
  },
  {
    path: '/dashboard/admin',
    element: <AuthProvider><ProtectedRoute permission='admin'><AdminMain /></ProtectedRoute></AuthProvider>
  },
  {
    path: '/dashboard/admin/addteacher',
    element: <ProtectedRoute permission='admin'><AddTeacher /></ProtectedRoute>
  },
  {
    path: '/dashboard/admin/teacherslist',
    element: <ProtectedRoute permission='admin'><TeachersList /></ProtectedRoute>
  },
  {
    path: '/dashboard/admin/teacherstudentslist',
    element: <ProtectedRoute permission='admin'><TeacherStudentsList /></ProtectedRoute>
  },
  {
    path: '/dashboard/admin/studentclasses',
    element: <ProtectedRoute permission='admin'><StudentClasses /></ProtectedRoute>
  },
  {
    path: '/dashboard/teacher',
    element: <ProtectedRoute permission='teacher'><TeacherMain /></ProtectedRoute>
  },
  {
    path: '/dashboard/teacher/addstudent',
    element: <ProtectedRoute permission='teacher'><AddStudent /></ProtectedRoute>
  },
  {
    path: '/dashboard/teacher/studentslist',
    element: <ProtectedRoute permission='teacher'><StudentsList /></ProtectedRoute>
  },
  {
    path: '/dashboard/teacher/studentgrade',
    element: <ProtectedRoute permission='teacher'><StudentGrade /></ProtectedRoute>
  },
  {
    path: '/dashboard/student',
    element: <ProtectedRoute permission='student'><StudentMain /></ProtectedRoute>
  },
  {
    path: '/dashboard/student/studentgrades',
    element: <ProtectedRoute permission='student'><MyGrades /></ProtectedRoute>
  },
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
