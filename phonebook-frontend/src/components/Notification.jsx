const Notification = ({ message, type }) => {
  const notificationStyles = {
    notification: {
      background: 'lightgrey',
      color: type === 'success' ? 'green' : 'red',
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBotton: 10
    }
  }
  if (message === null) return null

  return (
    <div style={notificationStyles.notification}>
      {message}
    </div>
  )
}

export default Notification