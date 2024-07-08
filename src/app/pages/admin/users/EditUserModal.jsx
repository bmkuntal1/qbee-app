import AppModal from '../../../components/page/PageModal';
import { useMutation, useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import zod from "zod";
import httpClient from "../../../helpers/http-client"
import SubmitButton from "../../../components/form/SubmitButton"
import FormField from "../../../components/form/FormField";

const getData = async (id) => {
    const response = await httpClient.get(`/users/${id}`);
    return response.data;
}

const saveData = async (data) => {
    const response = await httpClient.put("/users", data);
    return response.data;
}

const schema = zod.object({
    firstName: zod.string().min(3),
    lastName: zod.string().min(3),
    phoneNumber: zod.string().min(10),
});

const EditUserModal = ({ id, show, onClose }) => {
    const { isPending: getPending, data } = useQuery({ queryKey: ["get-user", id], queryFn: () => getData(id) });
    const { isPending, mutate, isError, isSuccess, error, reset: apiReset } = useMutation({
        mutationFn: saveData, onSuccess: () => {
            setTimeout(() => {
                reset();
                apiReset();
                onClose(true);
            }, 3000);
        }
    });
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        values: { firstName: data?.firstName, lastName: data?.lastName, phoneNumber: data?.phoneNumber },
        resolver: zodResolver(schema)
    });

    const onSubmit = (data) => {
        mutate({ id, ...data });
    }

    return (
        <AppModal title="Edit User" show={show} onClose={onClose}>
            {isError && <div className="alert alert-danger">{error?.response?.data}</div>}
            {isSuccess && <div className="alert alert-success">User saved successfully</div>}
            <form onSubmit={handleSubmit(onSubmit)} disabled={getPending}>
                <FormField label="First Name" type="text" name="firstName" register={register} errors={errors} />
                <FormField label="Last Name" type="text" name="lastName" register={register} errors={errors} />
                <FormField label="Phone Number" type="text" name="phoneNumber" register={register} errors={errors} />
                <div className="hstack justify-content-end gap-3">
                    <button type="button" className="btn btn-secondary btn-width-lg" onClick={onClose}>Close</button>
                    <SubmitButton className="btn btn-primary btn-width-lg" pending={isPending}>Save</SubmitButton>
                </div>
            </form>
        </AppModal>
    );
}

export default EditUserModal;