const Notification =(props) => {
  const notificationStyle = {
    'padding': '10px',
    'color': 'green',
    'border': 'green 2px solid',
    'borderRadius': '15px',
    'margin': '15px 0',
    'fontWeight': 'bold',
    'fontSize': '20px',
    'backgroundColor': 'rgb(237, 255, 233)'
  }
  if (!props.message) return null;
  return(
    <div style={notificationStyle}>
      {props.message}
    </div>
  )
}

export default Notification;