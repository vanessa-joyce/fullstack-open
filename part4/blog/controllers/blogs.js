const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('createdBy', { username: 1, name: 1 })
  return response.status(200).json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const user = request.user
  if (!user) return response.status(401).end()
  const blog = new Blog({ ...request.body, createdBy: user._id })

  const savedBlog = await blog.save()
  await savedBlog.populate('createdBy', { username: 1, name: 1 })
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  return response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true }).populate('createdBy')
  return response.status(200).json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user
  const blog = await Blog.findOne({ _id: request.params.id, createdBy: user._id })
  if (!blog) return response.status(400).json({ error: 'blog with this id does not exist or is not editable by user' })
  await blog.deleteOne()
  return response.status(204).end()
})

module.exports = blogsRouter