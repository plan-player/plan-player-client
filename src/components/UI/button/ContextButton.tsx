import { PropsWithChildren } from 'react';
import { SizeType } from '../../../types/size';

interface ContextButtonProps {
  size?: SizeType;
}

const ContextButton = (props: PropsWithChildren<ContextButtonProps>) => {
  const { size, children } = props;

  // TODO: 클릭 시 props로 구성된 Context 메뉴 띄우기

  let textSize: SizeType = 'root';
  switch (size) {
    case 'lg':
      textSize = 'xl';
      break;
    case 'md':
      textSize = 'md';
      break;
    case 'sm':
      textSize = 'root';
      break;
  }

  return (
    <button className={`font-bold text-${textSize}`}>{children ? children : '…'}</button>
  );
};

export default ContextButton;
