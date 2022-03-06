import { useState } from "react"
import { login } from "../services/login"
import Input from "./Input"
import Notification from "./Notification"


const LoginForm = ({handleSesion}) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorStatus, setErrorStatus] = useState(null)

  const handleUsernameChanges = ({target}) => setUsername(target.value)
  const handlePasswordChanges = ({target}) => setPassword(target.value)

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
      setUsername("")
      setPassword("")
      handleSesion(user)
    } catch (error) {
      handleErrorStatus(true," wrong username or pasword")
    }
  }

  return (
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
}

export default LoginForm