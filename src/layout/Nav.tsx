import { Outlet, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  PlaylistIcon,
  PlaylistIcon_Dark,
  ScheduleIcon,
  ScheduleIcon_Dark,
  CategoryIcon,
  CategoryIcon_Dark,
  StatisticsIcon,
  StatisticsIcon_Dark,
} from '../svg/svg';
import { ReactNode } from 'react';
import React from 'react';

const NavWrapper = styled.div`
  background-color: #313338;
  display: flex;
  width: 100vw;
  height: 5.875rem;
  postion: fixed;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

type IconP = {
  path: string;
  icon: ReactNode;
  darkIcon: ReactNode;
};

const icons = [
  { path: '/playlist', icon: <PlaylistIcon />, darkIcon: <PlaylistIcon_Dark /> },
  { path: '/schedule', icon: <ScheduleIcon />, darkIcon: <ScheduleIcon_Dark /> },
  { path: '/category', icon: <CategoryIcon />, darkIcon: <CategoryIcon_Dark /> },
  { path: '/statistics', icon: <StatisticsIcon />, darkIcon: <StatisticsIcon_Dark /> },
];

const Nav: React.FC = () => {
  const location = useLocation(),
    nowPath = location.pathname;

  const renderIcon = ({ path, icon, darkIcon }: IconP) => {
    return nowPath.startsWith(path) ? icon : <Link to={path}>{darkIcon}</Link>;
  };

  return (
    <>
      <main className="wrapper">
        <Outlet />
      </main>

      <NavWrapper>
        {icons.map(({ path, icon, darkIcon }) => (
          <React.Fragment key={path}>
            {renderIcon({ path, icon, darkIcon })}
          </React.Fragment>
        ))}
      </NavWrapper>
    </>
  );
};

export default Nav;
