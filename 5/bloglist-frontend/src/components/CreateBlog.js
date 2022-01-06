import React from 'react'


const CreateBlog = ({ addBlog }) => {

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
