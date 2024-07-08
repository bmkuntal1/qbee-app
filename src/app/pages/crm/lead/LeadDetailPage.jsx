import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import httpClient from "../../../helpers/http-client";
import { groupCustomList } from "../../../helpers/utils";
import UserDetailPlaceholder from "../../../components/placeholder/UserDetailPlaceholder";
import PageTitle from "../../../components/page/PageTitle";
import PageContainer from "../../../components/page/PageContainer";
import PageComments from "../../../components/comment/PageComments";
import SelectButton from "../../../components/form/SelectButton";
import SingleSelect from "../../../components/form/single/SingleSelect";
import SingleDecription from "../../../components/form/single/SingleDecription";
import UserWithAvatar from './../../../components/Common/UserWithAvatar';
import EditLeadModal from './EditLeadModal';
import LeadQuoteList from "./LeadQuoteList";

const getCustomList = async () => {
    const response = await httpClient.get("/shared/custom-list", { params: { types: 'Industry, LeadSource, LeadStatus, LeadLabel' } });
    return response.data;
}

const getUserList = async () => {
    const response = await httpClient.get("/shared/user-list", { params: { search: "" } });
    return response.data;
}

const updateSingle = async (data) => {
    const response = await httpClient.put(`/leads/single`, data);
    return response.data;
}

const getData = async (id) => {
    const response = await httpClient.get(`/leads/detail/${id}`);
    return response.data;
};

const LeadDetailPage = () => {
    const { id } = useParams();

    const [showEditModal, setShowEditModal] = useState(false);

    const { isLoading: isCustomLoading, data: customList } = useQuery({
        queryKey: ['custom-list-lead-detail'], queryFn: getCustomList, refetchOnWindowFocus: false, select: groupCustomList
    }); ` `

    const { isLoading: isUserLoading, data: userList } = useQuery({
        queryKey: ['userList'], queryFn: getUserList, refetchOnWindowFocus: false, select: (data) => data.map(item => ({ label: item.name, value: item.id }))
    });


    const { isPending, data, refetch } = useQuery({ queryKey: ['get-lead-detail', id], queryFn: async () => await getData(id) });

    const { mutate: singleMutate } = useMutation({ mutationFn: updateSingle, onSuccess: () => refetch() });

    const handleEditLead = (result) => {
        setShowEditModal(false);
        if (result === true) {
            refetch();
        }
    }

    if (isPending) return (
        <div className="card">
            <div className="card-body text-center p-3">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            <UserDetailPlaceholder />
        </div>
    )

    return (
        <>
            <PageTitle title="User Details" />
            <PageContainer>
                <PageContainer.Header>
                    <div className="d-flex justify-content-between mb-3">
                        <div>
                            <h1 className="h3 mb-0">Lead Detail</h1>
                        </div>
                        <div className="hstack gap-2">
                            <Link className="btn btn-outline-primary btn-sm" to="/leads">
                                <i className="bi bi-arrow-left"></i> Back
                            </Link>
                            <button className="btn btn-outline-primary btn-sm" onClick={() => refetch()}>
                                <i className="bi bi-arrow-clockwise"></i> Refresh
                            </button>
                            <Link className="btn btn-outline-primary btn-sm" onClick={() => setShowEditModal(true)}>
                                <i className="bi bi-pencil"></i> Edit
                            </Link>
                            <Link className="btn btn-outline-primary btn-sm" to={`/leads/edit/${id}`}>
                                <i className="bi bi-file-text"></i> Create Quote
                            </Link>
                        </div>
                    </div>
                </PageContainer.Header>
                <PageContainer.Body>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="p-3">
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <h5 className="card-title">{data?.contactName}</h5>
                                        <p className="text-muted"><i className="bi bi-building"></i> {data?.accountName}</p>
                                        <p className="text-muted">
                                            <i className="bi bi-geo-alt"></i> {data?.address}, {data?.city}, {data?.state}, {data?.zipCode}, {data?.country}
                                        </p>
                                    </div>
                                    <div className="text-end">
                                        <div className="mb-2"> <i className="bi bi-envelope"></i> {data?.email}</div>
                                        <div className="mb-2"> <i className="bi bi-telephone"></i> {data?.phoneNumber}</div>
                                    </div>
                                </div>
                                <SingleDecription value={data?.description} onChange={(value) => singleMutate({ id, key: "description", value })} />
                            </div>
                            <hr />
                            <LeadQuoteList id={id} />

                            <div className="p-3">
                                <ul className="nav nav-underline border-bottom">
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" href="#">Comments</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Activties</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Hystory</a>
                                    </li>
                                </ul>
                                </div>
                            <PageComments type="Lead" typeId={id} />
                        </div>
                        <div className="col-lg-4">
                            <div className="hstack gap-2 mb-3">
                                <SelectButton value={data?.status} options={customList?.LeadStatus} onChange={(value) => singleMutate({ id, key: "status", value })} />
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-title">Details</h6>
                                    <hr />
                                    <dl className="row g-3">
                                        <dt className="col-sm-4">Assignee</dt>
                                        <dd className="col-sm-8">
                                            {/* media rounder and name */}
                                            <SingleSelect options={userList} value={data?.assigneeId} onChange={(value) => singleMutate({ id, key: "assignee", value })}>
                                                <UserWithAvatar user={{ name: data?.assigneeName, avatar: data?.assigneeAvatar }} />
                                            </SingleSelect>
                                        </dd>
                                        <dt className="col-sm-4">Labels</dt>
                                        <dd className="col-sm-8">
                                            <SingleSelect options={customList?.LeadLabel} isMulti={true} value={data?.labels} onChange={(value) => singleMutate({ id, key: "labels", value })}>
                                                {data?.labels && data?.labels?.split(',').map((label, index) => <span key={index} className="badge bg-primary fw-light me-1">{label}</span>)}
                                            </SingleSelect>
                                        </dd>
                                        <dt className="col-sm-4">Potential</dt>
                                        <dd className="col-sm-8">
                                            $ 200,000
                                        </dd>
                                        <dt className="col-sm-4">Source</dt>
                                        <dd className="col-sm-8">
                                            {data?.sourceName}
                                        </dd>
                                        <dt className="col-sm-4">Industry</dt>
                                        <dd className="col-sm-8">
                                            {data?.industryName}
                                        </dd>
                                        <dt className="col-sm-4">CreatedBy</dt>
                                        <dd className="col-sm-8">
                                            <UserWithAvatar user={{ name: data?.createdByName, avatar: data?.createdByAvatar }} />
                                        </dd>
                                        <dt className="col-sm-4">Created At</dt>
                                        <dd className="col-sm-8">{new Date(data?.createdAtUtc).toLocaleDateString()}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </PageContainer.Body>
            </PageContainer>
            {showEditModal && <EditLeadModal id={id} show={showEditModal} onClose={handleEditLead} />}
        </>
    );
}

export default LeadDetailPage;
