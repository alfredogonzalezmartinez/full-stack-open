import { useState, useEffect } from 'react'
import { blogService } from './services/blogs'
import { login } from './services/login'
import Blog from './components/Blog'
import Input from './components/Input'
import Notification from './components/Notification' 

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [errorStatus, setErrorStatus] = useState(null)

  const [blogs, setBlogs] = useState([])
  const [title, SetTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("user")
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    } 
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleUsernameChanges = ({target}) => setUsername(target.value)
  const handlePasswordChanges = ({target}) => setPassword(target.value)

  const handleTitleChanges = ({target}) => SetTitle(target.value)
  const handleAuthorChanges = ({target}) => setAuthor(target.value)
  const handleUrlChanges = ({target}) => setUrl(target.value)

  const handleErrorStatus = (isError = true, message ="error") => {
    setErrorStatus({ isError, message });
    setTimeout(() => {
      setErrorStatus(null);
    }, 5000);
  };

  const handleLogin = async (event) =>{
    event.preventDefault()
    try {
      const user = await login({username, password})
      setUser(user)
      setUsername("")
      setPassword("")
      window.localStorage.setItem("user", JSON.stringify(user))
      blogService.setToken(user.token)
    } catch (error) {
      handleErrorStatus(true," wrong username or pasword")
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem("user")
    setUser(null)
  }

  const handleNewBlogCreation = async (event) =>{
    event.preventDefault()
    try {
      const newblog = await blogService.create({ title, author, url })
      setBlogs(blogs => [...blogs, newblog])
      SetTitle("")
      setAuthor("")
      setUrl("")
      handleErrorStatus(false, `a new blog ${newblog.title} by ${newblog.author} added`)
    } catch (error) {
      handleErrorStatus(true, "failed to add blog")
    }
  }

  const renderLoginForm = () => (
      <section>
        <h2>log in to application</h2>
        {errorStatus && <Notification errorStatus={errorStatus}/>}
        <form onSubmit={handleLogin}>
          <Input 
            id="username" 
            label="username" 
            type="text" 
            value={username} 
            onChange={handleUsernameChanges}
          />
          <Input 
            id="password" 
            label="password" 
            type="password" 
            value={password} 
            onChange={handlePasswordChanges}
          />
          <button>login</button>
        </form>
      </section>
    )

  const renderBlogs = () => (
    <article>
      <h2>blogs</h2>
      {errorStatus && <Notification errorStatus={errorStatus} />}
      <section>
        <p>
          {user.name} logged in{" "}
          <button onClick={handleLogout}>logout</button>
          </p>
      </section>      
      <section>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </section>
      <section>
        <h3>create new</h3>
        <form onSubmit={handleNewBlogCreation}>
          <Input
            id="title"
            label="title:" 
            type="text" 
            value={title} 
            onChange={handleTitleChanges}
          />
          <Input
            id="author"
            label="author:" 
            type="text" 
            value={author} 
            onChange={handleAuthorChanges}
          />
          <Input
            id="url"
            label="url:" 
            type="text" 
            value={url} 
            onChange={handleUrlChanges}
          />
          <button>create</button>
        </form>
      </section>
    </article>
  )

  return user 
    ? renderBlogs() 
    : renderLoginForm()    
}

export default App
