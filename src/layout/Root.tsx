import { Outlet } from 'react-router';

const Root = () => {
  return (
    <div className="vh-100 hidden relative">
      <Outlet />
    </div>
  );
};

export default Root;
