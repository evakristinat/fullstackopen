import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  const emptyInputs = () => {
    setUsername('')
    setPassword('')
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in', username)
    try {
      const user = await loginService.login({ username, password })
      //user sisältää nyt backendin palauttaman tokenin, käyttäjänimen ja nimen
      setUser(user)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      emptyInputs()
    } catch (exception) {
      setError(exception.message)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const getBlogs = async () => {
    try {
      const res = await blogService.getAll()
      return setBlogs(res)
    } catch (exception) {
      setError(exception.message)
    }
  }

  useEffect(() => {
    const loggedUserLocal = window.localStorage.getItem('loggedUser')
    if (loggedUserLocal) {
      setUser(JSON.parse(loggedUserLocal))
    }
  }, [])

  useEffect(() => {
    getBlogs()
  }, [])

  const loginForm = () => (
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
  )

  //jos nimeä ei ole annettu, käytetään käyttäjätunnusta
  const blogsList = () => (
    <main>
      <p style={{ display: 'inline' }}>
        Logged in as {user.name ? user.name : user.username}
      </p>
      <button onClick={handleLogout}>logout</button>
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
      <Notification message={message} error={error} />
      {!user ? loginForm() : blogsList()}
    </>
  )
}

export default App
