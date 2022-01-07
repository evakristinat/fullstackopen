import { useState } from 'react'

//details html-tagi hoitaisi vastaavan toteutuksen huomattavasti nopeammin
const Blog = ({ blog, addLikes, setError }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const [liked, setLiked] = useState(false)
  const currentBlog = { ...blog }
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const newLike = async () => {
    const newLikes = currentBlog.likes + 1
    setLikes(newLikes)
    setLiked(true)
    try {
      addLikes(currentBlog.id, newLikes)
    } catch (exception) {
      setError('Unable to add likes. Try again later.')
    }
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
          <p>added by {blog.user.name ? blog.user.name : blog.user.username}</p>
        </div>
      ) : null}
    </div>
  )
}

export default Blog
