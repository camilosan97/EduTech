import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import dataService from '../../services/dataService'
import { useAuth } from '../../context/AuthContext'

export default function ReviewSubmissions() {
  const { id } = useParams()
  const [submissions, setSubmissions] = useState([])
  const [course, setCourse] = useState(null)

  useEffect(() => {
    setCourse(dataService.getCourseById(id))
    setSubmissions(dataService.getSubmissionsByCourse(id))
  }, [id])

  const handleMark = (sid) => {
    const grade = prompt('Asignar calificación (opcional)')
    dataService.markSubmissionReviewed(sid, grade)
    setSubmissions(dataService.getSubmissionsByCourse(id))
  }

  if (!course) return <div className="p-6">Curso no encontrado</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-4">Revisar entregas - {course.title}</h2>
        <div className="space-y-4">
          {submissions.map(s => (
            <div key={s.id} className="bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-between">
              <div>
                <p className="font-medium">{s.studentEmail} — {s.filename} {s.taskId ? `— ${dataService.getTasksByCourse(id).find(t => t.id === s.taskId)?.title || ''}` : ''}</p>
                <p className="text-sm text-gray-500">{new Date(s.date).toLocaleString()} — {s.status} {s.grade ? `— ${s.grade}` : ''}</p>
              </div>
              <div className="flex gap-2">
                <a href={s.dataUrl} target="_blank" rel="noreferrer" className="text-blue-600">Ver PDF</a>
                <button onClick={() => handleMark(s.id)} className="bg-green-600 text-white px-3 py-1 rounded">Marcar revisado</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
