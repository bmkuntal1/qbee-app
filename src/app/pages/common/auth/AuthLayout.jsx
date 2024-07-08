import PropTypes from 'prop-types';

const AuthLayout = ({ children, title }) => {
    return (
        <div className="auth-page container-fluid vh-100 bg-primary">
            <div className="row h-100 justify-content-center align-items-center">
                <div className="col-md-6 col-lg-6 col-xl-5">
                    <div className="text-center text-light mb-2 mb-lg-4">
                        <span className="h3 mb-3">🚀 Mourli App!</span>
                        <p>{title || 'Welcome to Mourli App'}</p>
                    </div>
                    {children}
                    <div className="text-center mt-3 mt-lg-5">
                        <p className="text-light">© 2024 🚀 FastApp by Mourli Systems</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

AuthLayout.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string
};

export default AuthLayout;