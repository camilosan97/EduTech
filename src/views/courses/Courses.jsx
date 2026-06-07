import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import dataService from '../../services/dataService'
import { useAuth } from '../../context/AuthContext'

export default function Courses() {
  const [courses, setCourses] = useState([])
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    setCourses(dataService.getCourses())
  }, [])

  const handleEnroll = (id) => {
    dataService.enrollStudent(id, user.email)
    navigate(`/course/${id}/view`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-4">Cursos Disponibles</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {courses.map(c => (
            <div key={c.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-2">{c.title}</h3>
              <p className="text-gray-600 mb-4">{c.description}</p>
              <div className="flex gap-3">
                <Link to={`/courses/${c.id}`} className="px-4 py-2 border rounded-lg">Ver detalle</Link>
                <button onClick={() => handleEnroll(c.id)} className="bg-blue-600 text-white px-4 py-2 rounded-lg">Inscribirse</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
