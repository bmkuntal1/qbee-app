const ResultAlert = ({ type = "info", message }) => {
  const getIcon = (icon, color) => {
    return <i className={`bi bi-${icon} text-${color}`} style={{fontSize:"60px"}}></i>
  }
  return (
    <div className="text-center p-2">
      <div className="mb-3">
        {type === 'success' && getIcon('check-circle', 'success')}
        {type === 'error' && getIcon('exclamation-circle', 'danger')}
        {type === 'info' && getIcon('info-circle', 'info')}
      </div>
      <div>{message}</div>
    </div>
  )
}

export default ResultAlert