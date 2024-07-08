import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AuthLayout from './AuthLayout';
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import zod from "zod";
import httpClient from "../../../helpers/http-client"
import SubmitButton from "../../../components/form/SubmitButton"
import FormField from "../../../components/form/FormField";


const sendVerifyEmailRequest = () => {
  const response = httpClient.post("/auth/resend-confirmation-email");
  return response.data;
}

const schema = zod.object({
  email: zod.string().email({ message: "Invalid email address" }),
});


const SendVerifyEmail = () => {
  const { email } = useSearchParams();
  const navigate = useNavigate();

  const { isPending, isSuccess, isError, error, mutate } = useMutation({
    mutationFn: sendVerifyEmailRequest,
    onSuccess: () => setTimeout(() => navigate("/login"), 4000)
  });

  return (
    <AuthLayout>
      <div className="card">
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <h4 className="card-title">Verify Your Email!</h4>
            <p className="text-muted">Hi There, your email is not verified. Use the below button to send verification link again.</p>
            {
              isSuccess && <div className="alert alert-success" role="alert">
                Email has been sent to your email address. Please verify your email.
              </div>
            }
          </div>
          <form onSubmit={() => mutate(email)}>
            <SubmitButton pending={isPending}>Send Verification Email</SubmitButton>
          </form>
          <div className="text-center mt-3">
            <div className="border-top mx-3 mt-4">
              <div className="position-relative top-100 start-50 translate-middle"><span className="h6 bg-white px-2">OR</span></div>
            </div>
            <p className="text-muted">Question? Email us at <a href="mailto:test@tes.com" className="text-primary">test@test.com</a></p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};
export default SendVerifyEmail;
