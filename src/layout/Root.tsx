import { useAnimate } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { slideMainAtom } from '../atoms/uiAtom';
import Setting, { SETTING_SIZE } from '../components/UI/nav/Setting';
import Player from '../screens/Player';
import Nav from './Nav';
import RequireAuth from './RequireAuth';

const Main = styled.main`
  position: absolute;
  right: 0;
  left: auto;
  width: 200vw;

  section {
    position: absolute;
    width: 100vw;
  }

  @media screen and (min-width: 960px) {
    width: 100vw;
    height: 70vh;
    max-width: 1280px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    section {
      width: 50%;
      height: 100%;
    }

    .left-section .nav {
      display: none;
    }
  }
`;

// NOTE: 상단 Setting 영역 제외
const ContentWrapperContainer = styled.div`
  height: calc(100vh - ${SETTING_SIZE}rem);

  @media screen and (min-width: 960px) {
    height: 70vh;
  }
`;

// NOTE: 하단 Nav 영역 제외
const ContentWrapper = styled.div`
  height: calc(100% - var(--nav-h));
  box-sizing: border-box;
  padding-bottom: 4vh;
`;

const Root: React.FC = () => {
  const [slideMain, setSlideMain] = useRecoilState(slideMainAtom);

  const [main, animate] = useAnimate();

  // NOTE: 스와이프 시 Player화면과 Outlet 전환
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const [showLeftNav, setShowLeftNav] = useState(false);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    if (e.targetTouches) {
      setTouchStart(e.targetTouches[0].clientX);
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.targetTouches) {
      setTouchEnd(e.targetTouches[0].clientX);
    }
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setSlideMain(false);
    } else if (isRightSwipe) {
      setSlideMain(true);
    }
  };

  // NOTE: Player 화면으로 슬라이드
  const slideHandler = async (isPlayer: boolean) => {
    if (window.innerWidth < 960) {
      if (isPlayer) {
        animate(main.current, { left: 0, right: 'unset' });
        setShowLeftNav(true);
      } else {
        await animate(main.current, { right: 0, left: 'unset' });
        setShowLeftNav(false);
      }
      // TODO: UI 전역변수로 플레이어 화면 슬라이드
    } else {
      animate(main.current, { right: 0, left: '50%' });
    }
  };

  useEffect(() => {
    slideHandler(slideMain);
    window.addEventListener('resize', slideHandler.bind(null, slideMain), false);
  }, [slideMain]);

  return (
    <RequireAuth>
      <Setting />
      <Main
        ref={main}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <section className="left-section left-0 hidden">
          <ContentWrapperContainer>
            <ContentWrapper className="scroll">
              <Player />
            </ContentWrapper>
          </ContentWrapperContainer>
          {showLeftNav && <Nav hideInput={true} isBright={true} disableActive={true} />}
        </section>
        <section className="right-section right-0 hidden">
          <ContentWrapperContainer>
            <ContentWrapper className="scroll">
              <Outlet />
            </ContentWrapper>
          </ContentWrapperContainer>
          <Nav />
        </section>
      </Main>
    </RequireAuth>
  );
};

export default Root;
