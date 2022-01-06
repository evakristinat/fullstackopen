import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in', username)
    try {
      const user = await loginService.login({ username, password })
      //user sisältää nyt backendin palauttaman tokenin, käyttäjänimen ja nimen
      setUser(user)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setError('wrong username or password')
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    blogService.setToken(null)
    setUser(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    await blogService.addNew({
      title: event.target[0].value,
      author: event.target[1].value,
      url: event.target[2].value,
    })
    setMessage(`New blog '${event.target[0].value}' added to the list`)
    document.getElementById('newBlogForm').reset()
    getBlogs()
  }

  const getBlogs = async () => {
    try {
      const res = await blogService.getAll()
      return setBlogs(res)
    } catch (exception) {
      setError('Data could not be reached')
    }
  }

  useEffect(() => {
    const loggedUserLocal = window.localStorage.getItem('loggedUser')
    if (loggedUserLocal) {
      const user = JSON.parse(loggedUserLocal)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (error || message)
      setTimeout(() => {
        setMessage('')
        setError('')
      }, 4000)
  }, [error, message])

  useEffect(() => {
    getBlogs()
  }, [])

  const LoginForm = () => (
    <>
      <Notification message={message} error={error} />
      <form onSubmit={handleLogin}>
        <h3>login to add blogs</h3>
        <div>
          <label htmlFor="username">username</label>
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            autoComplete="username"
            onChange={({ target }) => setUsername(target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            id="password"
            type="password"
            value={password}
            name="password"
            autoComplete="current-password"
            onChange={({ target }) => setPassword(target.value)}
          ></input>
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )

  const CreateBlog = () => (
    <>
      <h2>add new</h2>
      <form id="newBlogForm" onSubmit={addBlog}>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title"></input>
        <label htmlFor="author">Author</label>
        <input id="author " type="text" name="author"></input>
        <label htmlFor="url">Url</label>
        <input id="url" type="url" name="url"></input>
        <button style={{ display: 'block' }} type="submit">
          add
        </button>
      </form>
    </>
  )

  //jos nimeä ei ole annettu, käytetään käyttäjätunnusta
  const BlogsList = () => (
    <main>
      <p style={{ display: 'inline' }}>
        Logged in as {user.name ? user.name : user.username}
      </p>
      <button id="logout" onClick={handleLogout}>
        logout
      </button>
      <Notification error={error} message={message} />
      <CreateBlog />
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </main>
  )

  const Notification = ({ message, error }) => {
    if (message) {
      return <p className="success">{message}</p>
    } else if (error) {
      return <p className="error">{error}</p>
    } else return null
  }

  return (
    <>
      <h1>Blog List</h1>
      {!user ? LoginForm() : BlogsList()}
    </>
  )
}

export default App
