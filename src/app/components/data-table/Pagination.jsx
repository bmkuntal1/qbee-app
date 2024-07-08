import { usePaginationInfo } from '../../hooks/use-pagination-info'
import ReactPaginate from 'react-paginate';

const Pagination = ({ currentPage, pageSize, pageRange=5, totalPages, totalItems, onPageChange }) => {

    const { from, to, total } = usePaginationInfo(currentPage, pageSize, totalItems)

    return (
        <div className="d-flex justify-content-between align-items-center">
            <div className="text-muted">
                Showing {from}-{to} of {total} entries
            </div>
            <ReactPaginate pageCount={totalPages}
                pageRangeDisplayed={pageRange}
                marginPagesDisplayed={2}
                onPageChange={({ selected }) => onPageChange(selected + 1)}
                forcePage={currentPage - 1}
                containerClassName="pagination"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link" nextClassName="page-item"
                nextLinkClassName="page-link" breakClassName="page-item"
                breakLinkClassName="page-link" activeClassName="active" />
        </div>
    )
}

export default Pagination