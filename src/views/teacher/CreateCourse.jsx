import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import dataService from '../../services/dataService'

export default function CreateCourse() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    dataService.createCourse({ title, description, status: 'Abierto' })
    navigate('/teacher')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-4">Crear Curso</h2>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Título</label>
            <input value={title} onChange={e => setTitle(e.target.value)} className="w-full border px-3 py-2 rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Descripción</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full border px-3 py-2 rounded" rows={4} />
          </div>
          <div className="flex gap-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Crear</button>
            <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 border rounded">Cancelar</button>
          </div>
        </form>
      </main>
    </div>
  )
}
