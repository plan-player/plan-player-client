import { PropsWithChildren } from 'react';

const ContextButton = (props: PropsWithChildren) => {
  const { children } = props;

  // TODO: 클릭 시 props로 구성된 Context 메뉴 띄우기

  return (
    <button className="font-bold" {...props}>
      {children ? children : '…'}
    </button>
  );
};

export default ContextButton;
