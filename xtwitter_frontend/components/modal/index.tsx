import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import CommonButton from "../button";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  children?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
}

export interface ModalBaseRef {
  show: (callback?: () => void) => void;
  hide: () => void;
}

const Modal = forwardRef(
  (
    {
      title,
      children,
      isOpen = false,
      onClose,
      actionLabel,
      footer,
      disabled,
    }: ModalProps,
    ref: React.Ref<ModalBaseRef>,
  ) => {
    const [open, setOpen] = useState(isOpen);

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
      onClose?.();
    };
    useImperativeHandle(ref, () => {
      return {
        show: handleOpen,
        hide: handleClose,
      };
    });

    return (
      <>
        <div
          className="
          fixed 
          inset-0 
          z-50 
          flex 
          items-center 
          justify-center 
          overflow-y-auto 
          overflow-x-hidden 
          bg-neutral-800 
          bg-opacity-70
          outline-none
          focus:outline-none
        "
        >
          <div className="relative mx-auto my-6 h-full w-full lg:h-auto lg:w-3/6 lg:max-w-3xl">
            {/*content*/}
            <div
              className="
            relative
            flex
            h-full 
            w-full 
            flex-col 
            rounded-lg 
            border-0 
            bg-black 
            shadow-lg 
            outline-none 
            focus:outline-none 
            lg:h-auto
            "
            >
              {/*header*/}
              <div
                className="
              flex 
              items-center 
              justify-between 
              rounded-t 
              p-10
              "
              >
                <h3 className="text-3xl font-semibold text-white">{title}</h3>
                <button
                  className="
                  ml-auto 
                  border-0
                  p-1 
                  text-white 
                  transition
                  hover:opacity-70
                "
                  onClick={handleClose}
                >
                  <AiOutlineClose size={20} />
                </button>
              </div>
              {/*body*/}
              <div className="relative flex-auto p-10">{children}</div>
            </div>
          </div>
        </div>
      </>
    );
  },
);

export default Modal;
