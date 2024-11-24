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

const getAuthorList = (blogs) => {
  if (!blogs || blogs.length === 0) return null
  const authorList = []
  blogs.map(blog => {
    const authorListIndex = authorList.findIndex((author) => author.author === blog.author)

    if (authorListIndex >= 0) {
      authorList[authorListIndex].blogs += 1
      authorList[authorListIndex].likes += blog.likes
      return
    }

    authorList.push({
      author: blog.author,
      blogs: 1,
      likes: blog.likes
    })
  })

  return authorList
}

const mostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) return null
  const authorList = getAuthorList(blogs)
  return authorList.reduce((max, author) => author.blogs > max.blogs ? author : max)
}

const mostLikes = (blogs) => {
  if (!blogs || blogs.length === 0) return null
  const authorList = getAuthorList(blogs)
  return authorList.reduce((max, author) => author.likes > max.likes ? author : max)
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }