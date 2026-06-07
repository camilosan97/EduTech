import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const [courses] = useState([
    {
      id: 1,
      title: 'Programación Avanzada',
      status: 'En Curso',
      statusColor: 'orange',
      description: 'Domina conceptos complejos de programación como estructuras de datos, algoritmos eficientes y patrones de diseño. Ideal para llevar tus habilidades al siguiente nivel y resolver problemas reales en código optimizado.',
      button: 'Continuar',
      buttonAction: 'continue'
    },
    {
      id: 2,
      title: 'Cálculo integral',
      status: 'En Curso',
      statusColor: 'orange',
      description: 'Aprende a resolver integrales y comprende sus aplicaciones en áreas como la física, la economía y la ingeniería. Un curso esencial para fortalecer tu pensamiento matemático y analítico.',
      button: 'Continuar',
      buttonAction: 'continue'
    },
    {
      id: 3,
      title: 'MySQL para principiantes',
      status: 'Abierto',
      statusColor: 'green',
      description: 'Iniciate en el mundo de las bases de datos aprendiendo a crear, consultar y gestionar información en MySQL. No necesitas experiencia previa, sólo ganas de aprender.',
      button: 'Inscribirse',
      buttonAction: 'enroll'
    }
  ])

  const [academicInfo] = useState([
    { icon: '✓', title: 'Optimización de algoritmos: de lo teórico a lo práctico', date: '2025-11-15', course: 'Programación Avanzada', status: 'Completado' },
    { icon: '✓', title: 'Patrones de diseño esenciales en aplicaciones modernas', date: '2025-11-10', course: 'Programación Avanzada', status: 'Completado' },
    { icon: '✓', title: 'Aplicaciones de la integral: áreas y volúmenes', date: '2025-10-28', course: 'Cálculo Integral', status: 'Completado' }
  ])

  const [courseSummary] = useState([
    { title: 'Programación Avanzada', status: 'Completado' },
    { title: 'Programación Avanzada', status: 'Completado' },
    { title: 'Cálculo Integral', status: 'Completado' }
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Mi Panel Académico: Estudiante</h2>
          <p className="text-gray-500 mb-6">Gestiona tus servicios públicos</p>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/courses')} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition">
              Explorar todos los cursos
              <span>➕</span>
            </button>
            {user?.accountType === 'Docente' && (
              <button onClick={() => navigate('/teacher')} className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg font-semibold">
                Panel Docente
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Courses Section */}
          <div className="lg:col-span-2">
            <div className="grid gap-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
                      <span className={`text-xs font-semibold ${
                        course.statusColor === 'orange' ? 'text-orange-600' : 'text-green-600'
                      }`}>
                        {course.status}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-6 line-clamp-3">{course.description}</p>
                  
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition">
                    {course.button}
                  </button>
                </div>
              ))}
            </div>

            {/* Academic Information Section */}
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Información Académica</h3>
                <a href="#" className="text-blue-600 font-semibold hover:text-blue-800 transition">Ver Todos</a>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200">
                {academicInfo.map((item, idx) => (
                  <div key={idx} className="p-6 flex items-start gap-4">
                    <span className="text-green-500 text-2xl flex-shrink-0">✓</span>
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium">{item.title}</p>
                      <p className="text-gray-500 text-sm">{item.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-900 font-semibold text-sm">{item.course}</p>
                      <p className="text-blue-600 text-xs font-semibold">{item.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Course Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Resumen de Cursos</h3>
              
              <div className="space-y-4">
                {courseSummary.map((course, idx) => (
                  <div key={idx} className="pb-4 border-b border-gray-200 last:border-b-0">
                    <p className="font-semibold text-gray-900 text-sm">{course.title}</p>
                    <p className="text-blue-600 text-xs font-semibold">{course.status}</p>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-2 rounded-lg transition">
                Ver más detalles
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}