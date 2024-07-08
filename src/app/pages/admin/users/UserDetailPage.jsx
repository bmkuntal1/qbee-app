import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import httpClient from "../../../helpers/http-client";
import EditUserModal from './EditUserModal';
import ChangeUserPassword from './ChangeUserPassword';
import UserDetailPlaceholder from "../../../components/placeholder/UserDetailPlaceholder";
import ChangeUserStatus from './ChangeUserStatus';
import PageTitle from "../../../components/page/PageTitle";

const getData = async (id) => {
    const response = await httpClient.get(`/users/${id}/detail`);
    return response.data;
};

const EmailStatus = ({ data }) => {
    {
        return data?.isEmailConfirmed ?
            <span className="badge rounded-pill bg-info">Confirmed</span> :
            <span className="badge rounded-pill bg-warning">Not Confirmed</span>
    }
};
const PhoneNumberStatus = ({ data }) => {
    return data?.phoneNumber && data?.isPhoneNumberConfirmed === true ?
        <span className="badge rounded-pill bg-info">Confirmed</span> :
        <span className="badge rounded-pill bg-warning">Not Confirmed</span>
};


const UserProfilePage = () => {
    const { id } = useParams();

    const [showEdit, setShowEdit] = useState(false);

    const { isPending, data, refetch } = useQuery({ queryKey: ['get-user-detail', id], queryFn: async () => await getData(id) });

    const onEditClose = (result) => {
        setShowEdit(false);
        if (result) {
            refetch();
        }
    }

    if (isPending) return (
        <div className="card">
            <div className="card-body text-center p-3">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            <UserDetailPlaceholder />
        </div>
    )

    return (
        <>
            <PageTitle title="User Details" />
            <div className="card">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h4 className="card-title mb-3">User Details</h4>
                        <button to="edit" className="btn btn-link text-decoration-none" onClick={() => setShowEdit(true)}>
                            <i className="bi bi-pencil"></i> Edit
                        </button>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <h5 className="text-muted mt-2 mb-3">Personal Information</h5>
                            <dl className="row g-3">
                                <dt className="col-4">First Name</dt>
                                <dd className="col-8">{data?.firstName}</dd>

                                <dt className="col-4">Last Name</dt>
                                <dd className="col-8">{data?.lastName}</dd>

                                <dt className="col-4">Email</dt>
                                <dd className="col-8"><a href={`mailto:${data?.email}`}>{data?.email}</a> <EmailStatus data={data} /> <br /> <ChangeUserStatus id={id} /></dd>

                                <dt className="col-4">Phone Number</dt>
                                <dd className="col-8">{data?.phoneNumber ? data?.phoneNumber : <small className="text-muted fst-italic">Not available</small>} <PhoneNumberStatus data={data} /> <br /> <ChangeUserStatus id={id} /></dd>

                                <dt className="col-4">Address</dt>
                                <dd className="col-8">123, Main Street, City</dd>

                                <dt className="col-4">Role</dt>
                                <dd className="col-8">{data?.role}</dd>

                                <dt className="col-4">Status</dt>
                                <dd className="col-8">Active</dd>

                                <dt className="col-4">Created</dt>
                                <dd className="col-8">01/01/2021</dd>

                                <dt className="col-4">Updated</dt>
                                <dd className="col-8">01/01/2021</dd>
                            </dl>

                            <h5 className="text-muted mt-2 mb-3">Account Settings</h5>
                            <dl className="row g-3">
                                <dt className="col-4">Password</dt>
                                <dd className="col-8"><ChangeUserPassword id={id} /></dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
            {showEdit && <EditUserModal id={id} show={showEdit} onClose={onEditClose} />}
        </>
    );
}

export default UserProfilePage;
