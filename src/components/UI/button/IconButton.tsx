import { PropsWithChildren } from 'react';
import { SizeType } from '../../../types/size';

interface IconButtonProps {
  //   icon: string | ReactNode;
  className?: string;
  type?: 'button' | 'submit';
  size?: SizeType;
  text?: SizeType;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const IconButton = (props: PropsWithChildren<IconButtonProps>) => {
  const { className, size, text, children } = props;
  return (
    <button
      {...props}
      className={`circle button-primary flex-center shrink-0 ${className || ''} ${
        size ? `size-${size}` : 'size-sm'
      } ${text ? `text-${text}` : 'text-xs'}`}
    >
      {children}
    </button>
  );
};

export default IconButton;
