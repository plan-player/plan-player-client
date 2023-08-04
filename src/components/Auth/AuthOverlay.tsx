import { motion } from 'framer-motion';
import { PropsWithChildren, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Button from '../UI/button/Button';
import Overlay, { OverlayProps } from '../UI/overlay/Overlay';
import EmailForm from './EmailForm';
import SnsButtons from './SnsButtons';

interface ExtraButtonProps {
  onClick?: () => void;
}

const HeaderWrapper = styled(motion.div)`
  // NOTE: motion.div의 layout 설정으로 인한 왜곡 해결을 위해 width와 height를 고정된 값으로 부여함
  // NOTE: width - 오버레이의 padding이 2rem이므로, 좌우 여백 제외한 값으로 설정
  width: calc(100% - 4rem);
  height: 3.5rem;
`;

const ExtraButton = ({ onClick, children }: PropsWithChildren<ExtraButtonProps>) => {
  return (
    <Button styleClass="extra" sizeClass="md" onClick={onClick} className="keep-all">
      {children}
    </Button>
  );
};

const AuthOverlay = ({ id, isOpen, onClose }: OverlayProps) => {
  const [isSns, setIsSns] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [title, setTitle] = useState('시작하기');

  useEffect(() => {
    if (isLogin) {
      setIsSns(false);
    }
  }, [isLogin]);

  useEffect(() => {
    if (isSns) {
      setIsLogin(false);
    }
  }, [isSns]);

  useEffect(() => {
    if (isSns) {
      setTitle('시작하기');
    } else if (isLogin) {
      setTitle('로그인');
    } else {
      setTitle('회원가입');
    }
  }, [isLogin, isSns]);

  const toggleSns = () => {
    setIsSns((prev) => !prev);
  };

  const toggleLogin = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <Overlay id={id} isOpen={isOpen} className="max-vh-90 scroll" onClose={onClose}>
      <div className="flex-column gap-xl py-lg h-100">
        <div className="flex-column i-center gap-xs">
          <motion.img layout className="size-lg" src="/png/logo.png" alt="plot logo" />
          <HeaderWrapper layout="position" className="flex-column i-center j-center gap-sm">
            <h1>{title}</h1>
            {isSns && <p>SNS 계정으로 시작</p>}
          </HeaderWrapper>
        </div>
        <div>{isSns ? <SnsButtons /> : <EmailForm isLogin={isLogin} />}</div>
        <div className="w-80 mx-auto">
          <div className="flex j-between i-center gap-sm">
            <ExtraButton>{isLogin ? '로그인' : '가입'} 없이 둘러보기</ExtraButton>
            <motion.span layout>|</motion.span>
            <ExtraButton onClick={toggleSns}>
              {isSns ? '이메일' : 'SNS'}로 {isLogin ? '로그인' : '회원가입'}
            </ExtraButton>
          </div>
          <ExtraButton onClick={toggleLogin}>
            {isLogin ? '회원가입하기' : '로그인하기'}
          </ExtraButton>
        </div>
      </div>
    </Overlay>
  );
};

export default AuthOverlay;
