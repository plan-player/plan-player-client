import { Outlet } from 'react-router';
import '../reset.css';

const Root = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Root;
