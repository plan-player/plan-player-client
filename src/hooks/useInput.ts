import React, { useCallback, useState } from 'react';

export interface InitialDataType {
    [name: string]: string;
}

export default (initialData: InitialDataType) => {
  const [data, setData] = useState(initialData);

  const handler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value, name } = event.target;
      setData({ ...data, [name]: value });
    },
    [data]
  );

  return [data, handler, setData] as const;
};
