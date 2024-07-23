import { Outlet, useLocation } from 'react-router-dom';
import Header from '@app/header/Index';

export default function Index() {
  const location = useLocation();
  
  return (
    <>
      {location.pathname !== '/' && <Header />}
      <Outlet />
    </>
  );
}
