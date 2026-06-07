const STORAGE_KEYS = {
  COURSES: 'edutech_courses',
  SUBMISSIONS: 'edutech_submissions'
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

export function getCourses() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.COURSES) || '[]')
}

export function saveCourses(courses) {
  localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses))
}

export function createCourse(course) {
  const courses = getCourses()
  const newCourse = { id: uid(), ...course, enrolled: [], tasks: [] }
  courses.push(newCourse)
  saveCourses(courses)
  return newCourse
}

export function getCourseById(id) {
  return getCourses().find(c => c.id === id)
}

export function enrollStudent(courseId, studentEmail) {
  const courses = getCourses()
  const c = courses.find(x => x.id === courseId)
  if (!c) return false
  c.enrolled = c.enrolled || []
  if (!c.enrolled.includes(studentEmail)) c.enrolled.push(studentEmail)
  saveCourses(courses)
  return true
}

export function createTask(courseId, task) {
  const courses = getCourses()
  const c = courses.find(x => x.id === courseId)
  if (!c) return null
  c.tasks = c.tasks || []
  const newTask = { id: uid(), title: task.title, description: task.description || '', dueDate: task.dueDate || null }
  c.tasks.push(newTask)
  saveCourses(courses)
  return newTask
}

export function getTasksByCourse(courseId) {
  const c = getCourseById(courseId)
  return (c && c.tasks) ? c.tasks : []
}

export function getSubmissions() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBMISSIONS) || '[]')
}

export function saveSubmissions(items) {
  localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(items))
}

export function submitAssignment({ courseId, studentEmail, filename, dataUrl, taskId = null }) {
  const submissions = getSubmissions()
  const entry = { id: uid(), courseId, studentEmail, filename, dataUrl, taskId, date: new Date().toISOString(), status: 'Pendiente', grade: null }
  submissions.push(entry)
  saveSubmissions(submissions)
  return entry
}

export function getSubmissionsByCourse(courseId) {
  return getSubmissions().filter(s => s.courseId === courseId)
}

export function markSubmissionReviewed(id, grade) {
  const submissions = getSubmissions()
  const s = submissions.find(x => x.id === id)
  if (!s) return false
  s.status = 'Revisado'
  s.grade = grade || null
  saveSubmissions(submissions)
  return true
}

export function resetSampleData() {
  // Create some sample courses if none exist
  if (getCourses().length === 0) {
    createCourse({ title: 'Programación Avanzada', description: 'Domina conceptos complejos de programación.', status: 'En Curso' })
    createCourse({ title: 'Cálculo integral', description: 'Aprende a resolver integrales y sus aplicaciones.', status: 'En Curso' })
    createCourse({ title: 'MySQL para principiantes', description: 'Intro a bases de datos con MySQL.', status: 'Abierto' })
  }
}

// initialize sample
resetSampleData()

export default {
  getCourses,
  createCourse,
  getCourseById,
  enrollStudent,
  createTask,
  getTasksByCourse,
  getSubmissions,
  submitAssignment,
  getSubmissionsByCourse,
  markSubmissionReviewed
}
