const Spinner = ({loading, size}) => {
    if (loading) {
        return (
            <div className={`d-block spinner-border ${size === 'sm' ? `spinner-border-${size}` : ''} text-primary`} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        )
    }
    return null
}

export default Spinner