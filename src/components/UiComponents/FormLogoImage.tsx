"use client"
import React from 'react';
import Image from "next/image";
import logo from "../../../public/logo/logo-libelit.svg?url";
import { useRouter } from 'next/router';



// import libelitLogo from "../../public/logo/libelit-logo.svg?url";

function FormImageLogo() {
    const router = useRouter();

    const handleClick = () => {
        // window.location.href = url;
        router.push("/");
    }

    return (
        <Image src={logo} alt="Libelit Logo" className="handcursor" onClick={handleClick}/>
    )
  }

export default FormImageLogo;

{/* <Image src={logo} alt="Libelit Logo" className="handcursor" onClick=handleClick/> */}
