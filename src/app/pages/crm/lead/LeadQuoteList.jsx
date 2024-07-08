import React from 'react'

const LeadQuoteList = () => {
    return (
        <div>
            <h5>Lead Quotes</h5>
            <div className="table-responsive">
                <table className="table table-borderless table-striped">
                    <thead>
                        <tr>
                            <th>Quote ID</th>
                            <th>Quote Date</th>
                            <th>Amount</th>
                            <th>Created By</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Q-0001</td>
                            <td>12/12/2021</td>
                            <td>$1000</td>
                            <td>John Doe</td>
                            <td><span className="badge bg-success">Accepted</span></td>
                            <td>
                                <button className="btn btn-sm btn-link text-danger">Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Q-0002</td>
                            <td>12/12/2021</td>
                            <td>$2000</td>
                            <td>John Doe</td>
                            <td><span className="badge bg-warning">Pending</span></td>
                            <td>
                                <button className="btn btn-sm btn-link text-danger">Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Q-0003</td>
                            <td>12/12/2021</td>
                            <td>$3000</td>
                            <td>John Doe</td>
                            <td><span className="badge bg-danger">Rejected</span></td>
                            <td>
                                <button className="btn btn-sm btn-link text-danger">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default LeadQuoteList