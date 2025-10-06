import React from "react";
import Button from "../Button/Button";


type ModalProps = {
  isOpen: boolean;
  title: string;
  underText?: string;
  acceptLabel?: string;
  declineLabel?: string;
  onAccept?: () => void;
  onDecline?: () => void;
  onClose?: () => void;
  children?: React.ReactNode;
  isLoading?:boolean
};

const PopOverModal: React.FC<ModalProps> = ({
  isOpen,
  title,
  underText,
  acceptLabel = "Accept",
  declineLabel = "Decline",
  onAccept,
  onClose,
  children,
  isLoading
}) => {
  if (!isOpen) return null;

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]"
      onClick={handleBackgroundClick}
    >
      <div className="bg-white flex flex-col items-center rounded-lg w-full max-w-xl p-4 gap-4 shadow-lg">
        <div className="flex items-center justify-end mb-2 w-full">
          <Button
            onClick={onClose}
            aria-label="Close"
            variant="secondary"
            className="h-8 w-8"
            disabled={isLoading}
          >
            &times;
          </Button>
        </div>

        <p className="text-lg font-semibold text-gray-900">{title}</p>
        {underText && (
          <p className="text-sm text-gray-500 mt-2 mb-4">{underText}</p>
        )}

        <div className="mb-4 w-[80%]">{children}</div>

        <div className="flex justify-center gap-2">
          <Button
            onClick={onClose}
            variant="secondary"
            disabled={isLoading}
          >
            {declineLabel}
          </Button>
          <Button
            disabled={isLoading}
            onClick={onAccept}
          >
            {isLoading?"loading....":acceptLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PopOverModal;
