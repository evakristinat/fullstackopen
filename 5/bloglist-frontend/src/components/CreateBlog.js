import React, { useState } from 'react'

const CreateBlog = ({ addNew }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    addNew({
      title: title,
      author: author,
      url: url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <form id="newblogform" onSubmit={addBlog}>
        <h2>add new</h2>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          required
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          name="title"
        ></input>
        <label htmlFor="author">Author</label>
        <input
          id="author "
          type="text"
          required
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          name="author"
        ></input>
        <label htmlFor="url">Url</label>
        <input
          id="url"
          type="url"
          required
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          name="url"
        ></input>
        <button type="submit">add</button>
      </form>
    </>
  )
}
export default CreateBlog
