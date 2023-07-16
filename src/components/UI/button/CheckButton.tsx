import { useState } from 'react';
import { FaCheck } from 'react-icons/fa6';

interface CheckButtonProps {
  id: string;
  onChecked?: () => void;
  onUnChecked?: () => void;
  defaultChecked?: boolean;
}

const CheckButton = ({
  id,
  onChecked,
  onUnChecked,
  defaultChecked,
}: CheckButtonProps) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const checkHandler = () => {
    setIsChecked((prevChecked) => {
      if (prevChecked) {
        onUnChecked && onUnChecked();
        return false;
      } else {
        onChecked && onChecked();
        return true;
      }
    });
  };
  return (
    <div>
      <label
        htmlFor={id}
        className={`flex-center circle size-md ${isChecked ? 'bg-primary' : 'bg-light'}`}
      >
        <FaCheck className={`fill-white`} />
      </label>
      <input
        id={id}
        type="checkbox"
        className="hide"
        onChange={checkHandler}
        checked={isChecked}
      />
    </div>
  );
};

export default CheckButton;
