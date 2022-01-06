import React from 'react'

const CreateBlog = ({addNew}) => {
  const addBlog = async (event) => {
    event.preventDefault()
    await addNew({
      title: event.target[0].value,
      author: event.target[1].value,
      url: event.target[2].value,
    })

    document.getElementById('newBlogForm').reset()
  }

  return (
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
}
export default CreateBlog
