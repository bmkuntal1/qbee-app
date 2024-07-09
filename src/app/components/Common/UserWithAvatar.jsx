import { getApiFileUrl } from "../../helpers/utils";

const UserWithAvatar = ({ user }) => {
    return (
        <div className="d-flex align-items-center">
            <img src={getApiFileUrl(user.avatar)} alt={user.name} className="avatar-image rounded-circle" />
            <div className="ms-3">
                <h6 className="m-0">{user.name}</h6>
                {user.email && <small className="text-muted">{user.email}</small>}
            </div>
        </div>
    )
}

export default UserWithAvatar