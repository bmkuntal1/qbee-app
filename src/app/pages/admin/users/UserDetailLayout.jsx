import { Link, NavLink, Outlet, useParams } from "react-router-dom"
import UserAvatarWidget from './UserAvatarWidget';

const UserDetailLayout = () => {
    const {id}= useParams();
    return (
        <div className="container">
            <div className="row justify-content-center mt-4">
                <div className="col-12 col-lg-2" style={{ minWidth: 250 }}>
                    {/* back link */}
                    <div className="d-flex justify-content-center">
                        <Link to="/users" className="btn btn-link text-decoration-none"><i className="bi bi-arrow-left"></i> Back</Link>
                    </div>
                    <UserAvatarWidget />
                    <ul className="nav nav-pills flex-lg-column text-center text-lg-start p-3">
                        <li className="nav-item">
                            <NavLink to={`/users/${id}`} end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>User Detail</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={`/users/${id}/settings`} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Settings</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={`/users/${id}/activities`} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Activities</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="col-12 col-lg-8">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default UserDetailLayout