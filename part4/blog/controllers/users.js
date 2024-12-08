const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.status(200).json(users)
})

usersRouter.post('/',async (request, response) => {
  const { username, name, password } = request.body

  if (password.length < 3) {
    response.statusMessage = 'password needs to be at least three characters long'
    return response.status(400).end()
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter