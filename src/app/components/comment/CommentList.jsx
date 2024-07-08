import { Fragment, useState } from 'react';
import { getApiFileUrl } from './../../helpers/utils';
import prettyMilliseconds from 'pretty-ms';
import PostComment from './PostComment';
import DeleteComment from './DeleteComment';

const CommentList = ({ type, typeId, data, onUpdate }) => {
    const [editId, setEditId] = useState(null);

    const formatDate = (date) => {
        const utc = new Date(date);
        const local = new Date(utc.getTime() - utc.getTimezoneOffset() * 60000);
        const dateString = local.toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
        const timeMs = new Date().getTime() - local.getTime();
        const humanString = prettyMilliseconds(timeMs, { unitCount: 1 });

        if (timeMs < 60000) {
            return (<small className="text-muted" title={dateString}>Just now</small>)
        }
        else if (timeMs < 86400000) {
            return (<small className="text-muted" title={dateString}>{humanString} ago</small>)
        }

        return (<small className="text-muted">{dateString}</small>)

    }

    const handleUpdate = (type) => {
        setEditId(null);
        onUpdate(type);
    }

    return (
        <>
            {data &&
                <div className="list-group list-group-flush">
                    {data.map((comment) => (
                        <Fragment key={comment.id}>
                            {editId === comment.id ?
                                <PostComment id={comment.id} type={type} typeId={typeId} onPost={()=>handleUpdate("edit")} onCancel={() => setEditId(null)} pagePending={false} /> :
                                <div key={comment.id} className="list-group-item mb-3 pb-3">
                                    <div className="d-flex gap-3">
                                        <div className="avatar">
                                            <img src={getApiFileUrl(comment?.createdByAvatar)} alt="avatar" className="avatar-image rounded-circle" />
                                        </div>
                                        <div className="flex-fill">
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    <h6 className="mb-0">{comment?.createdByName}</h6>
                                                    {formatDate(comment.createdAtUtc)}
                                                </div>
                                                <div>
                                                    <button className="btn btn-link btn-sm" onClick={() => setEditId(comment.id)}>Edit</button>
                                                    <DeleteComment id={comment.id} onDelete={()=>onUpdate("delete")} />
                                                </div>
                                            </div>
                                            <p className="card-text">{comment.body}</p>
                                        </div>
                                    </div>
                                </div>
                            }
                        </Fragment>
                    ))}
                </div>
            }
        </>
    )
}

export default CommentList