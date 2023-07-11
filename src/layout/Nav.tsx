import { Outlet } from "react-router";

const Nav = () => {
  return <>
    <Outlet />
    <nav>Nav</nav>
  </>;
};

export default Nav;
