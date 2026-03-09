import React, { useEffect, useRef } from "react";
import Modal from "../UiComponents/Modal";
import closeIcon from "@icons/general/x-close-black-lg.svg?url";
import Image from "next/image";
import Iframe from "react-iframe";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import fullScreenIcon from "/public/icons/general/fullscreen.svg?url";
function Whitepaper({ isOpen, closeModal }: any) {
  const handle = useFullScreenHandle();
  const modalRef = useRef<any>(null);

  const handleOutsideClick = (e: any) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      className="w-[95%]  md:w-[80%] lg:w-[60%] h-[calc(100vh-120px)] md:h-[calc(100vh-80px)] lg:h-[calc(100vh-20px)] overflow-auto max-w-[1216px] p-0 "
    >
      <div className="w-full h-full  pb-4 pt-0 px-6" ref={modalRef}>
        <div className="flex justify-end gap-6 h-11 ">
          <Image
            className="cursor-pointer"
            src={fullScreenIcon}
            onClick={() => handle.enter()}
            alt="fullscreen button"
          />
          <Image
            className="cursor-pointer "
            src={closeIcon}
            onClick={closeModal}
            alt="close icon"
          />
        </div>

        <FullScreen handle={handle} className="h-[calc(100%-2.75rem)]">
          <Iframe
            scrolling="no"
            allowFullScreen
            url="https://online.fliphtml5.com/fvhcu/lyim/index.html"
            className="iframe w-full h-full"
          ></Iframe>
        </FullScreen>
      </div>
    </Modal>
  );
}

export default Whitepaper;
