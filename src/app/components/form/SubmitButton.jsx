const Spinner = () => {
    return (
        <div className="spinner-border spinner-border-sm" role="status"></div>
    )
}

const SubmitButton = ({ pending, children, className }) => {
    return (
        <button type="submit" className={className || 'btn btn-primary w-100'} disabled={pending}>
            {pending && <Spinner></Spinner>} {children || 'Submit'}
        </button>
    );
}

export default SubmitButton;