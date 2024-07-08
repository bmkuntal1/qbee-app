import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <aside >
            <div className="nav-sidebar offcanvas-lg offcanvas-start sticky-lg-top vh-100 text-bg-primary" tabIndex={-1} id="navSidebar" aria-labelledby="navSidebarLabel">
                <div className="offcanvas-header d-lg-flex">
                    <h5 className="offcanvas-title px-lg-2" id="navSidebarLabel">
                        <i className="bi bi-book me-2"></i>Canvas
                    </h5>
                    <button type="button" className="btn-close btn-close-white d-lg-none" data-bs-dismiss="offcanvas" data-bs-target="#navSidebar" aria-controls="navSidebar" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body flex-column">
                    <div className="border-bottom border-primary-subtle d-none d-lg-block mx-3"></div>
                    <ul className="nav flex-column justify-content-center mt-4" role="navigation" data-bs-theme="dark">
                        <li>
                            <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                <i className="bi bi-speedometer2"></i> Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/leads" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                <i className="bi bi-funnel"></i> Leads
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/orders" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                <i className="bi bi-headset"></i> Tickets
                            </NavLink>
                        </li>
                        <li>
                            <a href="#" className="nav-link">
                                <i className="bi bi-building"></i> Customers
                            </a>
                        </li>
                        <li className="nav-item">
                            <div className="nav-title text-muted ps-3 mt-2">Settings</div>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/users" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                <i className="bi bi-people"></i> Users
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/system/logs" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                <i className="bi bi-file-text"></i> System Logs
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/system/info" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                <i className="bi bi-info-circle"></i> System Info
                            </NavLink>
                        </li>

                    </ul>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;