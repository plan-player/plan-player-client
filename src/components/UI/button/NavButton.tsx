import { FaStepBackward, FaStepForward } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface NavButtonProps {
  to?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isNext?: boolean;
}

const NavButton = ({ to, onClick, isNext }: NavButtonProps) => {
  const icon = isNext ? <FaStepForward /> : <FaStepBackward />;
  if (onClick) {
    return <button onClick={onClick}>{icon}</button>;
  } else if (to) {
    return <Link to={to}>{icon}</Link>;
  } else {
    return <div>{icon}</div>;
  }
};

export default NavButton;
