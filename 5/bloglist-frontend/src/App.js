import React, { useState, useEffect, useRef } from 'react'
import BlogsList from './components/BlogList'
import LoginForm from './components/LoginFom'
import Notification from './components/Notification'
import CreateBlog from './components/CreateBlog'
import Toggle from './components/Toggle'
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
      res.sort((a, b) => b.likes - a.likes)
      setBlogs(res)
    } catch (exception) {
      setError('Data could not be reached')
    }
  }

  const addNew = async (blogObject) => {
    try {
      const returnedBlog = await blogService.addNew(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setMessage(`New blog '${blogObject.title}' added to the list`)
      createBlogForm.current.toggleVisibility()
    } catch (exception) {
      setError('Session timed out. Login again to continue.')
    }
  }

  const addLikes = async (id, likes) => {
    blogService.addLikes(id, likes)
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
        <>
          <LoginForm
            message={message}
            error={error}
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </>
      ) : (
        <>
          <div>
            <p style={{ display: 'inline-block' }}>
              Logged in as {user.name ? user.name : user.username}
            </p>
            <button id="logout" onClick={handleLogout}>
              logout
            </button>
          </div>
          <Notification error={error} message={message} />
          <Toggle
            buttonLabel="add new blog"
            secondButtonLabel="cancel"
            ref={createBlogForm}
          >
            <CreateBlog
              addNew={addNew}
              setMessage={setMessage}
              setError={setError}
            />
          </Toggle>
          <BlogsList blogs={blogs} setError={setError} addLikes={addLikes} />
          <div>
            Heart icon made by{' '}
            <a href="https://www.freepik.com" title="Freepik">
              Freepik
            </a>{' '}
            from{' '}
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>
          </div>
          <div>
            Full heart icon made by{' '}
            <a
              href="https://www.flaticon.com/authors/pixel-perfect"
              title="Pixel perfect"
            >
              Pixel perfect
            </a>{' '}
            from{' '}
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>
          </div>
        </>
      )}
    </>
  )
}

export default App
