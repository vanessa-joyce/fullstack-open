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

const mostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) return null
  const authorList = []
  blogs.map(blog => {
    const authorListIndex = authorList.findIndex((author) => author.author === blog.author)

    if (authorListIndex >= 0) {
      authorList[authorListIndex].blogs += 1
      return
    }

    authorList.push({
      author: blog.author,
      blogs: 1
    })
  })

  return authorList.reduce((max, author) => author.blogs > max.blogs ? author : max)
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }