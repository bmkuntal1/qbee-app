
const UserSettingsPage = () => {
    return (
        <div className="card">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h4 className="card-title mb-3">User Settings</h4>
                    {/* <Link to="edit" className="btn btn-link text-decoration-none">
                        <i className="bi bi-pencil"></i> Edit
                    </Link> */}
                </div>
                <div className="row">
                    {/* display user details using dt and dl */}

                    <div className="col-md-8">
                        <dl className="row g-3">
                            {/* Timezone */}
                            <dt className="col-4">Timezone</dt>
                            <dd className="col-8">
                                <select className="form-select">
                                    <option value="1">GMT+5:30</option>
                                    <option value="2">GMT+5:45</option>
                                </select>
                            </dd>
                            <dt className="col-4">Notifications</dt>
                            <dd className="col-8">
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Enable Notifications</label>
                                </div>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default UserSettingsPage;
