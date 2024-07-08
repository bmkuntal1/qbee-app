import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import zod from "zod";
import httpClient from "../../../helpers/http-client"
import SubmitButton from "../../../components/form/SubmitButton"
import FormField from "../../../components/form/FormField";

const saveData = async (data) => {
  const response = await httpClient.post("/auth/register", data);
  return response.data;
}

const schema = zod.object({
  firstName: zod.string().nonempty({ message: "First Name is required" }),
  lastName: zod.string().nonempty({ message: "Last Name is required" }),
  email: zod.string().email({ message: "Invalid email address" }),
  password: zod.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: zod.string().min(6, { message: "Password must be at least 6 characters" }),
}).refine(data => data.password === data.confirmPassword, { message: "Passwords do not match", path: ["confirmPassword"] });

const RegisterPage = () => {
  const navigate = useNavigate();
  const { isPending, isSuccess, isError, error, mutate } = useMutation({
    mutationFn: saveData,
    onSuccess: () => setTimeout(() => navigate("/login"), 3000)
  });

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    await mutate(data);
  }

  return (
    <AuthLayout>
      <div className="card">
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <h4 className="card-title">Register</h4>
            <p className="text-muted">Create an account to continue to Mourli App</p>
            {isSuccess && <div className="alert alert-success">User registered successfully.</div>}
            {isError && <div className="alert alert-danger">{error?.response?.data}</div>}
          </div>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <FormField label="First Name" type="text" name="firstName" register={register} errors={errors} />
            <FormField label="Last Name" type="text" name="lastName" register={register} errors={errors} />
            <FormField label="Email" type="email" name="email" register={register} errors={errors} />
            <FormField label="Password" type="password" name="password" register={register} errors={errors} />
            <FormField label="Confirm Password" type="password" name="confirmPassword" register={register} errors={errors} />
            <SubmitButton pending={isPending}>Register</SubmitButton>
          </form>
          <div className="text-center text-muted">
            <div className="border-top mx-3 mt-4">
              <div className="position-relative top-100 start-50 translate-middle">
                <span className="h6 bg-white px-2">OR</span>
              </div>
            </div>
            <p>Already have an account? <Link to="/login" className="text-primary">Login</Link></p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
