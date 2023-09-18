import { PropsWithChildren } from 'react';
import { SizeType } from '../../../types/size';

interface IconImageHolderProps {
  className?: string;
  isCircle?: boolean;
  size?: SizeType;
  bg?: string;
  onClick?: () => void;
}

const IconImageHolder = ({
  className,
  isCircle,
  size,
  children,
  bg,
  onClick,
}: PropsWithChildren<IconImageHolderProps>) => {
  const textSize: SizeType = size || 'root';

  return (
    <div
      onClick={onClick}
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
