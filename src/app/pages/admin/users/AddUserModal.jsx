import PageModal from '../../../components/page/PageModal';
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import zod from "zod";
import httpClient from "../../../helpers/http-client"
import SubmitButton from "../../../components/form/SubmitButton"
import FormField from "../../../components/form/FormField";

const saveData = async (data) => {
    const response = await httpClient.post("/users", data);
    return response.data;
}

const schema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
    firstName: zod.string().min(3),
    lastName: zod.string().min(3),
});

const AddUserModal = ({ show, onClose }) => {
    const { isPending, mutate, isError, isSuccess, error, reset:apiReset } = useMutation({
        mutationFn: saveData, onSuccess: () => {
            reset();
            apiReset();
            onClose(true);
        }
    });
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(schema)
    });

    const onSubmit = (data) => {
        mutate(data);
    }

    return (
        <PageModal title="Add User" show={show} onClose={onClose}>
            {isError && <div className="alert alert-danger">{error?.response?.data?.message}</div>}
            {isSuccess && <div className="alert alert-success">User added successfully</div>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormField label="First Name" type="text" name="firstName" register={register} errors={errors} />
                <FormField label="Last Name" type="text" name="lastName" register={register} errors={errors} />
                <FormField label="Email" type="email" name="email" register={register} errors={errors} />
                <FormField label="Password" type="password" name="password" register={register} errors={errors} />
                <div className="hstack justify-content-end gap-3">
                    <button type="button" className="btn btn-secondary btn-width-lg" onClick={onClose}>Close</button>
                    <SubmitButton className="btn btn-primary btn-width-lg" pending={isPending}>Save</SubmitButton>
                </div>
            </form>
        </PageModal>
    );
}

export default AddUserModal;