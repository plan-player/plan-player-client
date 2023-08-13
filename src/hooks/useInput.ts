import React, { useCallback, useState } from 'react';

export default () => {
  const [data, setData] = useState<Map<string, string>>(new Map());

  const handler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value, name } = event.target;
      setData((prev) => {
        return new Map(prev).set(name, value);
      });
    },
    [data]
  );

  return [data, handler, setData] as const;
};
