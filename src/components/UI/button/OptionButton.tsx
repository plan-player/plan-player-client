import { PropsWithChildren, useState } from 'react';
import { SizeType } from '../../../types/size';
import { styled } from 'styled-components';

const ContextMenu = styled.ul`
  box-shadow: 0px 4px 60px rgba(99, 99, 99, 0.2);
  top: 0.5rem;
  min-width: 7.5rem;
  padding: 0.5rem;
`;

interface OptionButtonProps {
  size?: SizeType;
  menu: { name: string; action: () => void }[];
  onSelect?: () => void;
}

const OptionButton = (props: PropsWithChildren<OptionButtonProps>) => {
  const { size, menu, onSelect, children } = props;

  const [isShowMenu, setIsShowMenu] = useState(false);

  const clickHandler = (action: () => void) => {
    return () => {
      setIsShowMenu(false);
      onSelect && onSelect();
      action();
    };
  };

  const outside = (
    <div
      className="fixed top-0 bottom-0 left-0 right-0"
      onClick={(event: React.MouseEvent) => {
        event.stopPropagation();
        setIsShowMenu(false);
      }}
    ></div>
  );

  const contextMenu = (
    <ContextMenu className="absolute right-0 bg-white round-md">
      {menu.map((item) => {
        const { name, action } = item;
        return (
          <li key={name} onClick={clickHandler(action)} className="text-md p-sm">
            {name}
          </li>
        );
      })}
    </ContextMenu>
  );

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
    <>
      {isShowMenu && outside}
      <div className="relative">
        <button
          className={`font-bold text-${textSize}`}
          onClick={() => {
            setIsShowMenu(true);
          }}
        >
          {children ? children : '…'}
        </button>
        {isShowMenu && contextMenu}
      </div>
    </>
  );
};

export default OptionButton;
