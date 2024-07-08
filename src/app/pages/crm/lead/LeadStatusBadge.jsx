import {convertAttributesToObject} from '../../../helpers/utils';

const LeadStatusBadge = ({ status, statusList }) => {
    const statusObj = statusList?.find((item) => item.value === status);
    const attribs = convertAttributesToObject(statusObj?.attributes);
    if (statusObj) {
        return (
            <span className={`badge bg-${attribs?.color}`}>{statusObj.label}</span>
        )
    }
    return <span className="badge bg-secondary">Unknown</span>
}

export default LeadStatusBadge