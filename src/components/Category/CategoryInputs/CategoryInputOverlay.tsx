import InputOverlay, { InputOverlayProps } from '../../UI/overlay/InputOverlay';
import CategoryField from './CategoryField';
import CategoryInput from './CategoryInput';
import Backdrop from '../../UI/overlay/Backdrop';
import { useEffect, useState } from 'react';
import CategoryAddGroups from './CategoryAddGroups';
import { useAnimate } from 'framer-motion';
import CategoryAddGroupColor from './CategoryAddGroupColor';

const CategoryInputOverlay = ({ isOpen, setIsOpen, setHideNav }: InputOverlayProps) => {
  const [onGroups, setOnGroups] = useState(false);
  const [onColors, setOnColors] = useState(false);

  const onAddGroups = () => {
    setHideNav(true);
    setOnGroups(true);
  };

  const onAddColors = () => {
    setOnColors(true);
  };

  const closeHandler = () => {
    setIsOpen(false);
    setOnGroups(false);
    setOnColors(false);
  };

  const [wrapper, setWrapper] = useAnimate();
  const [groups, setGroups] = useAnimate();
  const [colors, setColors] = useAnimate();

  useEffect(() => {
    if (onGroups) {
      setGroups(groups.current, {
        display: 'flex',
        opacity: 1,
      });
      setWrapper(wrapper.current, {
        opacity: 0.8,
      });
    }

    if (onGroups && onColors) {
      setGroups(groups.current, {
        opacity: 0.8,
      });
      setColors(colors.current, {
        display: 'flex',
      });
    } else if (!onGroups && !onColors) {
      setGroups(groups.current, {
        display: 'none',
      });
      setColors(colors.current, {
        display: 'none',
      });
      setWrapper(wrapper.current, {
        opacity: 1,
      });
    }
  }, [onGroups, onColors]);

  return (
    <>
      <div ref={wrapper}>
        <InputOverlay isOpen={isOpen} setIsOpen={setIsOpen} setHideNav={setHideNav}>
          <CategoryInput />
          <CategoryField onClick={onAddGroups} />
        </InputOverlay>
      </div>

      <div className="hide" ref={groups}>
        <CategoryAddGroups onClick={onAddColors} />
        <Backdrop onClose={closeHandler} />
      </div>

      <div className="hide" ref={colors}>
        <CategoryAddGroupColor />
        <Backdrop onClose={closeHandler} />
      </div>
    </>
  );
};

export default CategoryInputOverlay;
