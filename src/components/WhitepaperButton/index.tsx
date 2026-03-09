"use client";
import React, { useState } from "react";
import Whitepaper from "../Whitepaper";
import Button from "../UiComponents/Button/Button";

function WhitepaperButton({
  text,
  className,
  isButton = true,
}: {
  text: string;
  className: string;
  isButton?: Boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isButton ? (
        <Button
          hierarchy="secondary"
          size="lg"
          text={text}
          className={className}
          onClick={() => setIsOpen(true)}
        />
      ) : (
        <div className={className} onClick={() => setIsOpen(true)}>
          {text}
        </div>
      )}

      <Whitepaper isOpen={isOpen} closeModal={() => setIsOpen(false)} />
    </>
  );
}

export default WhitepaperButton;
