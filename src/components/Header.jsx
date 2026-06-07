import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { user, logout, isAuthenticated, loading } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleHome = () => {
    if (!user) return navigate('/')
    if (user.accountType === 'Docente') return navigate('/teacher')
    return navigate('/dashboard')
  }

  if (loading) return null
  if (!isAuthenticated) return null

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={handleHome}>
          <h1 className="text-3xl font-bold text-gray-900">EduTech</h1>
        </button>
        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-medium">Hola, {user?.fullName || user?.name || user?.email}! 👋</span>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            <span>🚪</span>
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </header>
  )
}
