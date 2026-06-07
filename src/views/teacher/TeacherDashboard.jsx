import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import dataService from '../../services/dataService'
import { useAuth } from '../../context/AuthContext'

export default function TeacherDashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])

  useEffect(() => {
    setCourses(dataService.getCourses())
  }, [])

  const handleReview = (id) => {
    navigate(`/teacher/course/${id}/review`)
  }

  if (user?.accountType !== 'Docente') {
    return (
      <div className="p-8">Acceso restringido: Debes ser docente para ver este panel.</div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-4">Mi Panel Académico: Docente</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {courses.map(c => (
            <div key={c.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-2">{c.title}</h3>
              <p className="text-gray-600 mb-4">{c.description}</p>
              <div className="flex gap-2">
                <button onClick={() => handleReview(c.id)} className="bg-green-500 text-white px-4 py-2 rounded-lg">Revisar entregas</button>
                <Link to={`/teacher/course/${c.id}/review`} className="px-4 py-2 border rounded-lg">Ver</Link>
                <Link to={`/teacher/course/${c.id}/tasks`} className="px-4 py-2 border rounded-lg">Agregar actividad</Link>
              </div>
            </div>
          ))}
        </div>

        <div>
          <Link to="/teacher/create" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Crear Nuevo Curso</Link>
        </div>
      </main>
    </div>
  )
}
