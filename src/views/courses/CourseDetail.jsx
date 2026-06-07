import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import dataService from '../../services/dataService'
import { useAuth } from '../../context/AuthContext'

export default function CourseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [course, setCourse] = useState(null)

  useEffect(() => {
    setCourse(dataService.getCourseById(id))
  }, [id])

  if (!course) return <div className="p-6">Curso no encontrado</div>

  const handleEnroll = () => {
    dataService.enrollStudent(course.id, user.email)
    navigate(`/course/${course.id}/view`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
          <p className="text-gray-600 mb-6">{course.description}</p>
          <div className="flex gap-3">
            <button onClick={handleEnroll} className="bg-blue-600 text-white px-4 py-2 rounded-lg">Inscribirse</button>
            <button onClick={() => navigate(-1)} className="px-4 py-2 border rounded-lg">Volver</button>
          </div>
        </div>
      </main>
    </div>
  )
}
