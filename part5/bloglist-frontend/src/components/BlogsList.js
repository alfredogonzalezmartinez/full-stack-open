import Blog from "./Blog";

const BlogsList = ({ blogs, handleBlogLikes, handleBlogRemoval }) => (
  <section>
    <h3>List of blogs</h3>
    <ul>
      { blogs.map( blog =>  
        <li key={ blog.id }>
          <Blog 
            blog={ blog }
            handleBlogLikes={ handleBlogLikes }
            handleBlogRemoval={ handleBlogRemoval }
          />
        </li>
      )}
    </ul>
  </section>
)

export default BlogsList