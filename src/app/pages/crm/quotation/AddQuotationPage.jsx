import PageContainer from "../../../components/page/PageContainer"

const AddQuotationPage = () => {
    return (
        <PageContainer>
            <PageContainer.Header>
                <h3>Add Quotation</h3>
            </PageContainer.Header>
            <PageContainer.Body>
                <div className="row">
                    <div className="col-md-12">
                        <h4>Quotation</h4>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-label">Lead</label>
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-label">Quotation Date</label>
                            <input type="date" className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-label">Account</label>
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-label">Contact</label>
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-12 mb-3">
                        <div className="form-group">
                            <label className="form-label">Subject</label>
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <h4>Products/Services</h4>
                        {/* table add/edit products */}
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Product/Service</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Discount</th>
                                    <th>Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input type="text" className="form-control" />
                                    </td>
                                    <td>
                                        <input type="number" className="form-control" />
                                    </td>
                                    <td>
                                        <input type="number" className="form-control" />
                                    </td>
                                    <td>
                                        <input type="number" className="form-control" />
                                    </td>
                                    <td>
                                        <input type="number" className="form-control" />
                                    </td>
                                    <td>
                                        <button className="btn btn-danger">Remove</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label className="form-label">Note</label>
                            <textarea className="form-control"></textarea>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label className="form-label">Terms and Conditions</label>
                            <textarea className="form-control"></textarea>
                        </div>
                    </div>                  
                </div>
            </PageContainer.Body>
        </PageContainer>
    )
}

export default AddQuotationPage