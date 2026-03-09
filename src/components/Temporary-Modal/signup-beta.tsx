import React, { useState } from 'react';
import Image from 'next/image';
import "../../../src/app/globals.scss";
import logo from "../../../public/logo/logo-libelit.svg";
import axiosClient from "../../app/axiosClient";
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import LibelitForm from "../UiComponents/Forms/LibelitForm";
import * as Yup from 'yup';
import Link from 'next/link';
import Modal from "./Modal";
import ThanksSignupBeta from "./thanks-signup-beta";

function SignupBeta() {


    const router = useRouter();

    const formData = {
        email: ""
    }

    const formInfo = {
        type: "loginform",
        formButtonText: "Register"
    }

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required')
    });

    const fields = [
        { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email' }
    ];

    const handleSubmit = async (values: any) => {
    }

    return (
        <>
                <div className="main-container">

                <div className="grid-container md-1-col">
                    <div className="grid-item flex-col flex-vertical-center full-height">
                        <div className="form-container">
                            <div className="form-header text-center">
                                <div className="logo">
                                    <Image src={logo} alt="Libelit Logo" />
                                </div>
                                <div className="form-text">Libelit Beta Program</div>
                                <div className="form-sub-text">Thank you for your interest in Libelit. Please sign up to get early access.</div>
                            </div>

                            <div className="form">
                                <LibelitForm
                                    initialValues={formData}
                                    onSubmit={handleSubmit}
                                    validationSchema={validationSchema}
                                    fields={fields}
                                    formInfo={formInfo}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid-item form-bg">
                        
                    </div>
                </div>
            </div>

        </>
    );
}

export default SignupBeta;
