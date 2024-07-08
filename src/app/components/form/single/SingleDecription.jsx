import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import zod from 'zod';
import FormField from '../FormField';

const schema = zod.object({
    description: zod.string().min(1, 'Description is required').max(200, 'Description is too long, maximum 200 characters.')
});

const SingleDecription = ({ value, onChange }) => {
    const [isEdit, setIsEdit] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ values: { description: value }, resolver: zodResolver(schema) });

    const onSubmit = (data) => {
        onChange(data.description);
        setIsEdit(false);
    }

    const handleEdit = (isEdit = false) => {
        reset();
        setIsEdit(isEdit);
    }

    const handleCancel = () => {
        handleEdit(false);
        reset();
    }


    if (isEdit || value === null || value === '') {
        return (
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <FormField type="textarea" name="description" label="Description" register={register} errors={errors} />
                        <div className="hstack justify-content-end gap-2">
                            <button className="btn btn-primary btn-sm" type="submit">Save</button>
                            <button className="btn btn-light btn-sm" type="button" onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div onClick={handleEdit} className='bg-single'>
            <h6 className="card-title">Description</h6>
            <p className="card-text">{value}</p>
        </div>
    )
}

export default SingleDecription