import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import dataService from '../../services/dataService'

export default function AddTask() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')

  useEffect(() => {
    setCourse(dataService.getCourseById(id))
  }, [id])

  const handleAdd = () => {
    if (!title) return alert('Titulo requerido')
    dataService.createTask(id, { title, description, dueDate })
    navigate(`/teacher/course/${id}/review`)
  }

  if (!course) return <div className="p-6">Curso no encontrado</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Agregar actividad - {course.title}</h2>
          <div className="space-y-4">
            <input className="w-full border p-2 rounded" placeholder="Título de la actividad" value={title} onChange={e => setTitle(e.target.value)} />
            <textarea className="w-full border p-2 rounded" placeholder="Descripción" value={description} onChange={e => setDescription(e.target.value)} />
            <input type="date" className="border p-2 rounded" value={dueDate} onChange={e => setDueDate(e.target.value)} />
            <div className="flex gap-3">
              <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded">Agregar actividad</button>
              <button onClick={() => navigate(-1)} className="px-4 py-2 border rounded">Cancelar</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
