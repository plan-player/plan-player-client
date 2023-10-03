import { AnimatePresence, motion, useAnimate } from 'framer-motion';
import React, { Children, PropsWithChildren, useEffect, useState } from 'react';
import { Form, useSubmit } from 'react-router-dom';
import { styled } from 'styled-components';
import ConfirmCancelButtons from '../button/ConfirmCancelButtons';
import InputArea from '../input/InputArea';
import Backdrop from './Backdrop';

const InputWrapperContainer = styled(motion.div)`
  @media screen and (min-width: 960px) {
    #backdrop {
      background-color: var(--white);
    }
  }
`;

const InputWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50%;
  z-index: 100;
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

  @media screen and (min-width: 960px) {
    display: none;
  }
`;

export interface InputOverlayProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setHideNav: React.Dispatch<React.SetStateAction<boolean>>;
  formAction?: string;
}

const InputOverlay = ({
  isOpen,
  setIsOpen,
  setHideNav,
  children,
  formAction,
}: PropsWithChildren<InputOverlayProps>) => {
  const submit = useSubmit();

  const [browserWidth, setBrowserWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setBrowserWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [wrapper, animateWrapper] = useAnimate();
  const [bg, animateBg] = useAnimate();

  const childrenList = Children.toArray(children);

  useEffect(() => {
    if (isOpen) {
      setHideNav(true);
      animateWrapper(wrapper.current, {
        transform:
          browserWidth > 960
            ? 'translateY(-5rem) translateZ(0)'
            : 'translateY(0) translateZ(0)',
      });
      animateBg(
        bg.current,
        {
          transform: 'scaleY(0.8) translateZ(0)',
        },
        { duration: 0.2 }
      );
    } else {
      animateWrapper(wrapper.current, {
        transform: 'translateY(calc(100% - var(--nav-h) - 5.5rem)) translateZ(0)',
      });
      animateBg(
        bg.current,
        {
          transform: 'scaleY(2.5) translateZ(0)',
        },
        { duration: 0.2 }
      );
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
    <InputWrapperContainer layout>
      <AnimatePresence>{isOpen && <Backdrop onClose={closeHandler} />}</AnimatePresence>
      {/* TODO: props로 바꾸기! && 애니메이션 유지될 수 있는 방법 연구 */}

      {/* 아래 Form - action 메소드 한번 확인해주시고, 수정 가능하시면 수정 부탁드릴게요~! */}
      <Form
        action={formAction ? formAction : '/playlist'}
        method="post"
        onSubmit={(event: React.FormEvent) => {
          event.preventDefault();

          const form = event.currentTarget as HTMLFormElement;

          submit(form);
          form.reset();
        }}
      >
        <InputWrapper ref={wrapper} className="flex j-center">
          <InputBg ref={bg} />
          <InputArea onClick={openHandler} isExpand={isOpen}>
            {/* input */}
            {childrenList[0]}
          </InputArea>
          <div className="w-90 mt-2xl">
            {/* content */}
            {childrenList[1]}
            <ConfirmCancelButtons className="w-90" onClose={closeHandler} />
          </div>
        </InputWrapper>
      </Form>
    </InputWrapperContainer>
  );
};

export default InputOverlay;
