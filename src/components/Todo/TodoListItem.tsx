import { ReactNode } from 'react';
import ContextButton from '../UI/button/ContextButton';
import PlayPauseButton from '../UI/button/PlayPauseButton';
import IconImageHolder from '../UI/general/IconImageHolder';
import MainSubTitle from '../UI/general/MainSubTitle';

export interface TodoListItemProps {
  cover?: string | ReactNode;
  category: string;
  title: string;
  time: string;
}

const TodoListItem = ({ cover, category, title, time }: TodoListItemProps) => {
  // TODO: DraggableItem 개발
  return (
    <li className="flex gap-sm items-center">
      <PlayPauseButton />
      <div className="flex justify-between w-100">
        <div className="flex gap-sm items-center break-word">
          <IconImageHolder>{cover}</IconImageHolder>
          <MainSubTitle main={title} sub={category} />
        </div>
        <div className="flex">
          <span className="flex-center text-sm mx-md">{time}</span>
          <ContextButton />
        </div>
      </div>
    </li>
  );
};

export default TodoListItem;
