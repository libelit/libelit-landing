import { Locale } from "@/i18n.config";
import { getDictionary } from "@/library/dictionaries";
import React, { useEffect, useRef, useState } from "react";
import Modal from "../UiComponents/Modal";
import closeIcon from "@icons/general/x-close-black-lg.svg?url";
import Image from "next/image";
import axiosClient from "@/app/axiosClient";
import { AlertProvider, useAlert } from "@/contexts/AlertContext";

function Thankyou({ className }: { className?: string }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-16 h-[396px] ${className}`}
    >
      <div className="h2">Thank you</div>
      <div className="text-primary-700">
        You are now a subscriber of Libelit.
      </div>
    </div>
  );
}
function SubscribeForm({ translate }: any) {
  const { alert } = useAlert();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const submitForm = async () => {
    const response = await axiosClient.post("/beta/register", { email: email });
    if (response.status == 200 || response.status == 201) {
      if (response.data == "email already registered")
        alert("Email already registered.", "warning");

      if (response.data == "registered successfully")
        alert("Email registered successfully.", "success");

      setIsSubscribed(true);
    } else {
      alert("There was an error registering the email.", "error");
    }
  };
  return (
    <div className="w-full max-w-[1216px] m-auto bg-secondary-25 rounded-[14px]">
      <div className="items-center self-stretch flex w-full flex-col justify-center mt-4  p-6  md:p-8 lg:p-16 max-md:max-w-full gap-5">
        {isSubscribed ? (
          <Thankyou />
        ) : (
          <>
            <h2 className="self-stretch text-black text-center font-bold lg:text-[44px] lg:leading-[52px] md:text-3xl md:leading-[38px] text-2xl">
              {translate.are_you_interested}
            </h2>
            <p className="text-neutral-700 text-center lg:leading-[30px] md:text-lg md:leading-[26px] text-base mb-3">
              {translate.cta_text}
            </p>
            <div className="flex gap-16 md:flex-row flex-col form-field">
              <div className="flex flex-col gap-1.5 form-input-container">
                <input
                  type="email"
                  className="border border-[color:var(--Primary-200,#C2C2C2)] shadow-sm bg-white bg-opacity-20 justify-center px-3.5 py-3 rounded-lg border-solid h-11 "
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-neutral-500 text-sm leading-5">
                  We care about your data privacy. Check our
                  <span className="font-semibold"> Privacy Policy.</span>
                </p>
              </div>
              <div>
                <button
                  className="btn-accent grow md:w-auto w-full h-12"
                  onClick={() => submitForm()}
                >
                  {translate.subscribe}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function SubscribeFormPopup({ translate, isOpen, closeModal, onSubmit }: any) {
  const { alert } = useAlert();

  const modalRef = useRef<any>(null);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const submitForm = async () => {
    closeModal();
    const response = await axiosClient.post("/beta/register", { email: email });
    console.log(response.status);
    if (response.status == 200 || response.status == 201) {
      if (response.data == "email already registered")
        alert("Email already registered.", "warning");

      if (response.data == "registered successfully")
        alert("Email registered successfully.", "success");
      setIsSubscribed(true);
    } else {
      alert("There was an error registering the email.", "error");
    }
  };
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
      className="w-[95%] max-h-[calc(100vh-120px)] overflow-auto max-w-[1216px] p-0 !h-fit"
      disablePadding
    >
      <div className="w-full h-full p-6  md:p-8 lg:p-16  " ref={modalRef}>
        <div className="flex justify-end h-11 cursor-pointer">
          <Image src={closeIcon} onClick={closeModal} alt="close icon" />
        </div>
        {isSubscribed ? (
          <Thankyou className="!h-full" />
        ) : (
          <>
            <div className="w-full  m-auto bg-white">
              <div className="items-center self-stretch flex w-full flex-col justify-center  max-md:max-w-full  gap-5">
                <h2 className="self-stretch text-black text-center font-bold lg:text-[36px] lg:leading-[44px] md:text-3xl md:leading-[38px] text-2xl">
                  {translate.are_you_interested}
                </h2>
                <p className="text-neutral-700 text-center md:leading-[28px] md:text-lg md:leading-[26px] text-base mb-3">
                  {translate.cta_text}
                </p>
                <div className="flex gap-16 md:flex-row flex-col form-field">
                  <div className="flex flex-col gap-1.5">
                    <input
                      type="email"
                      className="border border-[color:var(--Primary-200,#C2C2C2)] shadow-sm bg-white bg-opacity-20 justify-center px-3.5 py-3 rounded-lg border-solid h-11"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <p className="text-neutral-500 text-sm leading-5">
                      We care about your data privacy. Check our
                      <span className="font-semibold"> Privacy Policy.</span>
                    </p>
                  </div>
                  <div>
                    <button
                      className="btn-accent grow md:w-auto w-full h-12"
                      onClick={() => submitForm()}
                    >
                      {translate.subscribe}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}

export { SubscribeForm, SubscribeFormPopup };
