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
            <div
              className={` group flex-col  items-center gap-8 overflow-hidden h-12 ${
                isAboutUsExpand && "overflow-visible"
              } ${isAboutUsExpand && "hover:h-max"} `}
              tabIndex={0}
            >
              <div
                className="btn-link   px-3 py-[1.625rem] cursor-pointer flex gap-8 items-center"
                onClick={() => setIsAboutUsExpand((value) => !value)}
              >
                <span className=" text-lg text-semiBold ">{nav.about_us}</span>
                <svg
                  className={`rotate-90 ${
                    isAboutUsExpand && "group-hover:rotate-180"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m12 10.8l-3.9 3.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.6-4.6q.3-.3.7-.3t.7.3l4.6 4.6q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275z"
                  />
                </svg>
              </div>

              <Link
                onClick={() => {
                  setIsSidebarOpen(false);
                }}
                className="btn-link text-lg text-semiBold px-3 py-[1.625rem]"
                href={`/${lang}/about`}
              >
                {nav.team}
              </Link>
              <span
                className="btn-link text-lg text-semiBold px-3 py-[1.625rem] cursor-pointer"
                onClick={() => {
                  setIsWhitepaperOpen(true);
                  setIsSidebarOpen(false);
                }}
              >
                {nav.whitepaper}
              </span>
            </div>
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
