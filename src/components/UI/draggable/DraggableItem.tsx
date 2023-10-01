import { PropsWithChildren } from 'react';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import styled from 'styled-components';

interface DraggableItemProps {
  id: string;
  idx: number;
  className?: string;
}

interface WrapperProps {
  $isDragging: boolean;
}

const Handle = styled.div``;
const DraggableLi = styled.li<WrapperProps>`
  ${({ $isDragging }: WrapperProps) => {
    return $isDragging
      ? `
        background-color: #fff;
        padding: 0.75rem;
        border-radius: 0.75rem;
        box-shadow: 0px 4px 60px rgb(99 99 99 / 20%);
      `
      : '';
  }}
`;
const ChildrenWrapper = styled.div``;

const DraggableItem = ({
  id,
  idx,
  className,
  children,
}: PropsWithChildren<DraggableItemProps>) => {
  return (
    <Draggable draggableId={id} key={id} index={idx}>
      {(provided, snapshot) => {
        const lockedProvided = lockXAxis(provided);
        return (
          <DraggableLi
            key={idx}
            {...lockedProvided.draggableProps}
            ref={lockedProvided.innerRef}
            $isDragging={snapshot.isDragging}
            className={`flex gap-md i-center ${className || ''}`}
          >
            <Handle {...provided.dragHandleProps}>=</Handle>
            <ChildrenWrapper className="w-100">{children}</ChildrenWrapper>
          </DraggableLi>
        );
      }}
    </Draggable>
  );
};

export const lockXAxis = (provided: DraggableProvided) => {
  const transform = provided.draggableProps.style!.transform;
  if (transform) {
    const t = transform.split(',')[1];
    provided.draggableProps.style!.transform = 'translate(0px, ' + t;
  }
  return provided;
};

export default DraggableItem;
