import React from 'react'
import Blog from './Blog'

//jos nimeä ei ole annettu, käytetään käyttäjätunnusta
const BlogsList = ({ blogs, setError, addLikes }) => {

  return (
    <main>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          setError={setError}
          addLikes={addLikes}
        />
      ))}
    </main>
  )
}

export default BlogsList
