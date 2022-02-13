import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { hide } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  if (notification.visible) {
    setTimeout(() => dispatch(hide()), 5000)
  }

  return notification.visible ? (
    <div style={style}>{notification.text}</div>
  ) : (
    ''
  )
}

export default Notification
