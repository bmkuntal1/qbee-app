
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import zod from "zod";
import httpClient from "../../../helpers/http-client"
import SubmitButton from "../../../components/form/SubmitButton"
import FormField from "../../../components/form/FormField";

const resetPassword = async (data) => {
  const response = await httpClient.post("/auth/reset-password", data);
  return response.data;
}

const schema = zod.object({
  password: zod.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: zod.string().min(6, { message: "Password must be at least 6 characters" }),
}).refine(data => data.password === data.confirmPassword, { message: "Passwords do not match", path: ["confirmPassword"] });

const ResetPasswordPage = () => {
  //get user id and code from url
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { isPending, isSuccess, isError, error, mutate } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => setTimeout(() => navigate("/login"), 3000)
  });

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    data.email = searchParams.get("email");
    data.code = searchParams.get("code");
    const payload = { email: data.email, resetCode: data.code, newPassword: data.password };
    await mutate(payload);
  }

  return (
    <AuthLayout>
      <div className="card">
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <h4 className="card-title">Reset Password</h4>
            <p className="text-muted">Enter new password to save</p>
            {isSuccess && <div className="alert alert-success">Password reset successfully.</div>}
            {isError && <div className="alert alert-danger">{error?.response?.data} </div>}
          </div>

          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <FormField label="Password" type="password" name="password" register={register} errors={errors} />
            <FormField label="Confirm Password" type="password" name="confirmPassword" register={register} errors={errors} />
            <SubmitButton pending={isPending}>Reset Password</SubmitButton>
          </form>
          <div className="text-center mt-3">
            <div className="border-top mx-3 mt-4">
              <div className="position-relative top-100 start-50 translate-middle"><span className="h6 bg-white px-2">OR</span></div>
            </div>
            <p className="text-muted">Remember your password? <Link to="/login" className="text-primary">Login</Link></p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};
export default ResetPasswordPage;
