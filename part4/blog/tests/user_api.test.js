const bcrypt = require('bcrypt')
const { describe, test, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const userAtStart = await User.find({})
    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await User.find({})
    assert.strictEqual(usersAtEnd.length, userAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with too short password', async () => {
    const userAtStart = await User.find({})
    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'sa',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect((res) => {
        if (res.res.statusMessage !== 'password needs to be at least three characters long') {
          throw new Error(`Expected statusMessage to be 'password needs to be at least three characters long', but got '${res.res.statusMessage}'`)
        }})

    const usersAtEnd = await User.find({})
    assert.strictEqual(userAtStart.length, usersAtEnd.length)
  })

  test('creation fails with too short username', async () => {
    const userAtStart = await User.find({})
    const newUser = {
      username: 'ml',
      name: 'Matti Luukkainen',
      password: 'sasa',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400, /minimum allowed length \(3\)/)

    const usersAtEnd = await User.find({})
    assert.strictEqual(userAtStart.length, usersAtEnd.length)
  })

  test('creation fails with duplicate username', async () => {
    const userAtStart = await User.find({})
    const newUser = {
      username: 'root',
      name: 'Matti Luukkainen',
      password: 'sasa',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400, /expected `username` to be unique/)

    const usersAtEnd = await User.find({})
    assert.strictEqual(userAtStart.length, usersAtEnd.length)
  })

})