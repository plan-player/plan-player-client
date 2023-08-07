import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useState } from 'react';
import { FaChartBar } from 'react-icons/fa';
import { FaClock, FaFolder } from 'react-icons/fa6';
import { RiPlayList2Fill } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { showInputAtom, slideMainAtom } from '../atoms/uiAtom';
import TodoInputOverlay from '../components/Todo/TodoInputOverlay';

const ACTIVE_CLASS = 'active-nav-item';

type NavItemType = {
  path: string;
  icon: ReactNode;
};

const NAV_DATA: NavItemType[] = [
  {
    path: '/playlist',
    icon: <RiPlayList2Fill />,
  },
  {
    path: '/schedule',
    icon: <FaClock />,
  },
  {
    path: '/category',
    icon: <FaFolder />,
  },
  {
    path: '/statistics',
    icon: <FaChartBar />,
  },
];

const NavWrapper = styled(motion.div)`
  position: absolute;
  bottom: 0;
  z-index: 100;

  svg {
    fill: var(--gray-500);
    font-size: var(--text-xl);
  }

  a.${ACTIVE_CLASS} svg {
    fill: var(--white);
  }

  .nav-bright svg {
    fill: var(--gray-100);
    font-size: var(--text-lg);
  }

  .nav-bright a.${ACTIVE_CLASS} svg {
    fill: var(--primary);
  }

  @media screen and (min-width: 960px) {
    background-color: var(--white);

    svg {
      fill: var(--gray-100);
      font-size: var(--text-lg);
    }

    a.${ACTIVE_CLASS} svg {
      fill: var(--primary);
    }

    a::after {
      content: '';
      display: block;
      margin: 0 auto;
      margin-top: 0.25rem;
      width: 0.25rem;
      height: 0.25rem;
      background-color: transparent;
      border-radius: 50%;
    }

    a.active-nav::after {
      background-color: var(--primary);
    }
  }
`;

const Nav = ({
  hideInput,
  isBright,
  disableActive,
}: {
  hideInput?: boolean;
  isBright?: boolean;
  disableActive?: boolean;
}) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const setSlideMain = useSetRecoilState(slideMainAtom);
  const showInput = useRecoilValue(showInputAtom);

  const [hideNav, setHideNav] = useState(false);
  const [openInput, setOpenInput] = useState(false);

  const getActiveClass = (path: string) => {
    return !disableActive && currentPath.startsWith(path) ? ACTIVE_CLASS : '';
  };

  return (
    <div>
      {/* TODO: 추후 전역 UI 상태로 관리? */}
      {!hideInput && showInput &&
        (currentPath.startsWith('/playlist') || currentPath.startsWith('/schedule')) && (
          <TodoInputOverlay
            isOpen={openInput}
            setIsOpen={setOpenInput}
            setHideNav={setHideNav}
          />
        )}
      {!hideNav && (
        <NavWrapper className={`nav w-100 flex i-center ${isBright ? '' : 'bg-primary'} `}>
          <AnimatePresence>
            {!hideNav && (
              <motion.nav
                className={`w-100 flex j-evenly i-center ${isBright ? 'nav-bright' : ''}`}
                initial={{ translateY: '100%' }}
                animate={{ translateY: 0 }}
                exit={{ translateY: '100%' }}
              >
                {NAV_DATA.map(({ path, icon }) => (
                  <Link
                    key={path}
                    className={getActiveClass(path)}
                    to={path}
                    onClick={() => {
                      setSlideMain(false);
                    }}
                  >
                    {icon}
                  </Link>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>
        </NavWrapper>
      )}
    </div>
  );
};

export default Nav;
