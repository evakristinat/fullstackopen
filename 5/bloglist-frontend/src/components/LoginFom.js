import React from "react"
import Notification from "./Notification"

const LoginForm = ({
  message,
  error,
  handleLogin,
  username,
  setUsername,
  password,
  setPassword
}) => (
  <>
    <Notification message={message} error={error} />
    <form onSubmit={handleLogin}>
      <h3>login to add blogs</h3>
      <div>
        <label htmlFor="username">username</label>
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          autoComplete="username"
          onChange={({ target }) => setUsername(target.value)}
        ></input>
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input
          id="password"
          type="password"
          value={password}
          name="password"
          autoComplete="current-password"
          onChange={({ target }) => setPassword(target.value)}
        ></input>
      </div>
      <button type="submit">login</button>
    </form>
  </>
)

export default LoginForm