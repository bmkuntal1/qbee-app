//bootstrap admin page sidbar and topbar with search and profile dropdown use plain bootstrap and boostrap-icons

import { Link, Navigate } from "react-router-dom";
import useAuthStore from "../../routes/auth-store"
import { getApiFileUrl } from '../../helpers/utils';

const Topbar = () => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    if (!user) {
        return <Navigate to="/login" />;
    }
    return (
        <>
            <header>
                <nav className="nav-topbar navbar navbar-expand-lg fixed-top text-bg-light shadow-sm" aria-label="Top navigation">
                    <div className="container-fluid">
                        <button className="navbar-toggler shadow-none border-0 text-primary p-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#navSidebar" aria-controls="navSidebar" aria-label="Toggle main navigation">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="bi" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"></path>
                            </svg>
                            <span className="d-none fs-6 pe-1">Browse</span>
                        </button>

                        <span className="navbar-brand"></span>
                        <div className="d-flex flex-end align-items-center">
                            {/* Notofication button with badge on top*/}
                            <a className="position-relative" href="#">
                                <i className="bi bi-bell text-warning fs-5"></i><span className="badge rounded-pill text-bg-primary top-0 start-100 translate-middle" style={{ padding: "3px" }}>27</span>
                            </a>

                            <div className="dropdown">
                                <a href="#" className="d-flex align-items-center text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    <small className="fw-normal me-1">{user?.email}</small> <img src={getApiFileUrl(user?.avatar)} alt="user" className="avatar-image rounded-pill" />
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end text-small shadow" >
                                    <li><Link to="/profile" className="dropdown-item"><i className="bi bi-person"></i>  Profile</Link></li>
                                    <li><Link to="/profile/change-password" className="dropdown-item"><i className="bi bi-key"></i> Change Password</Link></li>
                                    <li><Link to="/profile/settings" className="dropdown-item"><i className="bi bi-gear"></i> Settings</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><button className="dropdown-item" onClick={() => logout()}><i className="bi bi-box-arrow-right"></i> Sign out</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}

export default Topbar;