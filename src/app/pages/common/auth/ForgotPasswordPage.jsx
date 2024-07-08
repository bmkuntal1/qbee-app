
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import zod from "zod";
import httpClient from "../../../helpers/http-client"
import SubmitButton from "../../../components/form/SubmitButton"
import FormField from "../../../components/form/FormField";

const sendForgotPasswordRequest = async (data) => {
    const response = await httpClient.post("/auth/forgot-password", data);
    return response.data;
}

const schema = zod.object({
    email: zod.string().email({ message: "Invalid email address" }),
});

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const { isPending, isSuccess, isError, error, mutate } = useMutation({
        mutationFn: sendForgotPasswordRequest,
        onSuccess: () => setTimeout(() => navigate("/login"), 4000)
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
                        <h4 className="card-title">Forgot Password</h4>
                        <p className="text-muted">Enter your email to reset your password</p>
                        {isSuccess && <div className="alert alert-success">Password reset link sent successfully.</div>}
                        {isError && <div className="alert alert-danger">{error}</div>}
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormField label="Email" type="email" name="email" register={register} errors={errors} />
                        <SubmitButton pending={isPending}>Submit</SubmitButton>
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

export default ForgotPasswordPage;