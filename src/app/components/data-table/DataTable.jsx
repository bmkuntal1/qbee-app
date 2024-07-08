import TableHeader from './TableHeader';
import TableBody from './TableBody';
import Pagination from './Pagination';
import Loading from '../../components/Loading';

const DataTable = ({ isLoading, columns, data, totalPages, totalItems, currentPage, pageSize, sort, onPageChange, onSort }) => {

    if (isLoading) {
        return <Loading />;
    }

    if (data && data.length === 0) {
        return <h5 className="text-center text-secondary p-3">No data found!</h5>;
    }

    return (
        <div>
            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <TableHeader columns={columns} sort={sort} onSort={onSort} />
                    <TableBody columns={columns} data={data} />
                </table>
            </div>
            <Pagination currentPage={currentPage} pageSize={pageSize} totalPages={totalPages} totalItems={totalItems} onPageChange={onPageChange} />
        </div>
    );
}

export default DataTable;