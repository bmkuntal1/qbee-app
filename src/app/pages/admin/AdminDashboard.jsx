import PageTitle from "../../components/page/PageTitle";

const sampleData = [
    { label: 'Sales', value: '$6,8,25', changeValue: '21%', changeDirection: 'up', timePeriod: 'Since last week' },
    { label: 'Orders', value: '3,200', changeValue: '15%', changeDirection: 'up', timePeriod: 'Since last month' },
    { label: 'Revenue', value: '$9,000', changeValue: '-5%', changeDirection: 'down', timePeriod: 'Since last year' },
    { label: 'Users', value: '2,500', changeValue: '0%', changeDirection: 'none', timePeriod: 'Since last week' },
]

const StatWidget = ({ label, value, changeValue, changeDirection, timePeriod }) => {

    changeDirection = changeDirection === 'none' ? 'right' : changeDirection;
    const color = changeDirection === 'up' ? 'success' : changeDirection === 'down' ? 'danger' : 'secondary';

    return (<div className="card border-0 shadow">
        <div className="card-body p-4">
            <div className="d-flex justify-content-between">
                <div className="me-3">
                    <h5>{label}</h5>
                    <p className="text-body-secondary fs-4 fw-semibold">{value}</p>
                </div>
                <div>
                    <span className="badge text-bg-info text-white rounded-circle p-3">
                        <i className="bi bi-cart3 fs-3"></i>
                    </span>
                </div>
            </div>

            <div className="d-flex align-items-center">
                <span className={`badge bg-${color}-subtle text-${color} rounded-circle py-2 me-3`}>
                    <i className={`bi bi-arrow-${changeDirection}`}></i></span>
                <span>
                    <p className="mb-0">{changeValue}</p>
                    <p className="text-body-secondary mb-0"><small>{timePeriod}</small></p>
                </span>
            </div>
        </div>
    </div>)
}
const AdminDashboard = () => {
    return (
        <>
            <PageTitle title="Admin Dashboard" />
            <section className="p-4">
                <h4 className="mb-3">Statistics</h4>
                <div className="row gap-3 gap-lg-0">
                    <div className="col-lg-3">
                        <StatWidget {...sampleData[0]} />
                    </div>
                    <div className="col-lg-3">
                        <StatWidget {...sampleData[1]} />
                    </div>
                    <div className="col-lg-3">
                        <StatWidget {...sampleData[2]} />
                    </div>
                    <div className="col-lg-3">
                        <StatWidget {...sampleData[3]} />
                    </div>
                </div>
            </section>
        </>
    )
}

export default AdminDashboard