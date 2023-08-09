import Button from './Button';

export interface ConfirmCancelButtonsProps {
  onClose?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  closeMsg?: string;
  confirmMsg?: string;
  className?: string;
  confirmClass?: string;
  cancelClass?: string;
  hideCancle?: boolean;
  isPending?: boolean;
  noMargin?: boolean;
}

function ConfirmCancelButtons({
  onClose,
  onConfirm,
  onCancel,
  closeMsg,
  confirmMsg,
  className,
  confirmClass,
  cancelClass,
  hideCancle,
  isPending,
  noMargin,
}: ConfirmCancelButtonsProps) {
  return (
    <div className={`flex ${noMargin ? '' : 'mt-lg'} ${className || ''}`}>
      {!hideCancle && (
        <Button
          styleClass="extra"
          className={`w-50 ${cancelClass || ''}`}
          onClick={() => {
            onCancel && onCancel();
            onClose && onClose();
          }}
        >
          {closeMsg || '취소'}
        </Button>
      )}
      <Button
        type="submit"
        className={confirmClass || ''}
        onClick={() => {
          onConfirm && onConfirm();
          onClose && onClose();
        }}
        isPending={isPending}
      >
        {confirmMsg || '완료'}
      </Button>
    </div>
  );
}

export default ConfirmCancelButtons;
