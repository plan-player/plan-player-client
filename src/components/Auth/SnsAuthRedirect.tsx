import { useEffect } from 'react';
import {
  ActionFunction,
  useActionData,
  useNavigate,
  useParams,
  useSearchParams,
  useSubmit,
} from 'react-router-dom';
import { fetchRequest } from '../../util/request';

const SnsAuthRedirect = () => {
  const submit = useSubmit();
  const navigate = useNavigate();

  const response = useActionData() as Awaited<ReturnType<typeof action>>;

  const { provider } = useParams();
  const [params] = useSearchParams();
  const code = params.get('code');

  useEffect(() => {
    submit(`provider=${provider || ''}&code=${code || ''}`, { method: 'post' });
  }, []);

  useEffect(() => {
    if (!response) {
      return;
    }

    if ((response as Response)?.ok) {
      navigate('/playlist');
    } else {
      throw new Error('SNS 로그인 요청에 실패했습니다.');
    }
  }, [response]);

  return <div>Loading..</div>;
};

export default SnsAuthRedirect;

interface SocialLoginResponseType {
  data: any;
  status: string;
  message: string;
  memo: string;
}

interface SocialLoginRequestBodyType {
  provider: string;
  code: string;
}

export const action: ActionFunction = async ({ params, request }) => {
  const formData = await request.formData();
  const { provider } = params;
  const code = formData.get('code') as string;

  if (!provider || !code) {
    throw new Error('로그인할 SNS와 코드를 입력하세요.');
  }

  const data = await fetchRequest<SocialLoginResponseType, SocialLoginRequestBodyType>({
    url: '/social-login',
    method: 'POST',
    body: { provider, code },
  });

  if (data.status === 'OK') {
    return { ok: true };
  } else {
    throw new Error(data.status + ': ' + data.memo);
  }
};
