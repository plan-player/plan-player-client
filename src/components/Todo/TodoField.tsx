import { PropsWithChildren } from 'react';
import InputField from '../UI/input/InputField';

const Field = ({ row, children }: PropsWithChildren<{ row: number }>) => {
  return (
    <InputField isInnerLabel={true}>
      <label>{children}</label>
      <textarea className="w-100 h-100 text-md medium" rows={row} />
    </InputField>
  );
};

const TodoField = () => {
  return (
    <div className="w-80 mx-auto flex-column gap-md">
      <Field row={1}>부제목</Field>
      <Field row={4}>메모</Field>
    </div>
  );
};

export default TodoField;
