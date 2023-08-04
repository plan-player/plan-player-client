import { Navigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authAtom } from '../atoms/userAtom';

function RequireAuth(props: { children: React.ReactNode }) {
  const auth = useRecoilValue(authAtom);
  const location = useLocation();

  if (!auth) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{props.children}</>;
}

export default RequireAuth;
