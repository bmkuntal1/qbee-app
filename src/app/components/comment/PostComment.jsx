import useAuthStore from './../../routes/auth-store';
import { getApiFileUrl } from './../../helpers/utils';
import { useQuery, useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import zod from "zod";
import httpClient from "../../helpers/http-client";
import FormField from '../form/FormField';
import Spinner from '../Spinner';

const getComment = async (id) => {
    const response = await httpClient.get(`comments/${id}`);
    return response.data;
}

const createComment = async (data) => {
    let response;
    if (data?.id) {
        response = await httpClient.put(`comments`, data);
    } else {
        response = await httpClient.post('comments', data);
    }
    return response.data;
}

const schema = zod.object({
    body: zod.string().min(1, 'Comment is required').max(200, 'Comment is too long, maximum 200 characters.')
});

const PostComment = ({ id, type, typeId, onPost, onCancel }) => {
    const user = useAuthStore((state) => state.user);

    const { data } = useQuery({ queryKey: ['comments', id], queryFn: () => getComment(id), enabled: !!id });

    const { isPending, mutate, isError, isSuccess, error, reset: apiReset } = useMutation({
        mutationFn: createComment, onSuccess: () => {
            reset();
            apiReset();
            onPost();
        }
    });

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ values: data, resolver: zodResolver(schema) });

    const onSubmit = ({ body }) => {
        if (id) {
            mutate({ id, body });
        } else {
            mutate({ type, typeId, body });
        }
    }

    const handleCancel = () => {
        reset();
        if (onCancel) onCancel();
    }

    return (
        <div className="d-flex gap-3 p-3">
            <div className="avatar">
                <img src={getApiFileUrl(user?.avatar)} alt="avatar" className="avatar-image rounded-circle" />
            </div>
            <form className="w-100" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex-fill">
                    <div className="mb-2">
                        <FormField type="textarea" name="body" label={id ? "Update Comment" : "New Comment"} register={register} errors={errors} />
                    </div>
                    <div className="d-flex justify-content-end align-item-center gap-2">
                        <Spinner loading={isPending} />
                        <button className="btn btn-primary btn-sm" type="submit">Save</button>
                        <button className="btn btn-light btn-sm" type="button" onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            </form >
        </div >
    )
}

export default PostComment