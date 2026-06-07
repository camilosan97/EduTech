import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validaciones
    if (!formData.email.trim()) {
      setError('El email es requerido')
      setLoading(false)
      return
    }

    if (!formData.password) {
      setError('La contraseña es requerida')
      setLoading(false)
      return
    }

    // Intentar login
    const result = login(formData.email, formData.password)

    if (result.success) {
      setError('')
      setTimeout(() => {
        navigate('/dashboard')
      }, 500)
    } else {
      setError(result.message)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 flex items-center justify-center p-8">
      {/* Contenedor principal con layout de dos columnas */}
      <div className="w-full max-w-6xl flex gap-12 items-center">
        
        {/* Panel Izquierdo: Contenido de bienvenida */}
        <div className="flex-1 text-white">
          <h1 className="text-6xl font-bold mb-6">EduTech</h1>
          <p className="text-lg mb-12 text-blue-100 leading-relaxed">
            Accede a tus cursos, actividades y retroalimentación de forma rápida y sencilla
          </p>
          
          {/* Tarjetas de características */}
          <div className="flex gap-6">
            <div className="flex-1 bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-center border border-white/30 hover:bg-white/20 transition">
              <div className="text-4xl mb-3">📚</div>
              <span className="text-base font-semibold block">Cursos</span>
            </div>
            <div className="flex-1 bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-center border border-white/30 hover:bg-white/20 transition">
              <div className="text-4xl mb-3">✓</div>
              <span className="text-base font-semibold block">Actividades</span>
            </div>
            <div className="flex-1 bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-center border border-white/30 hover:bg-white/20 transition">
              <div className="text-4xl mb-3">📊</div>
              <span className="text-base font-semibold block">Progreso</span>
            </div>
          </div>
        </div>

        {/* Panel Derecho: Formulario */}
        <div className="flex-1 bg-white rounded-3xl shadow-2xl p-10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="bg-cyan-100 rounded-full w-24 h-24 flex items-center justify-center">
              <div className="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full w-20 h-20 flex items-center justify-center text-3xl">
                🌍
              </div>
            </div>
          </div>
          
          {/* Título y subtítulo */}
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Inicio de Sesión</h2>
          <p className="text-gray-500 text-center mb-8 text-sm">Accede a múltiples cursos</p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">Correo Electrónico</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition" 
                placeholder="ejemplo@correo.com" 
              />
            </div>
            
            {/* Contraseña */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">Contraseña</label>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition" 
                  placeholder="••••••••" 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition text-lg"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Botón Iniciar Sesión */}
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition-colors mt-8 shadow-md shadow-blue-600/30"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
            
            {/* Enlaces */}
            <div className="text-center space-y-3 mt-8 text-sm">
              <p>
                <a href="#" className="text-gray-600 hover:text-gray-800 transition">¿Olvidaste tu contraseña?</a>
              </p>
              <p className="text-gray-600">
                ¿No tienes cuenta? <a href="/register" className="text-blue-600 font-semibold hover:text-blue-700 transition">Regístrate aquí</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}