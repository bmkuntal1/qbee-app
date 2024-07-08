import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import httpClient from "../../helpers/http-client";
import CommentList from "./CommentList"
import PostComment from "./PostComment"
import Pagination from './../data-table/Pagination';
import Spinner from "../Spinner";

const getCommentList = async (type, typeId, page, pageSize, search, sort) => {
    const response = await httpClient.get("/comments", { params: { type, typeId, page, pageSize, search, sort } });
    return response.data;
}

const PageComments = ({ type, typeId }) => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [sort, setSort] = useState(null);
    const [search, setSearch] = useState(null);

    const { data, isPending, isError, error, refetch } = useQuery({
        queryKey: ['comments', type, typeId, page, pageSize, search, sort],
        queryFn: () => getCommentList(type, typeId, page, pageSize, search, sort),
        config: { refetchOnWindowFocus: false }
    });

    const handleRefresh = (type) => {
        let _page = page;
        if (type === "add") {
            _page = 1;
        } else if (type === "delete" && data?.data.length === 1 && page > 1) {
            _page = page - 1;
        }
        if (_page === page) {
            refetch();
        } else {
            setPage(_page);
        }
    }

    return (
        <div className="p-3">
            <h6 className="card-title">Comments</h6>
            <hr />
            <PostComment type={type} typeId={typeId} onPost={() => handleRefresh("add")} />
            <CommentList type={type} typeId={typeId} data={data?.data} onUpdate={handleRefresh} />
            {data?.totalPages > 1 && <Pagination currentPage={page} pageSize={pageSize} pageRange={2} totalPages={data?.totalPages} totalItems={data?.total} onPageChange={(_page) => setPage(_page)} />}
        </div>
    )
}

export default PageComments