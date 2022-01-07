import React from 'react'

const Notification = ({ message, error }) => {
  if (message) {
    return <p className="success">{message}</p>
  } else if (error) {
    return <p className="error">{error}</p>
  } else return null
}

export default Notification
