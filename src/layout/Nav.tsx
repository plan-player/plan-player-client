import { AnimatePresence, motion } from 'framer-motion';
import React, { ReactNode } from 'react';
import { IconContext } from 'react-icons';
import { FaChartBar } from 'react-icons/fa';
import { FaClock, FaFolder } from 'react-icons/fa6';
import { RiPlayList2Fill } from 'react-icons/ri';
import { Outlet, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { hideNavAtom } from '../atoms/uiAtom';
import Setting, { SETTING_SIZE } from '../components/UI/nav/Setting';
import { AddCategory } from '../screens/CategoryGroup';
import RequireAuth from './RequireAuth';

type NavItemType = {
  path: string;
  icon: ReactNode;
};

const ACTIVE_COLOR = 'fill-white';
const DEFAULT_COLOR = 'fill-gray-500';
const SIZE = 'text-xl';

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

const OutletWrapper = styled.div`
  height: calc(100vh - ${SETTING_SIZE}rem - var(--nav-h));
`;

const NavWrapper = styled(motion.nav)`
  position: absolute;
  z-index: 100;
`;

const Nav: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const hideNav = useRecoilValue(hideNavAtom);

  const getClass = (path: string) => {
    const colorClass = currentPath.startsWith(path) ? ACTIVE_COLOR : DEFAULT_COLOR;
    const sizeClass = SIZE;
    return { className: [colorClass, sizeClass].join(' ') };
  };

  return (
    // <RequireAuth>
    <>
      <main>
        <Setting />
        <OutletWrapper>
          <Outlet />
        </OutletWrapper>
      </main>
      {currentPath.startsWith('/category') ? <AddCategory /> : null}
      {!hideNav && (
        <NavWrapper className="w-100 bg-primary flex i-center">
          <AnimatePresence>
            <motion.nav
              className="w-100 flex j-evenly i-center"
              initial={{ translateY: '100%' }}
              animate={{ translateY: 0 }}
              exit={{ translateY: '100%' }}
            >
              {NAV_DATA.map(({ path, icon }) => (
                <IconContext.Provider key={path} value={getClass(path)}>
                  <Link to={path}>{icon}</Link>
                </IconContext.Provider>
              ))}
            </motion.nav>
          </AnimatePresence>
        </NavWrapper>
      )}
      </>
    // </RequireAuth>
  );
};

export default Nav;
