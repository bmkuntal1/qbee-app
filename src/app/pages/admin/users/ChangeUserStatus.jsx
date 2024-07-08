
import { useState } from "react";
import httpClient from "../../../helpers/http-client";
import { useMutation } from '@tanstack/react-query';
import SubmitButton from "../../../components/form/SubmitButton";


const changePassword = async (data) => {
    const response = await httpClient.put(`/users/update-password`, data);
    return response.data;
}

const ChangeUserStatus = ({ id, status }) => {
    const [showChangeStatus, setShowChangeStatus] = useState(false);

    const { isPending, mutate, isError, error } = useMutation({ mutationFn: changePassword, onSuccess: () => onClose() });

    const onClose = () => {
        setShowChangeStatus(false);
    }

    return (
        <>
            {showChangeStatus ?
                <>
                    <div className="hstack gap-2 mt-2 mb-2">
                        <SubmitButton type="submit" className="btn btn-primary btn-sm btn-width-lg" pending={isPending} onClick={() => mutate(id)}>{status == "active" ? "Activate" : "Deactivate "}</SubmitButton>
                        <button type="button" className="btn btn-danger btn-sm" onClick={() => setShowChangeStatus(false)}>Cancel</button>
                    </div>
                    {isError && <small className="text-danger d-block">{error?.response?.data}</small>}
                </>
                :
                <button className="btn btn-link text-decoration-none px-0" onClick={() => setShowChangeStatus(true)}>
                    Confirm Now
                </button>
            }

        </>
    );
}

export default ChangeUserStatus;



