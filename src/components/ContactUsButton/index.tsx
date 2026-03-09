"use client";
import React, { useState } from "react";
import Button from "../UiComponents/Button/Button";
import ContactForm from "../UiComponents/Forms/ContactForm";
function ContactUsButton({ text }: { text: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        hierarchy="secondary"
        size="lg"
        icon={"right"}
        iconName={"rightArrow"}
        text={text}
        className="color-primary-800"
        onClick={() => {
          setIsOpen(true);
        }}
      />
      <ContactForm isOpen={isOpen} closeModal={() => setIsOpen(false)} />
    </>
  );
}

export default ContactUsButton;
