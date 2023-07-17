import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import ContextButton from '../UI/button/ContextButton';
import PlayPauseButton from '../UI/button/PlayPauseButton';
import IconImageHolder from '../UI/general/IconImageHolder';
import MainSubTitle from '../UI/general/MainSubTitle';

export interface TodoListItemProps {
  id: string;
  cover?: string | ReactNode;
  category: string;
  title: string;
  time: string;
}

const TodoListItem = ({ cover, category, title, time }: TodoListItemProps) => {
  // TODO: DraggableItem 개발
  return (
    <li>
      <Link to="/player" className="flex i-center gap-sm">
        <PlayPauseButton />
        <div className="w-100 flex j-between">
          <div className="flex i-center gap-sm break-word">
            <IconImageHolder>{cover}</IconImageHolder>
            <MainSubTitle main={title} sub={category} />
          </div>
          <div className="flex">
            <span className="text-sm mx-md flex i-center shrink-0">{time}</span>
            <ContextButton />
          </div>
        </div>
      </Link>
    </li>
  );
};

export default TodoListItem;
