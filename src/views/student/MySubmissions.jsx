import { useEffect, useState } from 'react'
import dataService from '../../services/dataService'
import { useAuth } from '../../context/AuthContext'

export default function MySubmissions() {
  const { user } = useAuth()
  const [subs, setSubs] = useState([])

  useEffect(() => {
    const all = dataService.getSubmissions()
    setSubs(all.filter(s => s.studentEmail === user.email))
  }, [user.email])

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-4">Mis entregas</h2>
        <div className="space-y-3">
          {subs.map(s => (
            <div key={s.id} className="bg-white p-4 rounded border flex items-center justify-between">
              <div>
                <p className="font-medium">{s.filename}</p>
                <p className="text-sm text-gray-500">{new Date(s.date).toLocaleString()} — {s.status} {s.grade ? `— ${s.grade}` : ''}</p>
              </div>
              <a href={s.dataUrl} target="_blank" rel="noreferrer" className="text-blue-600">Descargar</a>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
