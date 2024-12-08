const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('createdBy')
  return response.status(200).json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const user = await User.findOne({})
  console.log(user, 'user')
  const blog = new Blog({ ...request.body, createdBy: user._id })

  console.log(blog, 'blog')

  const result = await blog.save()
  return response.status(201).json(result)
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
  return response.status(200).json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  return response.status(204).end()
})

module.exports = blogsRouter