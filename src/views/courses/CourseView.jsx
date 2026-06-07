import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import dataService from '../../services/dataService'
import { useAuth } from '../../context/AuthContext'

export default function CourseView() {
  const { id } = useParams()
  const { user } = useAuth()
  const [course, setCourse] = useState(null)
  const [tasks, setTasks] = useState([])
  const [submissions, setSubmissions] = useState([])
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState('')
  const [selectedTask, setSelectedTask] = useState(null)

  useEffect(() => {
    setCourse(dataService.getCourseById(id))
    setSubmissions(dataService.getSubmissionsByCourse(id).filter(s => s.studentEmail === user.email))
    setTasks(dataService.getTasksByCourse(id))
  }, [id, user.email])

  const handleFile = (e) => {
    const f = e.target.files[0]
    setFile(f)
  }

  const handleUpload = () => {
    setMessage('')
    if (!file) return setMessage('Selecciona un archivo PDF')
    // Validaciones básicas
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.type !== 'application/pdf') return setMessage('El archivo debe ser un PDF')
    if (file.size > maxSize) return setMessage('El archivo excede el límite de 5MB')

    const reader = new FileReader()
    reader.onload = function(ev) {
      dataService.submitAssignment({ courseId: id, studentEmail: user.email, filename: file.name, dataUrl: ev.target.result, taskId: selectedTask })
      setMessage('Entrega subida correctamente')
      setSubmissions(dataService.getSubmissionsByCourse(id).filter(s => s.studentEmail === user.email))
      setFile(null)
      setSelectedTask(null)
    }
    reader.readAsDataURL(file)
  }

  if (!course) return <div className="p-6">Curso no encontrado</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
          <p className="text-gray-600 mb-6">{course.description}</p>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Subir entrega (PDF)</h3>
            {tasks.length > 0 && (
              <select value={selectedTask || ''} onChange={(e) => setSelectedTask(e.target.value)} className="border p-2 rounded mb-3">
                <option value="">Selecciona actividad (opcional)</option>
                {tasks.map(t => (
                  <option key={t.id} value={t.id}>{t.title} {t.dueDate ? `— ${t.dueDate}` : ''}</option>
                ))}
              </select>
            )}
            <input type="file" accept="application/pdf" onChange={handleFile} />
            <div className="mt-3 flex gap-3">
              <button onClick={handleUpload} className="bg-blue-600 text-white px-4 py-2 rounded-lg">Subir PDF</button>
            </div>
            {message && <p className="mt-3 text-sm text-green-600">{message}</p>}
          </div>

          <div>
            <h3 className="font-semibold mb-2">Mis entregas</h3>
            <div className="space-y-3">
              {submissions.map(s => (
                <div key={s.id} className="p-3 border rounded-md flex items-center justify-between">
                  <div>
                    <p className="font-medium">{s.filename} {s.taskId ? `— ${tasks.find(t => t.id === s.taskId)?.title || 'Actividad'}` : ''}</p>
                    <p className="text-sm text-gray-500">{new Date(s.date).toLocaleString()} - {s.status} {s.grade ? `— ${s.grade}` : ''}</p>
                  </div>
                  <a href={s.dataUrl} target="_blank" rel="noreferrer" className="text-blue-600">Ver</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
