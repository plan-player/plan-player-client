import { AnimatePresence, motion, useAnimate } from 'framer-motion';
import { Children, PropsWithChildren, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { hideNavAtom } from '../../../atoms/uiAtom';
import ConfirmCancelButtons from '../button/ConfirmCancelButtons';
import InputArea from '../input/InputArea';
import Backdrop from './Backdrop';

const InputWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50%;
  z-index: 2;
  background-color: var(--white);
  transform: translateY(calc(100% - var(--nav-h) - 5.5rem)) translateZ(0);
`;

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
const InputBg = styled(motion.div)`
  position: absolute;
  background: var(--primary);
  width: 100%;
  border-radius: 0 0 50% 50%;
  height: calc(var(--nav-h) + 0.5rem);
  transform: scaleY(2.5) translateZ(0);
  transform-origin: top;
`;

export interface InputOverlayProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const InputOverlay = ({
  isOpen,
  setIsOpen,
  children,
}: PropsWithChildren<InputOverlayProps>) => {
  const [wrapper, animateWrapper] = useAnimate();
  const [bg, animateBg] = useAnimate();

  const setHideNav = useSetRecoilState(hideNavAtom);

  const childrenList = Children.toArray(children);

  useEffect(() => {
    if (isOpen) {
      setHideNav(true);
      animateWrapper(wrapper.current, { transform: 'translateY(0) translateZ(0)' });
      animateBg(bg.current, {
        transform: 'scaleY(0.8) translateZ(0)',
      });
    } else {
      animateWrapper(wrapper.current, {
        transform: 'translateY(calc(100% - var(--nav-h) - 5.5rem)) translateZ(0)',
      });
      animateBg(bg.current, {
        transform: 'scaleY(2.5) translateZ(0)',
      });
      setHideNav(false);
    }
  }, [isOpen]);

  const openHandler = () => {
    setIsOpen(true);
  };

  const closeHandler = () => {
    setIsOpen(false);
  };

  return (
    <>
      <AnimatePresence>{isOpen && <Backdrop onClose={closeHandler} />}</AnimatePresence>
      <div>
        <InputWrapper ref={wrapper} className="flex j-center">
          <InputBg ref={bg} />
          <InputArea onClick={openHandler} isExpand={isOpen}>
            {childrenList[0]}
          </InputArea>
          <div className="w-90 mt-2xl">
            {childrenList[1]}
            <ConfirmCancelButtons className="w-90" />
          </div>
        </InputWrapper>
      </div>
    </>
  );
};

export default InputOverlay;
