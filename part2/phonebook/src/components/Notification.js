const Notification =({message}) => {
  let notificationStyle = {
    'padding': '10px',
    'color': 'green',
    'border': 'green 2px solid',
    'borderRadius': '15px',
    'margin': '15px 0',
    'fontSize': '20px',
    'backgroundColor': 'rgb(237, 255, 233)'
  }
  if(!message.success) {
    notificationStyle.color = 'red';
    notificationStyle.borderColor = '#ff4040';
    notificationStyle.backgroundColor = 'rgb(255, 250, 250)'

  }
  if (!message.info) return null;
  return(
    <div style={notificationStyle}>
      {message.info}
    </div>
  )
}

export default Notification;