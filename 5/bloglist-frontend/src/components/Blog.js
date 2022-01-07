import React, { useState } from 'react'
import PropTypes from 'prop-types'

//details html-tagi hoitaisi vastaavan toteutuksen huomattavasti nopeammin
const Blog = ({ blog, addLikes, user, deleteBlog }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const [liked, setLiked] = useState(false)
  const [addedByUser, setAddedByUser] = useState(false)
  const currentBlog = { ...blog }
  const toggleVisibility = () => {
    setVisible(!visible)
    if (user.username === blog.user.username) {
      setAddedByUser(true)
    }
  }

  const newLike = async () => {
    const newLikes = currentBlog.likes + 1
    setLikes(newLikes)
    setLiked(true)
    addLikes(currentBlog.id, newLikes)
  }

  const deleteCurrentBlog = () => {
    const id = blog.id
    deleteBlog(id, blog)
  }

  return (
    <div id="bloginfo">
      <p className="bloghead">
        {blog.title}, {blog.author}
      </p>
      <div id="like" onClick={newLike}>
        {liked ? (
          <img src="fullheart.png" alt="full heart" width="17" />
        ) : (
          <img src="heart.png" alt="empty heart" width="17" />
        )}
      </div>
      <div id="showmore" onClick={toggleVisibility}>
        {visible ? ' - ' : ' + '}
      </div>
      {visible ? (
        <div id="moreinfo">
          <p>{blog.url}</p>
          <p>{likes} likes</p>
          <div className="lastline">
            <p style={{ display: 'inline' }}>
              added by {blog.user.name ? blog.user.name : blog.user.username}
            </p>
            {visible && addedByUser ? (
              <button className="deletebutton" onClick={deleteCurrentBlog}>
                delete blog
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLikes: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default Blog
