import { Link, useParams } from 'react-router-dom';
import PageContainer from '../../../components/page/PageContainer';
import httpClient from '../../../helpers/http-client';
import {useQuery} from '@tanstack/react-query';
import PageTitle from './../../../components/page/PageTitle';

const getLogContent = async (date) => {
    const response = await httpClient.get(`/logs/${date}`);
    return response.data;
}

export default function LogContentPage() {
    let { date } = useParams();
    const { isPending, data } = useQuery({ queryKey: ['log-content', date], queryFn: async () => await getLogContent(date) });

    return (
        <>
            <PageTitle title="Application Logs" />
            <PageContainer>
                <PageContainer.Header title="Log Content">
                <div className="hstack mb-2">
                    <h5>{`Log File Date - ${date}`}</h5>
                    <div className="ms-auto">
                        <Link to="/system/logs" className="text-decoration-none">
                            <i className="bi bi-arrow-left"></i> Back
                        </Link>
                    </div>
                </div>
                </PageContainer.Header>
                <PageContainer.Body>
                <textarea rows="28" title="Log file contents" placeholder="Logs" className="form-control rounded-0"
                    value={isPending ? "Loading...." : data?.content} readOnly></textarea>
                </PageContainer.Body>                
            </PageContainer >
        </>
    )
}
