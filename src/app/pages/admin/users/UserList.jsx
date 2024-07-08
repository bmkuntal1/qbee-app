import { useState } from 'react'
import { Link } from 'react-router-dom';
import httpClient from "../../../helpers/http-client";
import { useQuery } from "@tanstack/react-query"
import DataTable from '../../../components/data-table/DataTable';
import PageContainer from '../../../components/page/PageContainer';
import UserListHeader from './UserListHeader';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';
import PageTitle from '../../../components/page/PageTitle';

const getUserList = async (page, pageSize, search, sort) => {
    const response = await httpClient.get("/users", { params: { page, pageSize, search, sort } });
    return response.data;
}

const UserList = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [sort, setSort] = useState(null);
    const [search, setSearch] = useState(null);

    const [showAddUser, setShowAddUser] = useState(false);

    const [currentId, setCurrentId] = useState(null);
    const [showEditUser, setShowEditUser] = useState(false);

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['users', page, pageSize, search, sort],
        queryFn: () => getUserList(page, pageSize, search, sort)
    });

    const handleAddUserClose = (result) => {
        setShowAddUser(false);
        if (result === true) {
            setPage(1);
            refetch();
        }
    }

    const handleEditUser = (id) => {
        setCurrentId(id);
        setShowEditUser(true);
    }

    const handleEditUserClose = (result) => {
        setShowEditUser(false);
        if (result === true) {
            refetch();
        }
    }

    const handlePageSizeChange = (pageSize) => {
        setPageSize(pageSize);
        setPage(1);
    }

    const handleSearch = (text) => {
        if (text === "") text = null;
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
        { key: "checkbox", label: "", sortable: false },
        { key: "email", label: "Email", sortable: true, sortKey: "email" },
        {
            key: "name", label: "Full Name", sortable: true, sortKey: "name", render: (row) => {
                return (
                    <span className="text-body-secondary">{row.firstName} {row.lastName}</span>
                )
            }
        },
        {
            key: "status", label: "Status", sortable: true, sortKey: "status", render: (row) => {
                return (row.status === "active" ?
                    <span className="badge fw-light bg-success">{row.status}</span> :
                    <span className="badge fw-light bg-danger">{row.status}</span>)
            }
        },
        {
            key: "actions", label: "Actions", sortable: false, render: (row) => {
                return (
                    <div className="d-flex">
                        <a className="text-body-secondary me-3" href="#" onClick={() => handleEditUser(row.id)}>
                            <i className="bi bi-pencil"></i>
                        </a>
                        <Link className="text-body-secondary me-3" to={`/users/${row.id}`}>
                            <i className="bi bi-eye"></i>
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
            <PageTitle title="Users" />
            <PageContainer>
                <PageContainer.Header>
                    <UserListHeader onChange={handleSearch} pageSize={pageSize} onPageSizeChange={handlePageSizeChange} setAddUser={setShowAddUser} />
                </PageContainer.Header>
                <PageContainer.Body>
                    {isError ? <div className="alert alert-danger">{error?.response?.data}</div> :

                        <DataTable isLoading={isLoading} columns={columns} data={data?.data} totalPages={data?.totalPages} totalItems={data?.total}
                            currentPage={page} pageSize={pageSize} sort={sort} onPageChange={handlePageChange} onSort={handleSort} />
                    }
                </PageContainer.Body>
            </PageContainer>

            {/* Add/Edit Modals */}
            {showAddUser && <AddUserModal show={showAddUser} onClose={handleAddUserClose} />}
            {showEditUser && <EditUserModal id={currentId} show={showEditUser} onClose={handleEditUserClose} />}
        </>
    )
}

export default UserList