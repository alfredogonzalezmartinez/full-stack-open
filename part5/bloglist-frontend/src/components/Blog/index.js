import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleBlogLikes, handleBlogRemoval }) => {
  const [showDetails, setShowDetails] = useState(false)
  const toggleShowDetails = () => setShowDetails(showDetails => !showDetails)

  const user = JSON.parse(window.localStorage.getItem('user'))

  const handleLikeAddition = () => handleBlogLikes(blog.id)

  const handleBlogRemoving = () => {
    const message = `Remove blog "${blog.title}" by ${blog.author}`
    if (window.confirm(message)) {
      handleBlogRemoval(blog.id)
    }
  }

  return (
    <article>
      <h4>
        {blog.title} by {blog.author}{' '}
        <button onClick={toggleShowDetails}>
          {showDetails?'hide':'view'}
        </button>
      </h4>
      { showDetails && (
        <section>
          <p>
            <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a>
          </p>
          <p>
            likes {blog.likes}{' '}
            <button onClick={handleLikeAddition}>like</button></p>
          <p>Added by {blog.user.name}</p>
          {blog.user.username === user?.username && (
            <button onClick={handleBlogRemoving}>remove</button>
          )}
        </section>
      )}
    </article>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape( {
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }),
  handleBlogLikes: PropTypes.func.isRequired,
  handleBlogRemoval: PropTypes.func.isRequired,
}

export default Blog
