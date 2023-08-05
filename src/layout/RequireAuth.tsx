import { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authAtom } from '../atoms/userAtom';

interface RequireAuth {
  authRequired?: boolean;
}

function RequireAuth({ authRequired, children }: PropsWithChildren<RequireAuth>) {
  const auth = useRecoilValue(authAtom);
  const location = useLocation();

  if ((authRequired === undefined || authRequired) && !auth) {
    return <Navigate to="/landing" state={{ from: location }} replace />;
  }

  if (authRequired !== undefined && !authRequired && auth) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RequireAuth;
