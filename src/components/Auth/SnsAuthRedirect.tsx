import { useEffect } from 'react';
import {
  ActionFunctionArgs,
  useActionData,
  useNavigate,
  useParams,
  useSearchParams,
  useSubmit,
} from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authAtom } from '../../atoms/userAtom';
import { fetchRequest } from '../../util/request';
import LoadingSpinner from '../UI/general/LoadingSpinner';

const SnsAuthRedirect = () => {
  const submit = useSubmit();
  const navigate = useNavigate();

  const [auth, setAuth] = useRecoilState(authAtom);

  const response = useActionData() as Awaited<ReturnType<typeof action>>;

  const { provider } = useParams();
  const [params] = useSearchParams();
  const code = params.get('code');

  useEffect(() => {
    submit(`provider=${provider || ''}&code=${code || ''}`, { method: 'POST' });
  }, []);

  useEffect(() => {
    if (response === undefined) {
      return;
    }

    if (response.ok) {
      setAuth(true);
    } else {
      throw new Error('SNS 로그인 요청에 실패했습니다.');
    }
  }, [response]);

  useEffect(() => {
    if (auth) {
      navigate('/playlist');
    }
  }, [auth]);

  return (
    <div>
      <LoadingSpinner isFull={true} />
    </div>
  );
};

export default SnsAuthRedirect;

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const provider = formData.get('provider') as string;
  const code = formData.get('code') as string;

  if (!provider || !code) {
    throw new Error('로그인할 SNS와 코드를 입력하세요.');
  }

  await fetchRequest<null>({
    url: '/social-login',
    method: 'POST',
    body: { provider, code },
  });

  return { ok: true };
};
