import { PropsWithChildren } from 'react';

interface IconButtonProps {
  //   icon: string | ReactNode;
  className?: string;
  type?: 'button' | 'submit';
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const IconButton = (props: PropsWithChildren<IconButtonProps>) => {
  return (
    <button
      {...props}
      className={`circle button-primary size-sm text-xs flex-center shrink-0 ${
        props.className || ''
      }`}
    >
      {props.children}
    </button>
  );
};

export default IconButton;
