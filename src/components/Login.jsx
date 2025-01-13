import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"


export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [login, setLogin] = useState(false)
  const [error, setError] = useState(null)

  function HandleEmailChange(e) {
    setEmail(e.target.value)
  }


  function HandlePasswordChange(e) {
    setPassword(e.target.value)
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      if (email === 'jahra@gmail.com' && password === '123') {
        const token = "jara12345"
        localStorage.setItem('token', token)
        setLogin(true)
        setError(null)
      } else {
        throw new Error("email atau password salah");
      }
    } catch (error) {
      setError(error.message)
    }
  }




  if (login) {
    return <Navigate to='/produk' />
  }
  return (
    <>
      
        <form onSubmit={handleLogin}>
          <div className="login">
            <p>Login</p>

            <label>username</label>
            <input type="text" placeholder="ketik username" id="username" onChange={HandleEmailChange} value={email} />

            <label>password</label>
            <input type="password" placeholder="ketik password" id="password" onChange={HandlePasswordChange} value={password} />

            <button type="submit">login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>

        </form>
      

    </>
  )
}