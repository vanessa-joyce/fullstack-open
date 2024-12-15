const Notification = ({ notification }) => {
  if (notification) {
    let color = notification.status === 'success' ? 'border-emerald-400' : 'border-rose-500'
    return (
      <div className={`${notification.status} border-4 p-4 ${color}`}>{notification.text}</div>
    )
  }
}

export default Notification