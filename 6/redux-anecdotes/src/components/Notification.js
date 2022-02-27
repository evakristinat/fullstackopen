import { useSelector} from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  return notification.visible ? (
    <div style={style}>{notification.text}</div>
  ) : (
    ''
  )
}

export default Notification
