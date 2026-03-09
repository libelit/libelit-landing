"use client";

import React, { useState } from "react";
import Button from "../UiComponents/Button/Button";
import { SubscribeFormPopup } from "../SubscribeForm";

function SubscribeButton({
  className,

  translate,
  onClick,
}: {
  className: string;
  translate: any;
  onClick?: any;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        hierarchy="accent"
        size="lg"
        text={translate.subscribe}
        className={className}
        onClick={() => {
          if (onClick) {
            onClick();
          }
          setIsOpen(true);
        }}
      />
      <SubscribeFormPopup
        translate={translate}
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
      />
    </>
  );
}

export default SubscribeButton;
