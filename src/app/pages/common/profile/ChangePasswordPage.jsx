import { Link, useNavigate } from "react-router-dom";
import SubmitButton from "../../../components/form/SubmitButton";
import httpClient from './../../../helpers/http-client';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import zod from 'zod';
import FormField from "../../../components/form/FormField";

const savePassword = async (data) => {
    const response = await httpClient.put("/user/change-password", data);
    return response.data;
}

const schema = zod.object({
    currentPassword: zod.string().nonempty({ message: "Current password is required" }),
    newPassword: zod.string().nonempty({ message: "New password is required" }),
    confirmPassword: zod.string().nonempty({ message: "Confirm password is required" })
}).refine((data) => data.currentPassword !== data.newPassword, { path: ["newPassword"], message: "New password can not be same" })
    .refine((data) => data.confirmPassword === data.newPassword, { message: "Password does not match" , path: ["confirmPassword"]})


const ChangePasswordPage = () => {
    const navigate = useNavigate();
    const { isLoading, isSuccess, isError, error, mutate } = useMutation({ mutationFn: savePassword, onSuccess: () => setTimeout(() => navigate("/profile"), 3000)})

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

    const onSubmit = async (data) => {
        await mutate(data);
    }

    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title">Change Password</h4>
                {isSuccess && <div className="alert alert-success">Password updated successfully</div>}
                {isError && <div className="alert alert-danger">{error?.response?.data}</div>}
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <div className="row align-item-center mt-4">
                        <div className="col-12 col-md-6 offset-md-3">
                            <FormField type="password" name="currentPassword" label="Current Password" register={register} errors={errors} />
                            <FormField type="password" name="newPassword" label="New Password" register={register} errors={errors} />
                            <FormField type="password" name="confirmPassword" label="Confirm Password" register={register} errors={errors} />
                        </div>
                    </div>
                    <div className="row g-3 justify-content-center py-lg-3">
                        <div className="col-lg-3">
                            <SubmitButton pending={isLoading}>Update</SubmitButton>
                        </div>
                        <div className="col-lg-3">
                            <Link to="/profile" className="btn btn-outline-secondary w-100">Cancel</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default ChangePasswordPage;
