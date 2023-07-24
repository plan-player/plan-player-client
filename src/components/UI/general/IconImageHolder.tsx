import { PropsWithChildren } from 'react';
import { SizeType } from '../../../types/size';

interface IconImageHolderProps {
  className?: string;
  isCircle?: boolean;
  size?: SizeType;
  bg?: string;
}

const IconImageHolder = ({
  className,
  isCircle,
  size,
  children,
  bg,
}: PropsWithChildren<IconImageHolderProps>) => {
  const textSize: SizeType = size || 'root';

  return (
    <div
      className={`flex-center shrink-0 ${isCircle ? 'circle' : 'round-sm'} size-${
        size ? size : 'lg'
      } text-${textSize} ${className || ''} ${bg ? `bg-${bg}` : 'bg'}
      `}
    >
      {children}
    </div>
  );
};

export default IconImageHolder;
