import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import zod from 'zod';
import FormField from '../FormField';

const schema = zod.object({
    selectedInput: zod.string().min(1, 'Select a value')
});

const SingleSelect = ({ children, value, options, isMulti, onChange }) => {
    const [isEdit, setIsEdit] = useState(false);

    const { register, control, handleSubmit, formState: { errors }, reset } = useForm({ values: { selectedInput: value }, resolver: zodResolver(schema) });

    const onSubmit = (data) => {
        onChange(data.selectedInput);
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
                    <div className="hstack align-items-start gap-1">
                        <FormField type="react-select" options={options} control={control} isMulti={isMulti} name="selectedInput" register={register} errors={errors} hideLabel={true}/>
                        <button className="btn btn-primary btn-sm mt-1" type="submit">
                            <i className="bi bi-check"></i>
                        </button>
                        <button className="btn btn-danger btn-sm mt-1" type="button" onClick={handleCancel}>
                            <i className="bi bi-x"></i>
                        </button>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div onClick={handleEdit} className='bg-single'>{children}</div>
    )

}

export default SingleSelect