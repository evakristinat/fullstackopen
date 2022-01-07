import React from 'react'
import Notification from './Notification'
import PropTypes from 'prop-types'

const LoginForm = ({
  message,
  error,
  handleLogin,
  username,
  handleNameChange,
  password,
  handlePasswordChange,
}) => (
  <>
    <form id="loginform" onSubmit={handleLogin}>
      <h3>login to add blogs</h3>
      <Notification message={message} error={error} />
      <div>
        <label htmlFor="username">username</label>
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          autoComplete="username"
          onChange={({ target }) => handleNameChange(target.value)}
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
          onChange={({ target }) => handlePasswordChange(target.value)}
        ></input>
      </div>
      <button type="submit">login</button>
    </form>
  </>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  message: PropTypes.string,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
