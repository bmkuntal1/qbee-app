import { Link } from "react-router-dom";
import AuthLayout from "./common/auth/AuthLayout"
import PageTitle from './../components/page/PageTitle';

const NotFoundPage = () => {
  return (
    <>
      <PageTitle title="Not Found" />
      <AuthLayout>
        <div className="flex items-center justify-center h-full">
          <div className="card">
            <div className="card-body text-center p-5">
              <h1 className="display-1 fw-smibold">404</h1>
              <p className="lead text-muted">Page not found</p>

              <div className="mt-4">
                <Link to="/" className="btn btn-primary">
                  Go back to home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </AuthLayout>
    </>
  );
};
export default NotFoundPage;
