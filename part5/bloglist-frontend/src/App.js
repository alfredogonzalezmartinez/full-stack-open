import React, { useEffect, useRef, useState } from 'react'
import { blogService } from './services/blogs'
import BlogForm from './components/BlogForm'
import BlogsList from './components/BlogsList'
import LoggedHeader from './components/LoggedHeader'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [user, setUser] = useState(null)
  const [errorStatus, setErrorStatus] = useState(null)
  const [blogs, setBlogs] = useState([])

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('user')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
      setBlogs(sortedBlogs)
    })
  }, [])

  const handleErrorStatus = (isError = true, message ='error') => {
    setErrorStatus({ isError, message })
    setTimeout(() => {
      setErrorStatus(null)
    }, 5000)
  }

  const handleSesion = (user = null) => {
    setUser(user)
    blogService.setToken(user?.token)
    user
      ? window.localStorage.setItem('user', JSON.stringify(user))
      : window.localStorage.removeItem('user')
  }

  const handleNewBlogCreation = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
      setBlogs(blogs => [...blogs, newBlog])
      handleErrorStatus(false, `a new blog ${ newBlog.title } by ${ newBlog.author } added`)
      blogFormRef.current.toggleVisibility()
      return Promise.resolve(newBlog)
    } catch (error) {
      handleErrorStatus(true, 'failed to add blog')
      return Promise.reject(error)
    }
  }

  const handleBlogLikes = async (id) => {
    try{
      const updatedBlog = await blogService.addLike({ id })
      setBlogs(blogs => blogs.map( blog =>
        blog.id === id
          ? updatedBlog
          : blog
      ))
    }catch (error) {
      handleErrorStatus(true, 'failed to add like')
    }
  }

  const handleBlogRemoval = async (id) => {
    try{
      await blogService.remove({ id })
      setBlogs(blogs => blogs.filter(blog => blog.id !== id))
    }catch (error) {
      console.log(error)
      handleErrorStatus(true, 'failed to remove blog')
    }
  }

  if (!user) return <LoginForm handleSesion={handleSesion}/>

  return (
    <article>
      <h2>blogs</h2>
      <LoggedHeader username={user.name} handleSesion={handleSesion}/>
      {errorStatus && <Notification errorStatus={errorStatus}/>}
      <Togglable ref={blogFormRef} showButtonLabel='new blog' hideButtonLabel='cancel'>
        <BlogForm handleNewBlogCreation={handleNewBlogCreation}/>
      </Togglable>
      <BlogsList
        blogs={blogs}
        handleBlogLikes={handleBlogLikes}
        handleBlogRemoval={handleBlogRemoval}
      />
    </article>
  )
}

export default App
