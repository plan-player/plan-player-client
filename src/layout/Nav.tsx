import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useState } from 'react';
import { IconContext } from 'react-icons';
import { FaChartBar } from 'react-icons/fa';
import { FaClock, FaFolder } from 'react-icons/fa6';
import { RiPlayList2Fill } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import TodoInputOverlay from '../components/Todo/TodoInputOverlay';

const ACTIVE_COLOR = 'fill-white';
const DEFAULT_COLOR = 'fill-gray-500';
const SIZE = 'text-xl';

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

  @media screen and (min-width: 960px) {
    background-color: var(--white);

    svg {
      fill: var(--gray-100);
      font-size: var(--text-lg);
    }

    svg.${ACTIVE_COLOR} {
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

const Nav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const [hideNav, setHideNav] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const getClass = (path: string) => {
    const colorClass = currentPath.startsWith(path) ? ACTIVE_COLOR : DEFAULT_COLOR;
    const sizeClass = SIZE;
    return { className: [colorClass, sizeClass].join(' ') };
  };

  const getActiveClass = (path: string) => {
    return currentPath.startsWith(path) ? 'active-nav' : '';
  };

  return (
    <div>
      {/* TODO: 추후 전역 UI 상태로 관리? */}
      {(currentPath.startsWith('/playlist') || currentPath.startsWith('/schedule')) && (
        <TodoInputOverlay
          isOpen={showInput}
          setIsOpen={setShowInput}
          setHideNav={setHideNav}
        />
      )}
      {!hideNav && (
        <NavWrapper className="w-100 bg-primary flex i-center">
          <AnimatePresence>
            {!hideNav && (
              <motion.nav
                className="w-100 flex j-evenly i-center"
                initial={{ translateY: '100%' }}
                animate={{ translateY: 0 }}
                exit={{ translateY: '100%' }}
              >
                {NAV_DATA.map(({ path, icon }) => (
                  <IconContext.Provider key={path} value={getClass(path)}>
                    <Link className={getActiveClass(path)} to={path}>
                      {icon}
                    </Link>
                  </IconContext.Provider>
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
