import React from 'react'
import Blog from './Blog'

//jos nimeä ei ole annettu, käytetään käyttäjätunnusta
const BlogsList = ({ blogs, updateLikes, user, deleteBlog }) => {
  return (
    <main>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateLikes={updateLikes}
          user={user}
          deleteBlog={deleteBlog}
        />
      ))}
    </main>
  )
}

export default BlogsList
