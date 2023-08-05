import { Outlet } from 'react-router';

const RootContainer = () => {
  return (
    <div className="vh-100 hidden relative">
      <Outlet />
    </div>
  );
};

export default RootContainer;
