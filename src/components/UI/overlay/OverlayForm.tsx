import { PropsWithChildren } from 'react';
import { Form } from 'react-router-dom';
import Button from '../button/Button';
import Overlay, { OverlayProps } from './Overlay';

interface OverlayFormProps extends OverlayProps {
  onSubmit?: React.FormEventHandler<HTMLFormElement>
}

const OverlayForm = ({
  id,
  isOpen,
  onClose,
  onSubmit,
  isFlat,
  className,
  children,
}: PropsWithChildren<OverlayFormProps>) => {
  return (
    <Overlay id={id} isOpen={isOpen} onClose={onClose} isFlat={isFlat}>
      <Form className={className || ''} onSubmit={onSubmit}>
        {children}
        <div className="flex mt-lg">
          <Button styleClass="extra" className="w-50" onClick={onClose}>
            취소
          </Button>
          <Button type="submit" onClick={onClose}>
            완료
          </Button>
        </div>
      </Form>
    </Overlay>
  );
};

export default OverlayForm;
