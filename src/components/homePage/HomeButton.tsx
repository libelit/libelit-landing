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
      {/* component part of grid container */}
      <div className="grid-item">
        {/* <Button text="Launch demo app" onClick={() => handleClick('launch')} className="btn home-btn  btn-outlined text-lg" /> */}
      </div>
      <div className="grid-item">
        {/* <Button text="Log in" onClick={() => handleClick('/user/login')} className="btn home-btn text-lg btn-contained sm-mt-12" /> */}
        <Button
          text="Register for Beta"
          onClick={() => handleClick("/user/beta-registration")}
          className="btn home-btn text-lg btn-contained sm-mt-12 mw-180 handcursor"
        />
      </div>
    </>
  );
};

export default HomeButton;
