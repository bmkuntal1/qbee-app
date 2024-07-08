import useAuthStore from '../../../routes/auth-store'
import profileImage from '../../../../assets/images/profile.jpg'
import httpClient from '../../../helpers/http-client'
import { useMutation } from '@tanstack/react-query';
import { getApiFileUrl } from '../../../helpers/utils';

const saveAvatar = async (formData) => {
    const response = await httpClient.put('/user/avatar', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data
}

const EditUserAvatar = () => {
    const user = useAuthStore((state) => state.user);
    const refreshUser = useAuthStore((state) => state.refreshUser);
    const { isPending, mutate } = useMutation({ mutationFn: saveAvatar, onSuccess: (data) => refreshUser({ ...user, avatar: data.avatar }) });

    const handleFileSelect = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            mutate(formData);
        }
    }
    return (
        <div className="text-center mb-3">
            <h4 className="pt-3">My Profile</h4>
            <div className="mb-2">
                <img src={user?.avatar ? getApiFileUrl(user.avatar) : profileImage} alt="profile" className="avatar-image-lg rounded-pill shadow" />
                {/* edit icon over image */}
                <div className="d-inline-block position-relative">
                    <label htmlFor="profile-picture" className="avatar-edit d-flex align-item-center justify-content-center position-absolute top-100 start-0 translate-middle rounded-circle bg-primary-subtle p-1">
                        {isPending? <div className="spinner-border spinner-border-sm text-primary h-100 w-100" role="status"></div> : <i className="bi bi-pencil"></i>}
                    </label>
                    <input type="file" id="profile-picture" className="d-none" onChange={handleFileSelect} />
                </div>
            </div>
            <p className="text-muted h5 fw-light">{user?.firstName} {user?.lastName}</p>
            <p className="text-muted text-primary">{user?.email}</p>
        </div>
    )
}

export default EditUserAvatar