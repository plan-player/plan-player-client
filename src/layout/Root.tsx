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
  }
`;

// NOTE: 상단 Setting 영역 제외
const OutletWrapperContainer = styled.div`
  height: calc(100vh - ${SETTING_SIZE}rem);

  @media screen and (min-width: 960px) {
    height: 70vh;
  }
`;

// NOTE: 하단 Nav 영역 제외
const OutletWrapper = styled.div`
  height: calc(100% - var(--nav-h));
`;

const Root: React.FC = () => {
  const [slideMain, setSlideMain] = useRecoilState(slideMainAtom);

  const [main, animate] = useAnimate();

  // NOTE: 스와이프 시 Player화면과 Outlet 전환
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

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
  const slideHandler = () => {
    if (window.innerWidth < 960) {
      if (slideMain) {
        animate(main.current, { left: 0, right: 'unset' });
      } else {
        animate(main.current, { right: 0, left: 'unset' });
      }
      // TODO: UI 전역변수로 플레이어 화면 슬라이드
    } else {
      animate(main.current, { right: 0, left: '50%' });
    }
  };

  useEffect(() => {
    window.addEventListener('resize', slideHandler, false);
  }, []);

  useEffect(() => {
    slideHandler();
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
        <section className="left-0">
          <Player />
        </section>
        <section className="right-0">
          <OutletWrapperContainer>
            <OutletWrapper>
              <Outlet />
            </OutletWrapper>
          </OutletWrapperContainer>
          <Nav />
        </section>
      </Main>
    </RequireAuth>
  );
};

export default Root;
