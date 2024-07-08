const TableHeader = ({ columns, sort, onSort }) => {
    const [sortColumn, sortOrder] = sort ? sort.split("_") : [];

    const getSort = (column) => {
        const _sortOrder = sort && sort.split("_")[1];
        
        // Sort on column change
        if(column !== sortColumn) return column;

        // Toggle sort order on same column
        if (sort) {
            return _sortOrder === "desc" ? null : `${column}_desc`;
        } else {
            return column;
        }
    }

    return (

        <thead>
            <tr>
                {columns && columns.map((column) => (
                    <th key={column.key} onClick={() => column.sortable ? onSort(getSort(column.sortKey)) : null} className={column.sortable ? "table-head " : null}>
                        {column.label}
                        {column.sortable && sortColumn === column.sortKey && (
                            <i className={`bi bi-caret-${sortOrder === "desc" ? "down" : "up"}-fill ms-1`}></i>
                        )}
                    </th>
                ))}
            </tr>
        </thead>
    );
}

export default TableHeader;