import { PropsWithChildren } from 'react';
import { DragDropContext, Droppable, OnDragEndResponder } from 'react-beautiful-dnd';
import { SetterOrUpdater } from 'recoil';

interface DraggableListProps<T> {
  id: string;
  className?: string;
  list: T[];
  setList: (list: T[]) => void | SetterOrUpdater<T[]>;
  onDragEnd?: (list: T[]) => void;
}

const DraggableList = <T,>({
  id,
  className,
  children,
  list,
  setList,
  onDragEnd,
}: PropsWithChildren<DraggableListProps<T>>) => {
  const sortHandler: OnDragEndResponder = (result) => {
    if (!result.destination) return;
    const items = [...list];

    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setList(items);

    try {
      onDragEnd && onDragEnd(items);
    } catch (error) {
      setList(list);
      throw new Error('An error occurred in draggable list');
    }
  };

  return (
    <DragDropContext onDragEnd={sortHandler}>
      <Droppable droppableId={id}>
        {(provided) => (
          <ul
            ref={provided.innerRef}
            className={`${id} ${className || ''}`}
            {...provided.droppableProps}
          >
            {children}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableList;
