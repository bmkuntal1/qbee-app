
import PageContainer from '../../../components/page/PageContainer';
import httpClient from './../../../helpers/http-client';
import { useQuery } from '@tanstack/react-query';
import PageTitle from './../../../components/page/PageTitle';

const useGetAppInfo = async () => {
  const response = await httpClient.get('/info');
  return response.data;
}

const InfoPage = () => {
  const { isPending, data } = useQuery({ queryKey: ['app-info'], queryFn: useGetAppInfo });

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
            <dt className="col-lg-4">App Name:</dt>
            <dd className="col-lg-8">{import.meta.env.VITE_APP_NAME}</dd>
            <dt className="col-lg-4">Web Version:</dt>
            <dd className="col-lg-8">{import.meta.env.VITE_APP_VERSION}</dd>
            <dt className="col-lg-4">Web Environment:</dt>
            <dd className="col-lg-8">{import.meta.env.MODE}</dd>
            <dt className="col-lg-4">API Name:</dt>
            <dd className="col-lg-8">{data?.name}</dd>
            <dt className="col-lg-4">API Version:</dt>
            <dd className="col-lg-8">{data?.version}</dd>
            <dt className="col-lg-4">API Environment:</dt>
            <dd className="col-lg-8">{data?.environment}</dd>
          </dl>
        </PageContainer.Body>
      </PageContainer>
    </>
  )

}

export default InfoPage