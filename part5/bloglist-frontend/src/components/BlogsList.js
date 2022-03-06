import React from 'react'
import PropTypes from 'prop-types'
import Blog from './Blog'

const BlogsList = ({ blogs, handleBlogLikes, handleBlogRemoval }) => (
  <section>
    <h3>List of blogs</h3>
    <ul>
      {blogs.map(blog =>
        <li key={blog.id}>
          <Blog
            blog={ blog }
            handleBlogLikes={handleBlogLikes}
            handleBlogRemoval={handleBlogRemoval}
          />
        </li>
      )}
    </ul>
  </section>
)

BlogsList.propTypes = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape( {
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired,
      user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
    })
  ),
  handleBlogLikes: PropTypes.func.isRequired,
  handleBlogRemoval: PropTypes.func.isRequired,
}

export default BlogsList
