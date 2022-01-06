import React, { useState, useEffect, useRef } from 'react'
import BlogsList from './components/BlogList'
import LoginForm from './components/LoginFom'
import Notification from './components/Notification'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const createBlogForm = useRef()

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

  const getBlogs = async () => {
    try {
      const res = await blogService.getAll()
      return setBlogs(res)
    } catch (exception) {
      setError('Data could not be reached')
    }
  }

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      await blogService.addNew({
        title: event.target[0].value,
        author: event.target[1].value,
        url: event.target[2].value,
      })
      setMessage(`New blog '${event.target[0].value}' added to the list`)
      document.getElementById('newBlogForm').reset()
      createBlogForm.current.toggleVisibility()
      getBlogs()
    } catch (exception) {
      setError('Session timed out. Login again to continue.')
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

  return (
    <>
      <h1>Blog List</h1>
      {!user ? (
        <LoginForm
          message={message}
          error={error}
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      ) : (
        <>
          <p style={{ display: 'inline' }}>
            Logged in as {user.name ? user.name : user.username}
          </p>
          <button id="logout" onClick={handleLogout}>
            logout
          </button>
          <Notification error={error} message={message} />
          <Togglable buttonLabel="add new blog" ref={createBlogForm}>
            <CreateBlog addBlog={addBlog} />
          </Togglable>
          <BlogsList
            user={user}
            handleLogout={handleLogout}
            error={error}
            message={message}
            blogs={blogs}
          />
        </>
      )}
    </>
  )
}

export default App
