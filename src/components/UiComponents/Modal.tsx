"use client";
import { useEffect } from "react";
import ReactModal from "react-modal";

interface IModal {
  children?: any;
  isOpen: boolean;
  className?: string;
  onRequestClose?: any;
  disablePadding?: Boolean;
  reff?: any;
}
ReactModal.setAppElement("body");

const Modal = ({
  isOpen,
  className,
  onRequestClose,

  children,
  disablePadding,
  reff,
}: IModal) => {
  return (
    <ReactModal
      isOpen={isOpen}
      overlayClassName=" modal-overlay"
      className={`modal-content ${className} `}
      onRequestClose={onRequestClose}
    >
      <div
        className={` ${!disablePadding && "px-6 py-6"}  w-full h-full`}
        onClick={(e) => e.stopPropagation()}
        ref={reff}
      >
        {children}
      </div>
    </ReactModal>
  );
};

export default Modal;
