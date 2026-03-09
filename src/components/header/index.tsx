import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import libelitLogo from "logos/libelit-logo.svg?url";
import { getDictionary } from "@/library/dictionaries";
import { Locale } from "@/i18n.config";
import Link from "next/link";
import HomeSidebar from "../UiComponents/Layouts/HomeSidebar";
import SubscribeButton from "../SubscribeButton";
import styles from "./styles.module.scss";
import DownArrowIcon from "@icons/arrows/Icon-1.svg";
import UpArrowIcon from "@icons/arrows/Icon-3.svg";
import Whitepaper from "../Whitepaper";
import WhitepaperButton from "../WhitepaperButton";

const Header = async ({ lang = "en" }: { lang: Locale }) => {
  const { translate } = await getDictionary(lang);

  return (
    <>
      <header className="max-w-[1447px] z-[2] w-full flex justify-between items-center gap-4 md:py-4 py-6 text-gray-600 font-inter-700 m-auto px-4 md:px-8 lg:px-[112px]">
        <a href={`/${lang}`}>
          <Image
            className="w-[105px] max-w-[105px]"
            src={libelitLogo}
            alt="Libelit"
          />
        </a>

        <div className="block lg:hidden">
          <HomeSidebar nav={translate} lang={lang} />
        </div>

        <nav className="hidden lg:flex items-center text-base justify-between">
          <div className="p-2 text-zinc-700 flex items-center justify-center">
            <button className="relative group transition-all duration-200 focus:overflow-visible w-max h-max p-2 overflow-hidden flex flex-row items-center justify-center  btn-link text-lg text-semiBold">
              <span>{translate.about_us}</span>
              <svg
                className="rotate-90 group-focus:rotate-180"
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
              <div className="absolute shadow-lg -bottom-32 left-0 w-full h-max p-2 bg-white border border-zinc-200 rounded-lg flex flex-col gap-2">
                <span
                  className="flex flex-row gap-2 items-center hover:bg-zinc-100 p-2 rounded-lg"
                  onClick={() => window.location.assign(`/${lang}/about`)}
                >
                  {translate.team}
                </span>
                <WhitepaperButton
                  text={translate.whitepaper}
                  isButton={false}
                  className="flex flex-row gap-2 items-center hover:bg-zinc-100 p-2 rounded-lg"
                />
              </div>
            </button>
          </div>
          <a
            className="btn-link text-lg text-semiBold"
            href={`/${lang}/roadmap`}
          >
            {translate.road_map}
          </a>
          <a className="btn-link text-lg text-semiBold" href={`/${lang}/faq`}>
            {translate.faq}
          </a>
          <a
            className="btn-link text-lg text-semiBold"
            href={`/${lang}/developers`}
          >
            {translate.for_developers}
          </a>

          <SubscribeButton className="ml-2" translate={translate} />
        </nav>
      </header>
    </>
  );
};

Header.defaultProps = { lang: "en" };

export default Header;
