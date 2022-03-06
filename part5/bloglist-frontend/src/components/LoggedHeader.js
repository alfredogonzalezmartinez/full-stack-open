const LoggedHeader = ({username, handleSesion}) =>{ 
  const handleLogout = () =>{
    handleSesion()
  }

  return (
    <section>
      <p>
        {username} logged in{" "}
        <button onClick={handleLogout}>logout</button>
      </p>
    </section>
  )
}

export default LoggedHeader