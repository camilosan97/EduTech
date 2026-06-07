import { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Cargar usuario del localStorage al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('edutech_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const register = (userData) => {
    // Validar que el usuario no exista
    const existingUsers = JSON.parse(localStorage.getItem('edutech_users') || '[]')
    const userExists = existingUsers.some(u => u.email === userData.email)

    if (userExists) {
      return { success: false, message: 'El email ya está registrado' }
    }

    // Guardar nuevo usuario
    const users = JSON.parse(localStorage.getItem('edutech_users') || '[]')
    users.push(userData)
    localStorage.setItem('edutech_users', JSON.stringify(users))

    // Auto-login después del registro
    const sessionUser = { ...userData }
    delete sessionUser.password
    setUser(sessionUser)
    localStorage.setItem('edutech_user', JSON.stringify(sessionUser))

    return { success: true, message: 'Cuenta creada exitosamente' }
  }

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('edutech_users') || '[]')
    const foundUser = users.find(u => u.email === email && u.password === password)

    if (!foundUser) {
      return { success: false, message: 'Email o contraseña incorrectos' }
    }

    const sessionUser = { ...foundUser }
    delete sessionUser.password
    setUser(sessionUser)
    localStorage.setItem('edutech_user', JSON.stringify(sessionUser))

    return { success: true, message: 'Sesión iniciada' }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('edutech_user')
  }

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }
  return context
}
