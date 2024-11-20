// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (!blogs || blogs.length === 0) return null
  return blogs.reduce((max, blog) => {
    return blog.likes > max.likes ? blog : max
  }, blogs[0]
  )
}

module.exports = { dummy, totalLikes, favoriteBlog }