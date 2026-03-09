"use client";
import React from "react";
import Button from "../UiComponents/Button/Button";

interface SubscribeButtonProps {
  className?: string;
}

const SubscribeButton: React.FC<SubscribeButtonProps> = ({ className }) => {
  const handleClick = () => {
    console.log("clicked");
  };
  return (
    <>
      {/* component part of grid container */}
      <div className="grid-item">
        <Button
          text="Subscribe"
          onClick={() => handleClick()}
          className={className}
        />
      </div>
    </>
  );
};

export default SubscribeButton;
