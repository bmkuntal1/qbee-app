import { useState } from 'react'
import { Link } from 'react-router-dom';
import httpClient from "../../../helpers/http-client";
import { groupCustomList } from "../../../helpers/utils";
import { useQuery } from "@tanstack/react-query"
import DataTable from '../../../components/data-table/DataTable';
import PageContainer from '../../../components/page/PageContainer';
import PageTitle from '../../../components/page/PageTitle';
import LeadListHeader from './LeadListHeader';
import AddLeadModal from './AddLeadModal';
import LeadStatusBadge from './LeadStatusBadge';
import EditLeadModal from './EditLeadModal';
import UserWithAvatar from './../../../components/Common/UserWithAvatar';

const getCustomList = async () => {
    const response = await httpClient.get("/shared/custom-list", { params: { types: 'LeadStatus' } });
    return response.data;
}

const getLeadList = async (page, pageSize, search, sort) => {
    const response = await httpClient.get("/leads", { params: { page, pageSize, search, sort } });
    return response.data;
}

const LeadListPage = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [sort, setSort] = useState(null);
    const [search, setSearch] = useState(null);


    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const { isLoading: isCustomLoading, data: customList } = useQuery({
        queryKey: ['customList'], queryFn: getCustomList, refetchOnWindowFocus: false, select: groupCustomList
    });

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['users', page, pageSize, search, sort],
        queryFn: () => getLeadList(page, pageSize, search, sort)
    });

    const handleAddLead = (result) => {
        setShowAddModal(false);
        if (result === true) {
            setPage(1);
            refetch();
        }
    }

    const handleEditMdoal = (id) => {
        setSelectedId(id);
        setShowEditModal(true);
    }

    const handleEditLead = (result) => {
        setShowEditModal(false);
        if (result === true) {
            refetch();
        }
    }

    const handlePageSizeChange = (pageSize) => {
        setPageSize(pageSize);
        setPage(1);
    }

    const handleSearch = (text) => {
        setSearch(text);
        setPage(1);
    }

    const handleSort = (sort) => {
        setSort(sort);
        setPage(1);
    }

    const handlePageChange = (page) => {
        setPage(page);
    }

    const columns = [
        { key: "checkbox", label: <input type="checkbox" />, sortable: false, render: () => <input type="checkbox" /> },
        {
            key: "contactName", label: "Contact Name", sortable: true, sortKey: "contactName", render: (row) => {
                return (
                    <>
                        <Link to={`/leads/detail/${row.id}`} className="text-decoration-none">
                            <div>
                                {row.contactName} <br />
                                {row.isAccount && <span className="text-muted"> <i className="bi bi-building small"></i> {row.accountName}</span>}
                            </div>
                        </Link>
                    </>
                )
            }
        },
        { key: "email", label: "Email", sortable: true, sortKey: "email" },
        { key: "phoneNumber", label: "Phone" },
        {
            key: "status", label: "Status", sortable: true, sortKey: "status", render: (row) => <LeadStatusBadge status={row.status} statusList={customList?.LeadStatus} />
        },
        {
            key: "date", label: "Date", sortable: true, sortKey: "createdAt", render: (row) => new Date(row.createdAtUtc).toLocaleDateString()
        },
        {
            key: "assignee", label: "Assignee", sortable: true, sortKey: "assignee", render: (row) => row.assigneeId ? <UserWithAvatar user={{ name: row.assigneeName, avatar: row.assigneeAvatar }} /> : <span className="text-muted">Unassigned</span>
        },
        {
            key: "actions", label: "Actions", sortable: false, render: (row) => {
                return (
                    <div className="d-flex">
                        <Link className="text-body-secondary me-3" to={`/leads/detail/${row.id}`}>
                            <i className="bi bi-eye"></i>
                        </Link>
                        <Link className="text-body-secondary me-3" onClick={() => handleEditMdoal(row.id)}>
                            <i className="bi bi-pencil"></i>
                        </Link>
                        <a className="text-body-secondary" href="#">
                            <i className="bi bi-trash"></i>
                        </a>
                    </div>
                )
            }
        }
    ];

    return (
        <>
            <PageTitle title="Leads" />
            <PageContainer>
                <PageContainer.Header>
                    <LeadListHeader onSearchChange={handleSearch} pageSize={pageSize} onPageSizeChange={handlePageSizeChange} onAdd={() => setShowAddModal(true)} />
                </PageContainer.Header>
                <PageContainer.Body>
                    {isError ? <div className="alert alert-danger">{error?.response?.data}</div> :

                        <DataTable isLoading={isLoading} columns={columns} data={data?.data} totalPages={data?.totalPages} totalItems={data?.total}
                            currentPage={page} pageSize={pageSize} sort={sort} onPageChange={handlePageChange} onSort={handleSort} />
                    }
                </PageContainer.Body>
                {showAddModal && <AddLeadModal show={showAddModal} onClose={handleAddLead} />}
                {showEditModal && <EditLeadModal id={selectedId} show={showEditModal} onClose={handleEditLead} />}

            </PageContainer>
        </>
    )
}

export default LeadListPage