import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()
  const sortedBlogs = [...blogs].sort((a, b) => a.title.localeCompare(b.title))

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUserBlogapp')
    if(loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      loginService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedInUserBlogapp', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleBlogCreation = async (blog) => {
    try {
      const returnedBlog = await blogService.create(blog)
      setBlogs(blogs.concat(returnedBlog))
      setNotification({ status: 'success', text: `a new blog ${blog.title} by ${blog.author} added` })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setNotification({ status: 'error', text: exception.message })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedInUserBlogapp')
  }

  const handleLike = async (blog) => {
    try {
      const returnedBlog = await blogService.update(blog.id, blog)
      setBlogs(blogs.map(blog => blog.id === returnedBlog.id ? returnedBlog : blog))
    } catch (exception) {
      setNotification({ status: 'error', text: exception.message })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleBlogRemoval = async (blog) => {
    try {
      await blogService.remove(blog.id)
      console.log('entfernt')
      setBlogs(blogs.filter(currentBlog => currentBlog.id !== blog.id))
      setNotification({ status: 'success', text: `Removed blog ${blog.title} by ${blog.author}` })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      console.log(exception)
      setNotification({ status: 'error', text: exception.message })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="flex flex-col">
        <label className="mb-1 text-gray-700 font-medium">Username</label>
        <input
          data-testid="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-1 text-gray-700 font-medium">Password</label>
        <input
          data-testid="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>
      <button
        data-testid="login"
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Login
      </button>
    </form>
  )

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={handleBlogCreation} />
    </Togglable>
  )

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Blogs</h2>
      <Notification notification={notification} />
      {user === null ? (
        loginForm()
      ) : (
        <div className="space-y-6">
          <p className="text-gray-700">
            {user.name} logged in{' '}
            <button
              type="submit"
              onClick={handleLogout}
              className="text-blue-500 hover:underline"
            >
              Logout
            </button>
          </p>
          {blogForm()}
          <div className="space-y-4">
            {sortedBlogs.map((blog) => (
              <Blog key={blog.id} blog={blog} addLike={handleLike} removeBlog={handleBlogRemoval} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App