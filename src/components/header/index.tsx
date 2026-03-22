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

          </a>
          <a className="btn-link text-lg text-semiBold" href={`/${lang}/about`}>
            {translate.faq}
          </a>
        
          <a
            className="btn-link text-lg text-semiBold"
            href={`/${lang}`}
          >
            {translate.road_map}
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
