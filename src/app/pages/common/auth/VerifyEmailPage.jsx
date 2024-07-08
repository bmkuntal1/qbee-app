import AuthLayout from './AuthLayout';
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import httpClient from '../../../helpers/http-client';

const getEmailVerification = async (userId, code) => {
    const response = await httpClient.get("/auth/confirm-email", { params: { userId, code } });
    return response.data;
}

const VerifyEmail = () => {
    //get user id and code from url
    const [searchParams] = useSearchParams();

    //send request to server to verify email
    const { isLoading, isError, isSuccess } = useQuery({ queryKey: ["email-verification"], queryFn: () => getEmailVerification(searchParams.get("userId"), searchParams.get("code")) });

    return (
        <AuthLayout title="Verify Email">
            <div className="card">
                <div className="card-body p-5">
                    <div className="text-center mb-4">
                        <h4 className="card-title">Email Verification!</h4>

                        {isLoading ? <div className="alert alert-info" role="alert">
                            <div className="spinner-border spinner-border-lg mt-2"></div>
                            <p className="text-muted">Verifying your email...</p>
                        </div> :
                            <>
                                {isError &&
                                    <div className="alert alert-danger" role="alert">
                                        <i className="bi bi-exclamation-triangle display-1 mb-4"></i>
                                        <p>Sorry! Your email is not verified. Use the below button to send verification link again.</p>
                                    </div>
                                }

                                {isSuccess &&
                                    <div className="alert alert-success" role="alert">
                                        <i className="bi bi-check-circle display-1 mb-4"></i>
                                        <p>Congratulations! Your email is verified.   </p>
                                    </div>
                                }
                            </>
                        }
                    </div>
                    <div className="text-center mt-3">
                        <div className="border-top mx-3 mt-4">
                            <div className="position-relative top-100 start-50 translate-middle"><span className="h6 bg-white px-2">OR</span></div>
                        </div>
                        <p className="text-muted">Question? Email us at <a href="mailto:test@tes.com" className="text-primary">test@test.com</a></p>
                        <p className="text-muted">You can use App now <Link to="/login" className="text-primary">Login</Link></p>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}

export default VerifyEmail;