import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../views/auth/Login'
import Register from '../views/auth/Register'
import Dashboard from '../views/student/Dashboard'
import PrivateRoute from '../components/PrivateRoute'
import Courses from '../views/courses/Courses'
import CourseDetail from '../views/courses/CourseDetail'
import CourseView from '../views/courses/CourseView'
import TeacherDashboard from '../views/teacher/TeacherDashboard'
import CreateCourse from '../views/teacher/CreateCourse'
import ReviewSubmissions from '../views/teacher/ReviewSubmissions'
import AddTask from '../views/teacher/AddTask'
import Header from '../components/Header'
import MySubmissions from '../views/student/MySubmissions'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/course/:id/view" element={<PrivateRoute><CourseView /></PrivateRoute>} />
        <Route path="/teacher" element={<PrivateRoute allowedRoles={["Docente"]}><TeacherDashboard /></PrivateRoute>} />
        <Route path="/teacher/create" element={<PrivateRoute allowedRoles={["Docente"]}><CreateCourse /></PrivateRoute>} />
        <Route path="/teacher/course/:id/review" element={<PrivateRoute allowedRoles={["Docente"]}><ReviewSubmissions /></PrivateRoute>} />
        <Route path="/teacher/course/:id/tasks" element={<PrivateRoute allowedRoles={["Docente"]}><AddTask /></PrivateRoute>} />
        <Route path="/submissions" element={<PrivateRoute><MySubmissions /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

