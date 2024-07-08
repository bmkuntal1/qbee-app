import { NavLink, Outlet } from "react-router-dom"
import EditUserAvatar from './EditUserAvatar';

const ProfileLayout = () => {
    return (
        <div className="container">
            <div className="row justify-content-center mt-4">
                <div className="col-12 col-lg-2" style={{ minWidth: 250 }}>
                    <EditUserAvatar />
                    <ul className="nav nav-pills flex-lg-column text-center text-lg-start p-3">
                        <li className="nav-item">
                            <NavLink to="/profile" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>My Profile</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/profile/change-password" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Change Password</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/profile/settings" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Settings</NavLink>
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

export default ProfileLayout