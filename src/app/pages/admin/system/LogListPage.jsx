import { useState } from "react";
import httpClient from "../../../helpers/http-client";
import { useQuery } from "@tanstack/react-query";
import { Link } from 'react-router-dom';
import PageContainer from "../../../components/page/PageContainer";
import DataTable from "../../../components/data-table/DataTable";
import PageTitle from "../../../components/page/PageTitle";

const getLogFileList = async (searchParams) => {
    const response = await httpClient.get('/logs', { params: searchParams });
    return response.data;
}

export default function LogListPage() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const [sort, setSort] = useState(null);
    const [showHealth, setShowHealth] = useState(false);

    const { isPending, data } = useQuery({ queryKey: ['log-list', page, pageSize, sort, showHealth], queryFn: async () => await getLogFileList({ page, pageSize, sort, showHealth }) });

    const columns = [
        { key: 'date', label: 'Date', sortable: true, render: (item) => <Link to={`/system/logs/${item?.name?.slice(0, -4)}`} >{item.date ? new Date(item.date).toLocaleDateString() : "--"}</Link> },
        { key: 'name', label: 'File Name', sortable: true },
        { key: 'size', label: 'Size', sortable: true, render: (item) => item.size ? `${item.size} KB` : '--' },
        {
            key: 'actions', label: 'Action', sortable: false, render: (item) => (
                <Link to={`/system/logs/${item?.name.slice(0,-4)}`} className="text-center">
                    <i className="bi bi-file-text"></i>
                </Link>
            )
        }
    ];

    if (showHealth) {
        columns.splice(2, 0, {
            key: 'health', label: 'Health', sortable: false, render: (item) => (
                <div className="hstack gap-2">
                    {item.health.errors > 0 ? (<span className="badge bg-danger">Errors: {item.health.errors}</span>) : null}
                    {item.health.warnings > 0 ? (<span className="badge bg-warning">Warning: {item.health.warnings}</span>) : null}
                    {item.health.status == "good" ? <span className="badge bg-success">Good</span> : null}
                </div>
            )
        })
    }

    const handlePageChange = (page) => {
        setPage(page);
    };

    const handleSort = (sortColumn) => {
        setPage(1);
        setSort(sortColumn);
    }

    return (
        <>
            <PageTitle title="Application Logs" />
            <PageContainer title="Application Logs">
                <PageContainer.Header>
                    <div className="hstack justify-content-between">
                        <h4 className="text-primary mb-3">Application Logs</h4>
                        <div className="hstack gap-2">
                            {/* switch show health */}
                            <div className="form-check form-switch form-switch-end">
                                <input className="form-check-input" type="checkbox" id="showHealth" checked={showHealth} onChange={(e) => setShowHealth(e.target.checked)} />
                                <label className="form-check-label" htmlFor="showHealth">Show Health</label>
                            </div>
                        </div>
                    </div>
                </PageContainer.Header>
                <PageContainer.Body>
                    <DataTable isLoading={isPending} columns={columns} data={data?.data} totalPages={data?.totalPages} totalItems={data?.total} currentPage={page} pageSize={pageSize} sort={sort} onPageChange={handlePageChange} onSort={handleSort} />
                </PageContainer.Body>
            </PageContainer >
        </>

    )
}
