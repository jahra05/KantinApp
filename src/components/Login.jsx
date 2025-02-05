import { useState } from "react"
import { login } from "../api"
import { useNavigate } from "react-router-dom"

export default function Login() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()


  function HandleEmailChange(e) {
    setUsername(e.target.value)
  }


  function HandlePasswordChange(e) {
    setPassword(e.target.value)
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await login({ username, password });

    console.log("login result", result);  // Log hasil respons untuk pengecekan

    if (!result.error) {
      console.log('login successful');
      navigate('/produk');  // Arahkan ke halaman produk setelah login berhasil
    } else {
      console.log('login failed');
    }
  };

  return (
    <>


      <form onSubmit={handleLogin}>
        <div className="login">

          <p>Login</p>


          <img src="/public/login.png" />

          <label>username</label>
          <input type="text" placeholder="ketik username" id="username" onChange={HandleEmailChange} value={username} />

          <label>password</label>
          <input type="password" placeholder="ketik password" id="password" onChange={HandlePasswordChange} value={password} />

          <button type="submit">login</button>
        </div>

      </form>


    </>
  )
}