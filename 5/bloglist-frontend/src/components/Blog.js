import React, { useState } from 'react'
import PropTypes from 'prop-types'

//details html-tagi hoitaisi vastaavan toteutuksen huomattavasti nopeammin
const Blog = ({ blog, updateLikes, user, deleteBlog }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const [liked, setLiked] = useState(false)
  const [addedByUser, setAddedByUser] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
    if (user.username === blog.user.username) {
      setAddedByUser(true)
    }
  }

  //jos blogin tykkäysnappia painetaan uudestaan, tykkäys poistetaan
  const handleLike = () => {
    let newLikes
    if (!liked) {
      newLikes = likes + 1
    } else {
      newLikes = likes - 1
    }
    setLikes(newLikes)
    updateLikes(blog.id, newLikes)
    setLiked(!liked)
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
      <div id="like" onClick={handleLike}>
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
          <p id="likeinfo">
            {likes} {likes === 1 ? 'like' : 'likes'}
          </p>
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
  updateLikes: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default Blog
