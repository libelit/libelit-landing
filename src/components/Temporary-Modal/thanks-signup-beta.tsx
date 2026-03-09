"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import logo from "../../../public/logo/logo-libelit.svg?url";



function ThanksSignupBeta(props : any)  {

    let showText;
        if (props.registrationStatus === "success"){
            showText = "Thank you for signing up. We will notify you when the Beta version is available."
        } else if (props.registrationStatus === "already registered"){
            showText = "You have already signed up."
        } else if (props.registrationStatus === "failed"){
            showText = "Registration failed. Please try again later."
        } 

    return (
        <>
            <div className="main-container" style={{height: 'auto'}}>
                <div className="md-1-col" style={{padding: '20px'}}>
                    <div className="grid-item flex-col flex-vertical-center ">
                        <div className="form-containers">
                            <div className="form-header text-center">
                                <div className="logo">
                                    <Image src={logo} alt="Libelit Logo" />
                                </div>
                                <div className="form-text">Thank you</div>
                                <div className="form-sub-text">
                                    {showText}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default ThanksSignupBeta;