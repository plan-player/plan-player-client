import React, { useCallback, useState } from 'react';

const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export interface InputDataType {
  [name: string]: string;
}

export default (initialData: InputDataType) => {
  const [emailError, setEmailError] = useState(false);
  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const [passwordVerifyError, setPasswordVerifyError] = useState(false);

  const [data, setData] = useState(initialData);

  const handler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value, name } = event.target;
      setData({ ...data, [name]: value });
    },
    [data]
  );

  const emailErrorHandler = () => {
    if (data.email === '' || !emailPattern.test(data.email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const passwordLengthErrorHandler = () => {
    if (data.password.length < 8 || data.password.length > 24) {
      setPasswordLengthError(true);
      passwordVerifyErrorHandler();
    } else {
      setPasswordLengthError(false);
      passwordVerifyErrorHandler();
    }
  };

  const passwordVerifyErrorHandler = () => {
    if (data.password !== data.passwordVerify) {
      setPasswordVerifyError(true);
    } else {
      setPasswordVerifyError(false);
    }
  };

  return [
    data,
    handler,
    setData,
    emailErrorHandler,
    emailError,
    passwordLengthErrorHandler,
    passwordLengthError,
    passwordVerifyErrorHandler,
    passwordVerifyError,
  ] as const;
};
