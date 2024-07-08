

const PageContainer = ({ children }) => {
    return (
        <div className="container-fluid p-4">
            {children}
        </div>
    );
}

const PageHeader = ({ children }) => {
    return (
        children
    );
}

PageContainer.Header = PageHeader;

const PageBody = ({ children, className = "col-lg-12" }) => {
    return (
        <div className="row justify-content-center">
            <div className={className} >
                <div className="card">
                    <div className="card-body">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

PageContainer.Body = PageBody;

export default PageContainer;