import {Navigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import SubmitButton from '../../../components/form/SubmitButton';
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import zod from 'zod';
import { useForm } from 'react-hook-form';
import useAuthStore from "../../../routes/auth-store";

const schema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6),
});

const LoginPage = () => {
    const loading = useAuthStore((state) => state.loading);
    const login = useAuthStore((state) => state.login);
    const user = useAuthStore((state) => state.user);

    const { register, handleSubmit, formState: { errors }, setError } = useForm({ values: { email: "user@test.com", password: "pass@123" }, resolver: zodResolver(schema) });

    const onSubmit = async (data) => {
        try {
            await login(data);
        } catch (error) {
            console.log("loginError", error);
            setError('root', { type: 'manual', message: error.message });
        }
    }

    if (user) {
        return <Navigate to="/" />;
    }

    return (
        <AuthLayout>
            <div className="card">
                <div className="card-body p-5">
                    <div className="text-center mb-4">
                        <h4 className="card-title">Login</h4>
                        <p className="text-muted">Login to continue to FastApp</p>

                    </div>

                    {errors.root && <div className="alert alert-danger">{errors?.root?.message}</div>}

                    <form noValidate onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Username</label>
                            <input type="email" className="form-control" id="email" {...register('email')} />
                            {errors.email && <div className='invalid-feedback d-block'>{errors.email.message}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" {...register('password')} />
                            {errors.password && <div className='invalid-feedback d-block'>{errors.password.message}</div>}
                        </div>
                        <div className="text-end mb-3">
                            <Link to="/forgot-password" className="text-muted">Forgot Password?</Link>
                        </div>
                        <SubmitButton pending={loading}>Login</SubmitButton>
                    </form>
                    <div className="text-center text-muted">
                        <div className="border-top mx-3 mt-4">
                            <div className="position-relative top-100 start-50 translate-middle"><span className="h6 bg-white px-2">OR</span></div>
                        </div>
                        <p>Don&apos;t have an account? <Link to="/register" className="text-primary">Register</Link></p>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
};

export default LoginPage;
