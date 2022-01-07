import { forwardRef, useState } from 'react'

//details html-tagi hoitaisi vastaavan toteutuksen huomattavasti nopeammin
const Blog = forwardRef(({ blog }, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div id="bloginfo">
      <p className="bloghead">
        {blog.title}, {blog.author}
      </p>
      <div id="like">♡</div>
      <div id="showmore" onClick={toggleVisibility}>
        {visible ? ' - ' : ' + '}
      </div>
      {visible ? (
        <div id="moreinfo">
          <p>{blog.url}</p>
          <p>{blog.likes} likes</p>
          <p>added by {blog.user.name ? blog.user.name : blog.user.username}</p>
        </div>
      ) : null}
    </div>
  )
})

export default Blog
