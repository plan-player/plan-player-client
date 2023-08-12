import { motion } from 'framer-motion';
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import {
  ActionFunctionArgs,
  useActionData,
  useNavigate,
  useSubmit,
} from 'react-router-dom';
import { styled } from 'styled-components';
import Button from '../UI/button/Button';
import Inform from '../UI/general/Inform';
import InputField from '../UI/input/InputField';
import CodeField, { CodeHandle } from './CodeField';
import { fetchRequest } from '../../util/request';
import EmailAuthTimer from './EmailAuthTimer';
import useInput, { InputDataType } from '../../hooks/useInput';
import { useValidate } from '../../hooks/useValidate';
import { registerValidate as rules } from '../../util/registerValidate';
import { ObjectType } from '../../types/types';

interface EmailFormProps {
  isLogin: boolean;
  setLogin: (data: boolean) => void;
}

interface ActionDataType {
  codeVerified: boolean;
  codeSend: boolean;
  registered: boolean;
  passwordLengthVerified: boolean;
  isEqualsPassword: boolean;
  logined: boolean;
}

const EmailFormWrapper = styled(motion.div)`
  margin: 1rem auto;
`;

export const ErrorInform = ({ children }: PropsWithChildren) => {
  return (
    <Inform isError={true} isLeft={true}>
      {children}
    </Inform>
  );
};

const EmailForm = ({ isLogin, setLogin }: EmailFormProps) => {
  const submit = useSubmit();
  const navigate = useNavigate();
  let actionData = useActionData() as ActionDataType;

  const emailRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<CodeHandle>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const [isRetype, setIsRetype] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [iscodeVerified, setIscodeVerified] = useState(false);
  const [needCodeVerify, setNeedCodeVerify] = useState(false);
  const [passwordVerified, setPasswordVerified] = useState(true);

  const [{ email, password, passwordVerify }, Handler, setData] = useInput({
    email: '',
    password: '',
    passwordVerify: '',
  } as InputDataType);

  const [errors, validate] = useValidate(rules as ObjectType<string>);

  const notEmailError = errors.get('email') === '' || errors.get('email') === undefined;
  const notPasswordError =
    errors.get('password') === '' || errors.get('password') === undefined;

  useEffect(() => {
    if (actionData?.codeVerified) {
      setShowTimer(false);
      setIscodeVerified(true);
      setCodeError(false);
      setNeedCodeVerify(false);
    } else if (actionData?.codeVerified === false) {
      setCodeError(true);
    }

    if (actionData?.codeSend) {
      setShowTimer(true);
      setIsVerify(true);
      setIsRetype(false);
      setIsLoading(false);
      setIscodeVerified(false);
      setCodeError(false);
      codeRef?.current?.clear();
    }

    if (actionData?.registered) {
      setLogin(true);
    } else if (actionData?.registered === false) {
      // 이미 있는 회원
    }

    if (actionData?.logined) {
      navigate('/playlist');
    } else if (actionData?.logined === false) {
      // 로그인 실패
    }
  }, [actionData]);

  useEffect(() => {
    if (isLogin) {
      setIsVerify(false);
    }
  }, [isLogin]);

  useEffect(() => {
    emailRef.current?.focus();
  }, [isLogin, isRetype]);

  const retypeHandler = () => {
    setShowTimer(false);
    setIsRetype(true);
    setData((prev) => {
      return { ...prev, email: '' };
    });
    emailRef.current?.focus();
  };

  const submitHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { value } = event.currentTarget;

    switch (value) {
      case 'codeSend':
        if (notEmailError) {
          setIsLoading(true);
          submit({ email, intent: value }, { method: 'POST' });
        }
        break;

      case 'register':
        if (passwordVerified) {
          if (!iscodeVerified) {
            setNeedCodeVerify(true);
          } else {
            setNeedCodeVerify(false);
            submit({ email, password, intent: value }, { method: 'POST' });
          }
        }
        break;

      case 'login':
        submit({ email, password, intent: value }, { method: 'POST' });
        break;
    }
  };

  const codeverifyHandler = () => {
    if (codeRef?.current?.value().length === 6) {
      submit(`email=${email}&code=${codeRef?.current?.value()}&intent=codeverify`, {
        method: 'POST',
      });
    }
  };

  const passwordVerifyHandler = () => {
    if (password === passwordVerify) {
      setPasswordVerified(true);
    } else {
      setPasswordVerified(false);
    }
  };

  return (
    <EmailFormWrapper className="w-85">
      <motion.form layout className="flex-column gap-sm">
        <InputField>
          <div className="flex j-between i-center">
            <label>이메일</label>
            {!isLogin && isVerify && (
              <div className="flex">
                <Button
                  styleClass="extra"
                  sizeClass="sm"
                  isFit={true}
                  onClick={retypeHandler}
                >
                  <u>다시 입력</u>
                </Button>
                <Button
                  sizeClass="sm"
                  isFit={true}
                  value="codeSend"
                  onClick={submitHandler}
                  isPending={isLoading ? true : false}
                >
                  재전송
                </Button>
              </div>
            )}
          </div>
          <input
            ref={emailRef}
            type="email"
            name="email"
            value={email}
            onChange={Handler}
            onBlur={validate}
            disabled={isVerify && !isRetype && !isLogin}
          />
          {!notEmailError && <ErrorInform>{errors.get('email')}</ErrorInform>}
        </InputField>
        {!isLogin && !isVerify && (
          <Button
            value="codeSend"
            onClick={submitHandler}
            isPending={isLoading ? true : false}
          >
            인증코드 전송
          </Button>
        )}

        {!isLogin && isVerify && (
          <>
            <div onBlur={codeverifyHandler}>
              <CodeField iscodeVerified={iscodeVerified} ref={codeRef} />
            </div>

            {showTimer ? <EmailAuthTimer /> : null}
          </>
        )}

        {!isLogin && isVerify && codeError && (
          <ErrorInform>코드가 일치하지 않습니다.</ErrorInform>
        )}

        {(isLogin || isVerify) && (
          <>
            <InputField className={isLogin ? '' : 'mt-md'}>
              <label>비밀번호</label>
              <input
                type="password"
                name="password"
                value={password}
                onBlur={validate}
                onChange={Handler}
              />
              {!notPasswordError && <ErrorInform>{errors.get('password')}</ErrorInform>}
            </InputField>

            {!isLogin && (
              <InputField>
                <label>비밀번호 확인</label>
                <input
                  type="password"
                  name="passwordVerify"
                  value={passwordVerify}
                  onChange={Handler}
                  onBlur={passwordVerifyHandler}
                />
                {!passwordVerified && (
                  <ErrorInform>비밀번호가 일치하지 않습니다.</ErrorInform>
                )}
              </InputField>
            )}
            <Button
              className="mt-md"
              sizeClass="md"
              isPending={false}
              name="intent"
              onClick={submitHandler}
              value={isLogin ? 'login' : 'register'}
            >
              {isLogin ? '로그인하기' : '회원가입하기'}
            </Button>
            {needCodeVerify && (
              <ErrorInform>인증 코드 6자리를 모두 입력하세요.</ErrorInform>
            )}
          </>
        )}
      </motion.form>
    </EmailFormWrapper>
  );
};

export default EmailForm;

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const email = formData.get('email');
  const password = formData.get('password');
  const code = formData.get('code');

  const loginAndRegisterBody = {
    username: email,
    password,
  };

  switch (formData.get('intent')) {
    case 'codeSend':
      try {
        await fetchRequest({
          url: '/login/mailConfirm',
          method: 'POST',
          body: { email },
        });
        return { codeSend: true };
      } catch {
        return { codeSend: false };
      }

    case 'codeverify':
      try {
        await fetchRequest({
          url: '/login/authenticate',
          method: 'POST',
          body: { email, code },
        });
        return { codeVerified: true };
      } catch {
        return { codeVerified: false };
      }

    case 'register':
      try {
        await fetchRequest({
          url: '/api/user/one',
          method: 'POST',
          body: loginAndRegisterBody,
        });
        return { registered: true };
      } catch {
        return { registered: false };
      }

    case 'login':
      try {
        await fetchRequest({
          url: '/api/login',
          method: 'POST',
          body: loginAndRegisterBody,
        });
        return { logined: true };
      } catch {
        return { logined: false };
      }
  }
};

// 비밀번호 형식 8~24자 이내 / 영문(대,소), 숫자, 특수문자 입력 가능
// 연속적인 숫자 3자 이상 사용 불가
