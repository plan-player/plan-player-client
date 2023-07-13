import { ReactNode } from 'react';
import { styled } from 'styled-components';
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

const DataWrapper = styled.div`
  word-break: break-word;
`;

const TodoListItem = ({ cover, category, title, time }: TodoListItemProps) => {
  // TODO: DraggableItem 개발
  return (
    <li className="flex gap-sm items-center">
      <PlayPauseButton />
      <div className="flex justify-between w-100">
        <DataWrapper className="flex gap-sm items-center">
          <IconImageHolder>{cover}</IconImageHolder>
          <MainSubTitle main={title} sub={category} />
        </DataWrapper>
        <div className="flex gap-md">
          <span className="flex-center text-sm">{time}</span>
          <ContextButton />
        </div>
      </div>
    </li>
  );
};

export default TodoListItem;
