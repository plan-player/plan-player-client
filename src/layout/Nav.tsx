import React, { ReactNode } from 'react';
import { IconContext } from 'react-icons';
import { FaChartBar } from 'react-icons/fa';
import { FaClock, FaFolder } from 'react-icons/fa6';
import { RiPlayList2Fill } from 'react-icons/ri';
import { Outlet, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
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

const Nav: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const getClass = (path: string) => {
    const colorClass = currentPath.startsWith(path) ? ACTIVE_COLOR : DEFAULT_COLOR;
    const sizeClass = SIZE;
    return { className: [colorClass, sizeClass].join(' ') };
  };

  return (
    <RequireAuth>
      <main>
        <Setting />
        <OutletWrapper >
          <Outlet />
        </OutletWrapper>
      </main>
      {currentPath.startsWith('/category') ? <AddCategory /> : null}
      <nav className="w-100 flex j-evenly i-center bg-primary">
        {NAV_DATA.map(({ path, icon }) => (
          <IconContext.Provider key={path} value={getClass(path)}>
            <Link to={path}>{icon}</Link>
          </IconContext.Provider>
        ))}
      </nav>
    </RequireAuth>
  );
};

export default Nav;
