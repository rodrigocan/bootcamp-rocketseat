const express = require('express')

const server = express()

server.use(express.json())

projects = []

server.use((req, res, next) => {
  console.count("Número de requisições")

  return next()
})

function checkProjectExists(req, res, next) {
  const { id } = req. params
  const project = projects.find(p => p.id == id)

  if (!project) {
    return res.status(400).json({ error: 'Project not found.' })
  }

  return next()
}

server.get('/projects', (req, res) => {
  return res.json(projects)
})

server.post('/projects', (req, res) => {
  const { id, title } = req.body

  projects.push({
    id,
    title,
    tasks: []
  })

  return res.json(projects)
})

server.put('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params
  const { title } = req.body

  const project = projects.find(p => p.id == id)
  project.title = title

  return res.json(project)
})

server.delete('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params

  const projectIndex = projects.findIndex(p => p.id == id)
  projects.splice(projectIndex, 1)

  return res.json(projects)
})

server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const { id } = req.params
  const { title } = req.body

  const project = projects.find(p => p.id == id)
  project.tasks.push(title)

  return res.json(project)
})

server.listen(3000)