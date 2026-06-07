import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()
  const { register } = useAuth()

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    accountType: 'Estudiante',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    // Validaciones
    if (!formData.fullName.trim()) {
      setError('El nombre completo es requerido')
      setLoading(false)
      return
    }

    if (!formData.email.trim()) {
      setError('El email es requerido')
      setLoading(false)
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Email inválido')
      setLoading(false)
      return
    }

    if (!formData.password) {
      setError('La contraseña es requerida')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      setLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      setLoading(false)
      return
    }

    // Intentar registro
    const result = register({
      fullName: formData.fullName,
      email: formData.email,
      accountType: formData.accountType,
      password: formData.password
    })

    if (result.success) {
      setSuccess('¡Cuenta creada exitosamente! Redirigiendo al dashboard...')
      setTimeout(() => {
        navigate('/dashboard')
      }, 1500)
    } else {
      setError(result.message)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 flex items-center justify-center p-8">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 relative" style={{ border: '2px solid rgba(0,0,0,0.6)', borderRadius: '28px' }}>
        <h3 className="text-center font-bold text-2xl mb-2">Crear cuenta</h3>
        <p className="text-center text-sm text-gray-500 mb-6">Accede a tu cuenta de pagos</p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-gray-600 mb-2">Nombre Completo</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">👤</span>
              <input 
                type="text" 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Juan Pérez" 
                className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30" 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-2">Correo Electrónico</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">📧</span>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ejemplo@correo.com" 
                className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30" 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-2">Tipo de cuenta</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🏷️</span>
              <select 
                name="accountType"
                value={formData.accountType}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              >
                <option>Docente</option>
                <option>Estudiante</option>
                <option>Administrador</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-2">Contraseña</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
              <input 
                type={showPassword ? 'text' : 'password'} 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••" 
                className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30" 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-2">Confirmar Contraseña</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
              <input 
                type={showConfirm ? 'text' : 'password'} 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••" 
                className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30" 
              />
              <button 
                type="button" 
                onClick={() => setShowConfirm(!showConfirm)} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showConfirm ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <div className="flex items-center text-sm">
            <input id="terms" type="checkbox" className="mr-2" required />
            <label htmlFor="terms" className="text-gray-600">Acepto los términos y condiciones y la política de privacidad</label>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg mt-2 transition"
          >
            {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </button>

          <p className="text-center text-sm text-gray-600">¿Ya tienes cuenta? <a href="/" className="text-blue-600 font-semibold">Inicia sesión aquí</a></p>
        </form>
      </div>
    </div>
  )
}
 