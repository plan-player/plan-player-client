import { PropsWithChildren } from 'react';
import { Form, useNavigation } from 'react-router-dom';
import ConfirmCancelButtons from '../button/ConfirmCancelButtons';
import Overlay, { OverlayProps } from './Overlay';

interface OverlayFormProps extends OverlayProps {
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
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
  const navigation = useNavigation();

  return (
    <Overlay id={id} isOpen={isOpen} onClose={onClose} isFlat={isFlat}>
      <Form className={className || ''} onSubmit={onSubmit}>
        {children}
        <ConfirmCancelButtons
          onClose={onClose}
          isPending={navigation.state === 'submitting'}
        />
      </Form>
    </Overlay>
  );
};

export default OverlayForm;
