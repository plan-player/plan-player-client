import { PropsWithChildren, useEffect, useState } from 'react';
import Button from '../UI/button/Button';
import Overlay, { OverlayProps } from '../UI/overlay/Overlay';
import EmailForm from './EmailForm';
import SnsButtons from './SnsButtons';

interface ExtraButtonProps {
  onClick?: () => void;
}

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
          <img className="size-lg" src="/png/logo.png" alt="plot logo" />
          <div className="flex-column i-center gap-sm mb-md">
            <h1>{isSns ? '시작하기' : isLogin ? '로그인' : '회원가입'}</h1>
            {isSns && <p>SNS 계정으로 시작</p>}
          </div>
        </div>
        <div>{isSns ? <SnsButtons /> : <EmailForm isLogin={isLogin} />}</div>
        <div className="w-80 mx-auto p-lg">
          <div className="flex j-between i-center gap-sm">
            <ExtraButton>{isLogin ? '로그인' : '가입'} 없이 둘러보기</ExtraButton>
            {'|'}
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
