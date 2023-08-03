import { FormEvent, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import useInput, { InitialDataType } from '../../hooks/useInput';
import Button from '../UI/button/Button';
import InputField from '../UI/input/InputField';
import CodeField, { CodeHandle } from './CodeField';

const EmailFormWrapper = styled.div`
  margin: 1rem auto;
`;

interface EmailFormProps {
  isLogin: boolean;
}

const EmailForm = ({ isLogin }: EmailFormProps) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<CodeHandle>(null);

  const [isVerify, setIsVerify] = useState(false);
  const [isRetype, setIsRetype] = useState(false);

  const [{ email, password, passwordVerify }, dataHandler, setData] = useInput({
    email: '',
    password: '',
    passwordVerify: '',
  } as InitialDataType);

  useEffect(() => {
    emailRef.current?.focus();
  }, [isLogin, isRetype]);


  const verifyHandler = () => {
    setIsVerify(true);
    setIsRetype(false);
  };

  const retypeHandler = () => {
    setIsRetype(true);
    setData((prev) => {
      return { ...prev, email: '' };
    });
    emailRef.current?.focus();
  };

  const registerHandler = (event: FormEvent) => {
    event.preventDefault();
    const code = codeRef.current?.value() || '';
    console.log('회원가입', { email, code, password });
  };

  return (
    <EmailFormWrapper className="w-85">
      <form
        className="flex-column gap-sm"
        onSubmit={registerHandler}
      >
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
                <Button sizeClass="sm" isFit={true} onClick={verifyHandler}>
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
            onChange={dataHandler}
            disabled={isVerify && !isRetype && !isLogin}
          />
        </InputField>
        {!isLogin && !isVerify && (
          <Button onClick={verifyHandler}>
            인증코드 전송
          </Button>
        )}
        {!isLogin && isVerify && <CodeField ref={codeRef} />}
        {(isLogin || isVerify) && (
          <>
            <InputField className={isLogin ? '' : 'mt-md'}>
              <label>비밀번호</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={dataHandler}
              />
            </InputField>
            {!isLogin && (
              <InputField>
                <label>비밀번호 확인</label>
                <input
                  type="password"
                  name="passwordVerify"
                  value={passwordVerify}
                  onChange={dataHandler}
                />
              </InputField>
            )}
            <Button type="submit" className="mt-md" sizeClass="md">
              {isLogin ? '로그인하기' : '회원가입하기'}
            </Button>
          </>
        )}
      </form>
    </EmailFormWrapper>
  );
};

export default EmailForm;
