
import SearchField from '../../../components/form/SearchField';

const LeadListHeader = ({ searchValue, onSearchChange, pageSize, onPageSizeChange, onAdd }) => {

    return (
        <div className="row">
            <div className="col-lg-4">
                <div className="hstack gap-3 mb-3">
                    <h4 className="text-primary my-1">Leads</h4>
                    <SearchField value={searchValue} onChange={onSearchChange} />
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dd-filter"
                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="bi bi-funnel"></i>
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dd-settings">
                            <button className="dropdown-item">All</button>
                            <div className="dropdown-divider"></div>
                            <h6 className="dropdown-header">Status</h6>
                            <button className="dropdown-item">Active</button>
                            <button className="dropdown-item">InActive</button>
                            <div className="dropdown-divider"></div>
                            <h6 className="dropdown-header">Roles</h6>
                            <button className="dropdown-item">Admin</button>
                            <button className="dropdown-item">Users</button>
                            <button className="dropdown-item">Customer</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-lg-8">
                <div className="hstack gap-3 justify-content-lg-end mb-3">
                    <button className="btn btn-primary" onClick={onAdd}>Add Lead</button>

                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dd-settings"
                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="bi bi-gear"></i>
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dd-filter">
                            <button className="dropdown-item">Reset</button>
                            <div className="dropdown-divider"></div>
                            <h6 className="dropdown-header">Page Items</h6>
                            <button className="dropdown-item" onClick={() => onPageSizeChange(10)}>10 {pageSize === 10 && <i className="bi bi-check"></i>}</button>
                            <button className="dropdown-item" onClick={() => onPageSizeChange(15)}>15 {pageSize === 15 && <i className="bi bi-check"></i>}</button>
                            <button className="dropdown-item" onClick={() => onPageSizeChange(20)}>20 {pageSize === 20 && <i className="bi bi-check"></i>}</button>
                            <div className="dropdown-divider"></div>
                            <h6 className="dropdown-header">Show Hide Columns</h6>
                            <button className="dropdown-item">Status</button>
                            <button className="dropdown-item">Last Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeadListHeader