import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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
      const user = await loginService.login({username, password})
      window.localStorage.setItem('loggedInUserBlogapp', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleBlogCreation = async (event) => {
    event.preventDefault()
    try {
      blogService.create({title, author, url})
    } catch (exception) {
      console.log('error')
    }
    console.log(event)
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedInUserBlogapp')
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>username
        <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>password
        <input type="text" value={password} name="Password" onChange={({ target }) => setPassword(target.value)}/>
      </div>
      <button type='submit'>login</button>
    </form>
  )

  const blogForm = () => (
    <form onSubmit={handleBlogCreation}>
      <div>title
        <input type='text' value={title} name='Title' onChange={({ target }) => setTitle(target.value)} />
      </div>
      <div>author
        <input type='text' value={author} name='Author' onChange={({ target }) => setAuthor(target.value)} />
      </div>
      <div>url
        <input type='url' value={url} name='Url' onChange={({ target }) => setUrl(target.value)} />
      </div>
      <button type='submit'>create</button>
    </form>
  )

  return (
    <div>
      <h2>blogs</h2>
      {user === null ?
        loginForm() : 
        <div>
          <p>{user.name} logged in <button type='submit' onClick={handleLogout}>logout</button></p>
          {blogForm()}
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App