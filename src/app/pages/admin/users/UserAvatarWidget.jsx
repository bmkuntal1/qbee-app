import { useParams } from 'react-router-dom';
import profileImage from '../../../../assets/images/profile.jpg'
import { useQuery } from '@tanstack/react-query'
import httpClient from '../../../helpers/http-client'
import { getApiFileUrl } from '../../../helpers/utils';
import UserAvatarPlaceholder from '../../../components/placeholder/UserAvatarPlaceholder';

const getData = async (id) => {
    const response = await httpClient.get(`/users/${id}/detail`);
    return response.data;
};

// const saveAvatar = async (formData) => {
//     const response = await httpClient.put('/users/avatar', formData, {
//         headers: {
//             'Content-Type': 'multipart/form-data'
//         }
//     })
//     return response.data
// }

const UserAvatarWidget = () => {
    const { id } = useParams();
    const { isPending, data: user } = useQuery({ queryKey: ['get-user-detail', id], queryFn: async () => await getData(id) });
    // const { isPending, mutate } = useMutation({ mutationFn: saveAvatar, onSuccess: (data) => setUser({ ...user, avatar: data.avatar }) });

    // const handleFileSelect = async (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         const formData = new FormData();
    //         formData.append('file', file);
    //         mutate(formData);
    //     }
    // }

    return (
        <div className="text-center mb-3">

            {isPending ? <UserAvatarPlaceholder /> :
                <>
                    <h4><i className="bi bi-shield-check fs-5"></i> {user.role}</h4>
                    <div className="mb-2">
                        <img src={user?.avatar ? getApiFileUrl(user.avatar) : profileImage} alt="profile" className="avatar-image-lg rounded-pill shadow" />
                        {/* edit icon over image */}
                        {/* <div className="d-inline-block position-relative">
                    <label htmlFor="profile-picture" className="avatar-edit d-flex align-item-center justify-content-center position-absolute top-100 start-0 translate-middle rounded-circle bg-primary-subtle p-1">
                        {isPending? <div className="spinner-border spinner-border-sm text-primary h-100 w-100" role="status"></div> : <i className="bi bi-pencil"></i>}
                    </label>
                    <input type="file" id="profile-picture" className="d-none" onChange={handleFileSelect} />
                </div> */}
                    </div>
                    <p className="text-muted h5 fw-light">{user?.firstName} {user?.lastName}</p>
                    <p className="text-muted text-primary">{user?.email}</p>
                </>
            }
        </div>
    )
}

export default UserAvatarWidget