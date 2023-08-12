import { useState } from 'react';
import { ObjectType } from '../types/types';

export const useValidate = (rules: ObjectType<string>) => {
  const [errors, setErrors] = useState<Map<string, string>>(new Map());

  // onBlur 시 유효성 검증
  const validate = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const validateFunc = rules[name];
    const error = validateFunc(value);

    setErrors((prev) => {
      return new Map(prev).set(name, error);
    });
  };

  return [errors, validate] as const;
};
