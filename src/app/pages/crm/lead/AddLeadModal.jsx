import PageModal from '../../../components/page/PageModal';
import { useQuery, useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import zod from "zod";
import httpClient from "../../../helpers/http-client";
import { groupCustomList } from "../../../helpers/utils";
import SubmitButton from "../../../components/form/SubmitButton"
import FormField from "../../../components/form/FormField";
import ResultAlert from '../../../components/ResultAlert';

const getCustomList = async () => {
    const response = await httpClient.get("/shared/custom-list", { params: { types: 'Industry, LeadSource' } });
    return response.data;
}

const saveData = async (data) => {
    const response = await httpClient.post("/leads", data);
    return response.data;
}

const schema = zod.object({
    contactName: zod.string().max(50),
    accountName: zod.string().max(50),
    email: zod.string().email(),
    phoneNumber: zod.string().max(20),
    otherPhoneNumber: zod.string().max(20),
    source: zod.string().max(20),
    industry: zod.string().max(20),
    address: zod.string().max(100),
    city: zod.string().max(20),
    state: zod.string().max(20),
    zipCode: zod.string().max(10),
    country: zod.string().max(20),
    description: zod.string().max(200)
});

const AddLeadModal = ({ show, onClose }) => {
    const { data: customList } = useQuery({
        queryKey: ['customList'], queryFn: getCustomList, refetchOnWindowFocus: false, select: groupCustomList
    });

    const { isPending, mutate, isError, isSuccess, error, reset: apiReset } = useMutation({
        mutationFn: saveData, onSuccess: () => {
            reset();
            setTimeout(() => {
                apiReset();
                onClose(true)
            }, 1500);
        }
    });
    const { register, watch, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: { isAccount: "true" },
        resolver: zodResolver(schema)
    });
    const watchIsAccount = watch("isAccount", 'true')

    const onSubmit = (data) => {
        mutate({ ...data, isAccount: watchIsAccount == 'true' });
    }

    return (
        <PageModal title="Add New Lead" show={show} onClose={onClose} className={!isSuccess && "modal-lg"}>
            {isError && <div className="alert alert-danger">{error?.response?.data?.toString()}</div>}
            {isSuccess ? <ResultAlert type="success" message="Lead added successfully" /> :
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row mx-2">
                        <div className="col-md-12">
                            <FormField type="radio" name="isAccount" options={[
                                { label: <> <i className="bi bi-building"></i> Company</>, value: 'true' },
                                { label: <> <i className="bi bi-person"></i> Personal</>, value: 'false' }
                            ]} register={register} errors={errors} />
                        </div>
                        <div className="col-md-12">
                            {watchIsAccount === 'true' && <FormField label="Account Name" type="text" name="accountName" register={register} errors={errors} />}
                        </div>
                        <div className="col-md-6">
                            <FormField label="Contact Name" type="text" name="contactName" register={register} errors={errors} />
                        </div>
                        <div className="col-md-6">
                            <FormField label="Email" type="email" name="email" register={register} errors={errors} />
                        </div>
                        <div className="col-md-6">
                            <FormField label="Phone Number" type="text" name="phoneNumber" register={register} errors={errors} />
                        </div>
                        <div className="col-md-6">
                            <FormField label="Other Phone Number" type="text" name="otherPhoneNumber" register={register} errors={errors} />
                        </div>
                        <div className="col-md-6">
                            <FormField label="Source" type="select" name="source" options={customList?.LeadSource} register={register} errors={errors} />
                        </div>
                        <div className="col-md-6">
                            <FormField label="Industry" type="select" name="industry" options={customList?.Industry} register={register} errors={errors} />
                        </div>
                        <div className="col-md-12">
                            <FormField label="Address" type="text" name="address" register={register} errors={errors} />
                        </div>
                        <div className="col-md-6">
                            <FormField label="City" type="text" name="city" register={register} errors={errors} />
                        </div>
                        <div className="col-md-6">
                            <FormField label="State" type="text" name="state" register={register} errors={errors} />
                        </div>
                        <div className="col-md-6">
                            <FormField label="Zip Code" type="text" name="zipCode" register={register} errors={errors} />
                        </div>
                        <div className="col-md-6">
                            <FormField label="Country" type="text" name="country" register={register} errors={errors} />
                        </div>
                        <div className="col-md-12">
                            <FormField label="Description" type="textarea" name="description" register={register} errors={errors} />
                        </div>
                    </div>
                    <div className="hstack justify-content-end gap-3 px-3 mb-2">
                        <button type="button" className="btn btn-secondary btn-width-lg" onClick={onClose}>Close</button>
                        <SubmitButton className="btn btn-primary btn-width-lg" pending={isPending}>Save</SubmitButton>
                    </div>
                </form>
            }
        </PageModal >
    );
}

export default AddLeadModal;