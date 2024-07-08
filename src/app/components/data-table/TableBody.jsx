

const TableBody = ({ columns, data }) => {
    return (
        <tbody>
            {data && data.map((row) => (
                <tr key={row.id}>
                    {columns && columns.map((column) => (
                        <td key={column.key}>
                            {column.render ? column.render(row, column) : row[column.key]}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
}

export default TableBody;