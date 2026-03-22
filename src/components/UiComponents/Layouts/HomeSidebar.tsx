"use client";

import React, { useEffect, useRef, useState } from "react";
import MenuIcon from "@icons/general/menu-collapsed.svg";
import collapsedMenuIcon from "@icons/general/menu-collapsed.svg?url";
import Image from "next/image";
import ArrowRightIcon from "@icons/arrows/caret-right.svg";
import Link from "next/link";
import Whitepaper from "@/components/Whitepaper";
import Button from "../Button/Button";
import SubscribeButton from "@/components/SubscribeButton";

function HomeSidebar({ nav, lang }: any) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<any>(false);
  const sidebarRef = useRef<any>(null);
  const [isWhitepaperOpen, setIsWhitepaperOpen] = useState(false);
  const [isAboutUsExpand, setIsAboutUsExpand] = useState(false);
  const handleOutsideClick = (e: any) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    let isSmall = window.innerWidth <= 1280;

    if (isSmall) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div
        ref={sidebarRef}
        className={`h-screen transition-all duration-300 ease-in-out  ${
          isSidebarOpen ? "side-bar-open--right !w-[272px]" : "side-bar-close"
        } `}
      >
        <div
          className="flex-item bg-circle circle-btn-collapse--right border-0 "
          onClick={() => {
            setIsSidebarOpen(false);
          }}
        >
          <ArrowRightIcon className="icon-white" />
        </div>

        <div className=" flex-col items-center gap-16 px-2">
          <div className="flex-col items-center gap-8">

             <a
              className="btn-link text-lg text-semiBold px-3 py-[1.625rem]"
              onClick={() => {
                setIsSidebarOpen(false);
              }}
              href={`/${lang}/FAQ`}
            >
              {nav.FAQ}
            </a>
            
            <a
              className="btn-link text-lg text-semiBold px-3 py-[1.625rem]"
              onClick={() => {
                setIsSidebarOpen(false);
              }}
              href={`/${lang}`}
            >
              {nav.road_map}
            </a>

            <a
              className="btn-link text-lg text-semiBold px-3 py-[1.625rem]"
              onClick={() => {
                setIsSidebarOpen(false);
              }}
              href={`/${lang}/developers`}
            >
              {nav.for_developers}
            </a>
          </div>

          <div className=" px-6 w-full">
            <SubscribeButton
              translate={nav}
              className="w-full"
              onClick={() => setIsSidebarOpen(false)}
            />
          </div>
        </div>
      </div>

      <div>
        {!isSidebarOpen && (
          <div
            onClick={() => {
              setIsSidebarOpen(true);
            }}
          >
            <MenuIcon className="cursor-pointer" />
          </div>
        )}
      </div>
      <Whitepaper
        isOpen={isWhitepaperOpen}
        closeModal={() => setIsWhitepaperOpen(false)}
      />
    </>
  );
}

export default HomeSidebar;
