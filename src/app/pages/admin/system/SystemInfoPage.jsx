
import PageContainer from '../../../components/page/PageContainer';
import httpClient from './../../../helpers/http-client';
import { useQuery } from '@tanstack/react-query';
import PageTitle from './../../../components/page/PageTitle';

const useGetAppInfo = async () => {
  const response = await httpClient.get('/application/info');
  return response.data;
}

const SystemInfoPage = () => {
  const { isPending, data } = useQuery({ queryKey: 'app-info', queryFn: useGetAppInfo });

  if (isPending) {
    return <div>Loading...</div>
  }

  return (
    <>
      <PageTitle title="Application Info" />
      <PageContainer>
        <PageContainer.Header>
          <h4 className="text-primary mb-3">System Info</h4>
        </PageContainer.Header>
        <PageContainer.Body className="col-lg-9">
          <dl className="row g-3">
            <dt className="col-lg-4">Version:</dt>
            <dd className="col-lg-8">{data?.version}</dd>
            <dt className="col-lg-4">API Environment:</dt>
            <dd className="col-lg-8">{data?.apiEnvironment}</dd>
            <dt className="col-lg-4">Web Environment:</dt>
            <dd className="col-lg-8">{data?.webEnvironment}</dd>
          </dl>
        </PageContainer.Body>
      </PageContainer>
    </>
  )

}

export default SystemInfoPage