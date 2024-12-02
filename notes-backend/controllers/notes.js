const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

notesRouter.get('/', async (request, response) => {
  console.log('test')
  const note = await Note.find({}).populate('user', { username: 1, name: 1 })
  response.json(note)
})

notesRouter.get('/:id', async (request, response) => {
  const note = await Note.findById(request.params.id)
  return note ? response.json(note) : response.status(404).end()
})

notesRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findById(body.userId)

  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user.id
  })
  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()
  response.status(201).json(savedNote)
})

notesRouter.delete('/:id', async (request, response) => {
  await Note.findByIdAndDelete(request.params.id)
  response.status(204).end()
})


notesRouter.put('/:id', async (request, response) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, { new: true })
  response.status(200).json(updatedNote)
})

module.exports = notesRouter