import Spinner from '../Spinner';
import httpClient from './../../helpers/http-client';
import { useMutation } from '@tanstack/react-query';

const deleteComment = async (id) => {
    const response =await httpClient.delete(`comments/${id}`);
    return response.data;
}

const DeleteComment = ({ id, onDelete }) => {
    const { isPending, mutate } = useMutation({
        key:['delete-comments', id],
        mutationFn: deleteComment,
        onSuccess: () => {
            onDelete();
        }
    });

    return (
        <button className="btn btn-link btn-sm" onClick={() => mutate(id)} disabled={isPending==true}>{isPending==true ? <Spinner loading={true} size="sm" /> : " Delete"}</button>
    )
}

export default DeleteComment