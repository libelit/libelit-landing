"use client";
import React from "react";
import Button from "../UiComponents/Button/Button";
import { router } from "../../../router";

const HomeButton = () => {
  const handleClick = (url: string) => {
    window.location.href = url;
  };
  return (
    <>
      <div className="grid-item">
        <Button
          text="Home"
          onClick={() => handleClick("/")}
          className="btn home-btn text-lg btn-contained sm-mt-12 mw-120 handcursor"
        />
      </div>
    </>
  );
};

export default HomeButton;
