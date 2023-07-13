import { PropsWithChildren } from 'react';

const IconImageHolder = ({ children }: PropsWithChildren) => {
  return <div className="bg size-lg round-sm flex-center shrink-0">{children}</div>;
};

export default IconImageHolder;
