require('dotenv').config()
const express = require('express')
const app = express()
const Note = require('./models/note')

app.use(express.json())
app.use(express.static('dist'))

const generateId = () => {
  const maxId = notes.length > 0
  ? Math.max(...notes.map(n => Number(n.id)))
  : 0
}

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})
  
app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    console.log(notes, 'notes')
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)
  if (note) response.json(note)
  response.statusMessage = `Note with id ${id} not found`
  response.status(404).end()
})

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  }

  notes = notes.concat(note)
  response.json(note)
})

app.put('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const updatedNote = request.body
  //const note = notes.find(note => note.id === id)
  notes = notes.map((note) => 
    note.id === id ? {...note, ...updatedNote} : note
  )

  response.json(updatedNote)
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})