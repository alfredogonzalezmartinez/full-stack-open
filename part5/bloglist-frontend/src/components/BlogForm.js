import { useState } from "react"
import Input from "./Input"

const BlogForm = ({handleNewBlogCreation}) => {
  const [title, SetTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleTitleChanges = ({target}) => SetTitle(target.value)
  const handleAuthorChanges = ({target}) => setAuthor(target.value)
  const handleUrlChanges = ({target}) => setUrl(target.value)

  const handleSubmit = async (event) =>{
    event.preventDefault()
    const newblog = { title, author, url }
    try {
      await handleNewBlogCreation(newblog)
      SetTitle("")
      setAuthor("")
      setUrl("") 
    } catch (error) {
      return
    } 
  }

  return (
    <section>
      <h3>create new</h3>
      <form onSubmit={handleSubmit} >
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
  )
}

export default BlogForm
