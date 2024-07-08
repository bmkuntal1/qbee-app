import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import httpClient from "../../../helpers/http-client";

const fetchData = async () => {
    const { data } = await httpClient.get("/user/profile");
    return data;
};

const UserProfilePage = () => {
    const { isPending, data } = useQuery({ queryKey: ['todos'], queryFn: fetchData });

    if (isPending) return (
        <div className="card">
            <div className="card-body text-center p-3">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    )

    return (
        <div className="card">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h4 className="card-title mb-3">User Profile</h4>
                    <Link to="edit" className="btn btn-link text-decoration-none">
                        <i className="bi bi-pencil"></i> Edit
                    </Link>
                </div>
                <div className="row">
                    {/* display user details using dt and dl */}

                    <div className="col-md-6">
                        <dl className="row g-3">
                            <dt className="col-4">First Name</dt>
                            <dd className="col-8">{data?.firstName}</dd>

                            <dt className="col-4">Last Name</dt>
                            <dd className="col-8">{data?.lastName}</dd>

                            <dt className="col-4">Email</dt>
                            <dd className="col-8"><a href={`mailto:${data?.email}`}>{data?.email}</a></dd>

                            <dt className="col-4">Phone</dt>
                            <dd className="col-8">{data?.phoneNumber?data?.phoneNumber:<small className="text-muted fst-italic">Not available</small>}</dd>

                            <dt className="col-4">Address</dt>
                            <dd className="col-8">123, Main Street, City</dd>

                            <dt className="col-4">Role</dt>
                            <dd className="col-8">Admin</dd>

                            <dt className="col-4">Status</dt>
                            <dd className="col-8">Active</dd>

                            <dt className="col-4">Created</dt>
                            <dd className="col-8">01/01/2021</dd>

                            <dt className="col-4">Updated</dt>
                            <dd className="col-8">01/01/2021</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfilePage;
