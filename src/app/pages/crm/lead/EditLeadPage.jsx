import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import zod from "zod";
import httpClient from "../../../helpers/http-client";
import { groupCustomList } from "../../../helpers/utils";
import SubmitButton from "../../../components/form/SubmitButton"
import FormField from "../../../components/form/FormField";
import PageContainer from './../../../components/page/PageContainer';

const getCustomList = async () => {
  const response = await httpClient.get("/shared/custom-list", { params: { types: 'Industry, LeadSource, LeadStatus' } });
  return response.data;
}

const getData = async (id) => {
  const response = await httpClient.get(`/leads/${id}`);
  return response.data;
}

const saveData = async (data) => {
  const response = await httpClient.put("/leads", data);
  return response.data;
}

const schema = zod.object({
  contactName: zod.string().max(100),
  accountName: zod.string().max(),
  email: zod.string().email(),
  phoneNumber: zod.string().max(20),
  otherPhoneNumber: zod.string().max(20),
  status: zod.string().max(20),
  source: zod.string().max(20),
  industry: zod.string().max(20),
  address: zod.string().max(100),
  city: zod.string().max(20),
  state: zod.string().max(20),
  zipCode: zod.string().max(10),
  country: zod.string().max(20),
  description: zod.string().max(200)
});

const EditLeadPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading: isLeadLoading, data: leadData } = useQuery({ queryKey: ['editLead', id], queryFn:()=> getData(id), refetchOnWindowFocus: false });
  const { isLoading: isCustomLoading, data: customList } = useQuery({
    queryKey: ['customList'], queryFn: getCustomList, refetchOnWindowFocus: false, select: groupCustomList
  });
  const { isPending, mutate, isError, isSuccess, error, reset: apiReset } = useMutation({
    mutationFn: saveData, onSuccess: () => {
      setTimeout(() => {
        reset();
        apiReset();
        navigate('/leads');
      }, 3000);
    }
  });
  const { register, control, handleSubmit, formState: { errors }, reset } = useForm({
    values: leadData,
    resolver: zodResolver(schema)
  });

  const onSubmit = (data) => {
    mutate({ ...data, id});
  }

  return (
    <PageContainer>
      <PageContainer.Header>
        <div className="d-flex justify-content-between align-item-center mb-3">
          <h4>Edit Lead</h4>
          <Link to="/leads" className="link-icon"><i className="bi bi-arrow-left"></i> Back to Leads</Link>
        </div>
      </PageContainer.Header>
      <PageContainer.Body>
        {isError && <div className="alert alert-danger">{error?.response?.data}</div>}
        {isSuccess && <div className="alert alert-success">Lead added successfully</div>}
        <form onSubmit={handleSubmit(onSubmit)} className="p-3">
          <div className="row">
          <div className="col-lg-6">
              <FormField label="Contact Name" type="text" name="contactName" register={register} errors={errors} />
            </div>
            <div className="col-lg-6">
              <FormField label="Account Name" type="text" name="accountName" register={register} errors={errors} />
            </div>
            <div className="col-lg-6">
              <FormField label="Email" type="email" name="email" register={register} errors={errors} />
            </div>
            <div className="col-lg-6">
              <FormField label="Phone Number" type="text" name="phoneNumber" register={register} errors={errors} />
            </div>
            <div className="col-lg-6">
              <FormField label="Other Phone Number" type="text" name="otherPhoneNumber" register={register} errors={errors} />
            </div>
            <div className="col-lg-6">
              <FormField label="Lead Status" type="react-select" control={control} options={customList?.LeadStatus || []} name="status" register={register} errors={errors} />
            </div>
            <div className="col-lg-6">
              <FormField label="Lead Source" type="react-select" control={control} options={customList?.LeadSource || []} name="source" register={register} errors={errors} />
            </div>
            <div className="col-lg-6">
              <FormField label="Industry" type="react-select" control={control} options={customList?.Industry || []} name="industry" register={register} errors={errors} />
            </div>
            <div className="col-lg-12">
              <FormField label="Address" type="text" name="address" register={register} errors={errors} />
            </div>
            <div className="col-lg-6">
              <FormField label="City" type="text" name="city" register={register} errors={errors} /></div>
            <div className="col-lg-6">
              <FormField label="State" type="text" name="state" register={register} errors={errors} /></div>
            <div className="col-lg-6">
              <FormField label="Postal Code" type="text" name="zipCode" register={register} errors={errors} />
            </div>
            <div className="col-lg-6">
              <FormField label="Contry" type="text" name="country" register={register} errors={errors} />
            </div>
            <div className="col-lg-12">
              <FormField label="Description" type="textarea" name="description" register={register} errors={errors} />
            </div>
            <div className="col-lg-12 d-flex justify-content-center gap-3 mt-3">
              <Link to="/leads" type="button" className="btn btn-secondary btn-width-lg">Cancel</Link>
              <SubmitButton className="btn btn-primary btn-width-lg" pending={isPending}>Save</SubmitButton>
            </div>
          </div>
        </form>
      </PageContainer.Body>
    </PageContainer>
  );
}

export default EditLeadPage;