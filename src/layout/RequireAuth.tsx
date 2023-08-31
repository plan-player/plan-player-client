import { PropsWithChildren, useEffect } from 'react';
import { Navigate, useLoaderData } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { UserType, authAtom } from '../atoms/userAtom';
import { ErrorType, fetchRequest } from '../util/request';

interface RequireAuth {
  authRequired?: boolean;
}

function RequireAuth({ authRequired, children }: PropsWithChildren<RequireAuth>) {
  const setAuth = useSetRecoilState(authAtom);
  const userData = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  useEffect(() => {
    if (userData) {
      setAuth(true);
    }
  }, [userData]);

  if (authRequired) {
    if (userData) {
      // 로그인된 사용자가 자격접근 필요한 라우터에 접근할 경우
      return <>{children}</>;
    } else {
      // 로그인되지 않은 사용자가 자격접근 필요한 라우터에 접근할 경우
      return <Navigate to="/landing" replace />;
    }
  } else {
    if (userData) {
      // 로그인된 사용자가 자격 접근 필요없는 라우터에 접근할 경우
      return <Navigate to="/" replace />;
    } else {
      // 로그인되지 않은 사용자가 자격 접근 필요없는 라우터에 접근할 경우
      return <>{children}</>;
    }
  }

  return children;
}

export default RequireAuth;

export const loader = async () => {
  try {
    const user = await fetchRequest<UserType>({
      url: '/api/user/test1',
      method: 'get',
    });
    return user;
  } catch (error) {
    if ((error as ErrorType).status === 403) {
      return null;
    } else {
      throw error;
    }
  }
};
