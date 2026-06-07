import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function PrivateRoute({ children, allowedRoles }) {
  const { isAuthenticated, loading, user } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-white mx-auto mb-4"></div>
          <p className="text-lg">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  if (allowedRoles && Array.isArray(allowedRoles) && allowedRoles.length > 0) {
    const userRole = user?.accountType || user?.role || null
    if (!userRole || !allowedRoles.includes(userRole)) {
      // Redirect to appropriate dashboard based on role
      const redirectTo = userRole === 'Docente' ? '/teacher' : '/dashboard'
      return <Navigate to={redirectTo} replace />
    }
  }

  return children
}
