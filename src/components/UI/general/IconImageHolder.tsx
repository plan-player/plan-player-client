import { PropsWithChildren } from 'react';
import { SizeType } from '../../../types/size';

interface IconImageHolderProps {
  className?: string;
  isCircle?: boolean;
  size?: SizeType;
}

const IconImageHolder = ({
  className,
  isCircle,
  size,
  children,
}: PropsWithChildren<IconImageHolderProps>) => {
  let textSize: SizeType = 'root';

  switch (size) {
    case '3xxl':
      textSize = '3xxl';
      break;
  }

  return (
    <div
      className={`bg flex-center shrink-0 ${isCircle ? 'circle' : 'round-sm'} size-${
        size ? size : 'lg'
      } text-${textSize} ${className || ''}`}
    >
      {children}
    </div>
  );
};

export default IconImageHolder;
