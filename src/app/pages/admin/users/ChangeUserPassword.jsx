
import { useState } from "react";
import { useForm } from "react-hook-form";
import httpClient from "../../../helpers/http-client";
import { useMutation } from '@tanstack/react-query';
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "../../../components/form/SubmitButton";


const changePassword = async (data) => {
    const response = await httpClient.put(`/users/update-password`, data);
    return response.data;
}

const schema = zod.object({
    password: zod.string().min(6),
});

const ChangeUserPassword = ({ id }) => {
    const [showChangePassword, setShowChangePassword] = useState(false);

    const { isPending, mutate, isError, error } = useMutation({ mutationFn: changePassword, onSuccess: () => onClose() }); // {onSuccess: m

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ values: { password: "" }, resolver: zodResolver(schema)});

    const onSubmit = async (data) => {
        mutate({ id, newPassword: data.password });
    }

    const onClose = () => {
        setShowChangePassword(false);
        reset();
    }

    return (
        <>
            {showChangePassword ?
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="hstack gap-2 mb-2">
                        <input type="password" className="form-control form-control-sm" placeholder="Enter new password" id="password" {...register("password", { required: true })} style={{maxWidth:"200px"}}/>
                        <SubmitButton type="submit" className="btn btn-primary btn-sm btn-width-lg" pending={isPending}>Save</SubmitButton>
                        <button type="button" className="btn btn-danger btn-sm" onClick={() => setShowChangePassword(false)}>Cancel</button>
                    </div>
                    {errors?.password && <small className="invalid-feedback d-block">{errors?.password?.message}</small>}
                    {isError && <small className="text-danger d-block">{error?.response?.data}</small>}
                </form>
                :
                <button className="btn btn-link text-decoration-none" onClick={() => setShowChangePassword(true)}>
                    <i className="bi bi-key"></i> Change Password
                </button>
            }
        </>

    );
}

export default ChangeUserPassword;



