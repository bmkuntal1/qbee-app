const UserDetailPlaceholder = () => {
    return (
        <>
            <div className="row placeholder-glow mx-3 mb-3">
                <div className="col">
                    <h4><span className="placeholder col-8"></span></h4>
                </div>
                <div className="col-auto">
                    <a className="btn btn-primary btn-sm disabled placeholder col-12" style={{width:"100px"}}></a>
                </div>

            </div>
            <div className="row">
                <div className="col-md-12 ps-5">
                    <dl className="row g-3 placeholder-glow">
                        <dt className="col-4"><span className="placeholder col-6"></span></dt>
                        <dd className="col-8"><span className="placeholder col-8"></span></dd>

                        <dt className="col-4"><span className="placeholder col-6"></span></dt>
                        <dd className="col-8"><span className="placeholder col-8"></span></dd>

                        <dt className="col-4"><span className="placeholder col-6"></span></dt>
                        <dd className="col-8"><span className="placeholder col-8"></span></dd>

                        <dt className="col-4"><span className="placeholder col-6"></span></dt>
                        <dd className="col-8"><span className="placeholder col-8"></span></dd>
                    </dl>
                </div>
            </div>
        </>
    );
}

export default UserDetailPlaceholder;