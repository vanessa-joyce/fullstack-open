const { test, describe, beforeEach } = require('node:test')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

describe('api', () => {
  let token = ''
  beforeEach(async () => {
    await Blog.deleteMany({})
    const user = await User.findOne({ username: 'vsutter' })
    const blogsToInsert = helper.initialBlogs.map(blog => ({ ...blog, createdBy: user._id }))
    await Blog.insertMany(blogsToInsert)

    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'vsutter', password: '1234' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
    token = loginResponse.body.token
  })

  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 2)
  })

  test('unique property is named id', async () => {
    const response = await api.get('/api/blogs')
    const firstBlog = response.body[0]
    assert('id' in firstBlog)
    assert(!('_id' in firstBlog))
  })

  test('new blog entry is created', async () => {
    const blog = { author: 'Patrick', title: 'Typescript is nice', url: 'https://www.patrick.ch', likes: 10 }

    const existingBlogs = await api.get('/api/blogs')

    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const updatedBlogs = await api.get('/api/blogs')

    assert.strictEqual(updatedBlogs.body.length, existingBlogs.body.length + 1)
  })

  test('new blog entry without token does not get created', async () => {
    const blog = { author: 'Patrick', title: 'Typescript is nice', url: 'https://www.patrick.ch', likes: 10 }
    const existingBlogs = await api.get('/api/blogs')

    await api
      .post('/api/blogs')
      .send(blog)
      .expect(401)

    const updatedBlogs = await api.get('/api/blogs')
    assert.strictEqual(updatedBlogs.body.length, existingBlogs.body.length)
  })

  test('if the likes property is missing from the request, default to the value 0', async () => {
    const blog = { author: 'Patrick', title: 'Typescript is nice', url: 'https://www.patrick.ch' }

    const savedBlog = await api.post('/api/blogs')
      .send(blog)
      .set('Authorization', 'Bearer ' + token)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(savedBlog.body.likes, 0)
  })

  test('return error if title or url properties are missing', async () => {
    const blogWithoutTitle = { author: 'Patrick', url: 'https://www.patrick.ch', likes: 10 }
    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(blogWithoutTitle)
      .expect(400)


    const blogWithoutUrl = { author: 'Patrick', title: 'Typescript is nice', likes: 10 }
    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(blogWithoutUrl)
      .expect(400)
  })

  test('delete a blog entry', async () => {
    const blogs = await Blog.find({})
    await api
      .delete(`/api/blogs/${blogs[0].id}`)
      .set('Authorization', 'Bearer ' + token)
      .expect(204)
  })

  test('update a blog', async () => {
    let blog = await Blog.findOne()
    blog.likes = 100
    const updatedBlog = await api
      .put(`/api/blogs/${blog.id}`)
      .set('Authorization', 'Bearer ' + token)
      .send(blog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(JSON.stringify(updatedBlog.body), JSON.stringify(blog.toJSON()))
  })
})