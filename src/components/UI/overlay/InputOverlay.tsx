import { AnimatePresence, motion, useAnimate, wrap } from 'framer-motion';
import { Children, PropsWithChildren, useEffect } from 'react';
import { Form, useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import ConfirmCancelButtons from '../button/ConfirmCancelButtons';
import InputArea from '../input/InputArea';
import Backdrop from './Backdrop';
import { useRecoilState } from 'recoil';
import { categoryAddGroupAtom, categoryColorsAtom } from '../../../atoms/categoryAtom';

const AddGroupBtn = styled.button`
  position: absolute;
  bottom: 0;
  margin-bottom: 160px;
`;

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

interface InputBgProps {
  $bgColor?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
const InputBg = styled(motion.div)<InputBgProps>`
  position: absolute;
  background: ${({ $bgColor }) => ($bgColor ? $bgColor : 'var(--primary)')};
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
}

const InputOverlay = ({
  isOpen,
  setIsOpen,
  setHideNav,
  children,
}: PropsWithChildren<InputOverlayProps>) => {
  const location = useLocation();

  const [categoryGroupAdd, setCategoryGroupAdd] = useRecoilState(categoryAddGroupAtom);
  const [cateColorsAtom, setCategoryColorsAtom] = useRecoilState(categoryColorsAtom);

  const [wrapper, animateWrapper] = useAnimate();
  const [bg, animateBg] = useAnimate();

  const categoryGroupAddMotion = () => {
    animateWrapper(wrapper.current, {
      transform: 'translateY(calc(100% - 18rem)) translateZ(0)',
    });
    animateBg(
      bg.current,
      {
        transform: 'scaleY(-0.5) translateZ(0)',
      },
      { duration: 0.2 }
    );
  };

  const categoryGroupAddFinalMotion = () => {
    animateWrapper(wrapper.current, {
      transform: 'translateY(calc(100% - 16rem)) translateZ(0)',
    });
  };

  const categoryGroupAddFinalButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCategoryColorsAtom(true);
  };

  const childrenList = Children.toArray(children);

  useEffect(() => {
    if (isOpen) {
      setHideNav(true);
      if (categoryGroupAdd) {
        categoryGroupAddMotion();
        cateColorsAtom && categoryGroupAddFinalMotion();
      } else {
        animateWrapper(wrapper.current, {
          transform: 'translateY(0) translateZ(0)',
        });
        animateBg(
          bg.current,
          {
            transform: 'scaleY(0.8) translateZ(0)',
          },
          { duration: 0.2 }
        );
      }
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
      setCategoryGroupAdd(false);
      setCategoryColorsAtom(false);
    }
  }, [isOpen, categoryGroupAdd, cateColorsAtom]);

  const openHandler = () => {
    setIsOpen(true);
  };

  const closeHandler = () => {
    setIsOpen(false);
  };

  return (
    <InputWrapperContainer layout>
      <AnimatePresence>{isOpen && <Backdrop onClose={closeHandler} />}</AnimatePresence>
      <Form>
        <InputWrapper ref={wrapper} className="flex j-center">
          {!categoryGroupAdd && (
            <>
              <InputBg $bgColor={categoryGroupAdd ? 'var(--white)' : ''} ref={bg} />
              <InputArea onClick={openHandler} isExpand={isOpen}>
                {/* input */}
                {childrenList[0]}
              </InputArea>
              <div className="w-90 mt-2xl">
                {/* content */}
                {childrenList[1]}
                <ConfirmCancelButtons className="w-90" onClose={closeHandler} />
              </div>
            </>
          )}
          {categoryGroupAdd && (
            <>
              <InputBg $bgColor={categoryGroupAdd ? 'var(--white)' : ''} ref={bg} />
              <div className="w-90 border-box flex-column i-center">
                {childrenList[2]}
                {!cateColorsAtom && (
                  <AddGroupBtn
                    onClick={categoryGroupAddFinalButtonHandler}
                    className="text-md semi-bold"
                  >
                    + 그룹 추가하기
                  </AddGroupBtn>
                )}
              </div>
            </>
          )}
        </InputWrapper>
      </Form>
    </InputWrapperContainer>
  );
};

export default InputOverlay;
