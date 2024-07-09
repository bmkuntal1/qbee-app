import { Link, useNavigate } from "react-router-dom"
import { useQuery, useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import zod from "zod"
import httpClient from "../../../helpers/http-client"
import SubmitButton from "../../../components/form/SubmitButton"
import FormField from "../../../components/form/FormField";
import useAuthStore from "../../../routes/auth-store";


const fetchData = async () => {
    const response = await httpClient.get("/user/profile");
    return response.data;
}

const saveData = async (data) => {
    const response = await httpClient.put("/user/profile", data);
    return response.data;
}

const schema = zod.object({
    firstName: zod.string().nonempty({ message: "First name is required" }),
    lastName: zod.string().nonempty({ message: "Last name is required" }),
    email: zod.string().email({ message: "Invalid email address" }),
    phoneNumber: zod.string().nonempty({ message: "Phone number is required" }),
    // address: zod.string().nonempty({ message: "Address is required" }),
    // city: zod.string().nonempty({ message: "City is required" }),
    // country: zod.string().nonempty({ message: "Country is required" }),
    // zip: zod.string().nonempty({ message: "Zip code is required" }),
    // avatar: zod.string().nonempty({ message: "Avatar is required" }),
})

const EditUserProfilePage = () => {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const refreshUser = useAuthStore((state) => state.refreshUser);
    const { isPending, data } = useQuery({ queryKey: ['todos'], queryFn: fetchData });

    const { isPending: isSaveLoading, isSuccess, isError, error, mutate } = useMutation({
        mutationFn: saveData,
        onSuccess:
            () => {
                refreshUser({ ...user, firstName: data?.firstName, lastName: data?.lastName });
                setTimeout(() => navigate("/profile"), 3000);
            }
    });

    const onSubmit = async (data) => {
        await mutate(data);
    }
    //useForm
    const { register, handleSubmit, formState: { errors } } = useForm({ values: data, resolver: zodResolver(schema) });

    if (isPending) return (
        <div className="card">
            <div className="card-body text-center p-3">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    )

    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title">Update Profile</h4>
                {isSuccess && <div className="alert alert-success">Profile updated successfully</div>}
                {isError && <div className="alert alert-danger">{error?.response?.data?.message}</div>}
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <FormField type="text" name="firstName" label="First Name" register={register} errors={errors} />
                        </div>
                        <div className="col-12 col-md-6">
                            <FormField type="text" name="lastName" label="Last Name" register={register} errors={errors} />
                        </div>
                        <div className="col-12 col-md-6">
                            <FormField type="email" name="email" label="Email" register={register} errors={errors} />
                        </div>
                        <div className="col-12 col-md-6">
                            <FormField type="text" name="phoneNumber" label="Phone Number" register={register} errors={errors} />
                        </div>
                        {/* <div className="col-12 col-md-12">
                            <div className="form-group mb-3">
                                <label htmlFor="address" className="form-label">Address</label>
                                <input type="text" id="address" className="form-control" value="123 Main Street" />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group mb-3">
                                <label htmlFor="city" className="form-label">City</label>
                                <input type="text" id="city" className="form-control" value="City" />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group mb-3">
                                <label htmlFor="country" className="form-label">Country</label>
                                <input type="text" id="country" className="form-control" value="Country" />
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="form-group mb-3">
                                <label htmlFor="zip" className="form-label">Zip</label>
                                <input type="text" id="zip" className="form-control" value="123456" />
                            </div>
                        </div>

                        <div className="col-12 col-md-6">
                            <div className="form-group mb-3">
                                <label htmlFor="avatar" className="form-label">Avatar</label>
                                <input type="file" id="avatar" className="form-control" />
                            </div>
                        </div> */}
                    </div>
                    <div className="row g-3 justify-content-center py-lg-3">
                        <div className="col-lg-3">
                            <SubmitButton pending={isSaveLoading}>Update</SubmitButton>
                        </div>
                        <div className="col-lg-3">
                            <Link to="/profile" className="btn btn-outline-secondary w-100">Cancel</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditUserProfilePage