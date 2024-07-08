import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import app from '../../constants/app-config'

const PageTitle = ({ title }) => {
  const location = useLocation();

  useEffect(() => {
    document.title = `${title} | ${app.name}`;
  }, [location, title]);

  return null;
};

export default PageTitle;