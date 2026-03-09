"use client";
import React from "react";
import Image from "next/image";
import circleIcon from "@icons/shapes/circle.svg?url";
import styles from "./styles.module.scss";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/library/dictionaries";
import Phases from "./Phases";
import { SubscribeForm } from "@/components/SubscribeForm";
import ContactForm from "@/components/UiComponents/Forms/ContactForm";

const phases = [
  [
    {
      heading: "April 2021 - June 2022",
      desc: "Research about the problem, public consultation in Australia and worldwide",
    },
    {
      heading: "July - August 2022",
      desc: "Market evaluation - worldwide competition review ",
    },
    {
      heading: "September - November 20222",
      desc: "Legal consultation",
    },
    {
      heading: "October 2022",
      desc: "Libelit Twitter account created",
    },
    {
      heading: "November 2022",
      desc: "Poland selected as a location for the first real estate project.Real estate development team created, including a landlord and an architect, design works commenced. ",
    },
    { heading: "January 2023", desc: "Start-up Team building" },
    {
      heading: "February 2023",
      desc: "Company Registration - Libelit Australia Pty Ltd",
    },
    {
      heading: "March 2023",
      desc: "Virtual Reality model of the first real estate project available online",
    },
    {
      heading: "April 2023",
      desc: "Libelit MVP development commence",
    },
    {
      heading: "May 2023",
      desc: "Company Registration in Poland – Libelit Polska Sp. Z o.o.",
    },
  ],
  [
    {
      heading: "September 2023",
      desc: "Presence at Token 2049 in Singapore ",
    },
    {
      heading: "November 2023",
      desc: "Presence at Australian Crypto Conference",
    },
    {
      heading: "January 2024",
      desc: "Libelit community building New social media accounts:\\n- Instagram\\n- Discord",
    },
    {
      heading: "April 2024",
      desc: "Presence at Token 2049 in Dubai and other events",
    },
    {
      heading: "October 2024",
      desc: "Advertising campaign start",
    },
    {
      heading: "March 2025",
      desc: "Seed round-VC funding",
    },
    {
      heading: "May  2025",
      desc: "Launch Libelit Token",
    },
    {
      heading: "May 2024",
      desc: "Launch Libelit Token",
    },
    {
      heading: "July 2025",
      desc: "Launch NFT Collection",
    },
  ],
  [
    {
      heading: "April 2024",
      desc: "MVP testing started",
    },
    {
      heading: "November 2024",
      desc: "Beta version of Libelit MVP platform launch First Real Estate Development project available for investors",
    },
    {
      heading: "April 2025",
      desc: "Implement new features in the platform based on users feedback, including:\\n- Feed page\\n- Upgraded users profiles",
    },
    {
      heading: "May 2025",
      desc: "Launch new real estate development projects internationally: USA or Italy, or other locations",
    },
    {
      heading: "August 2025",
      desc: "Implement NFT Holders premium features",
    },
    {
      heading: "October 2025",
      desc: "Implement Fiat Payments - depending on users feedback",
    },

    {
      heading: "November 2025",
      desc: "Launch more real estate development projects internationally: Asia and Indonesian.",
    },
  ],
];

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { translate } = await getDictionary(lang);

  return (
    <div className="w-full  m-auto px-[16px]  md:px-[32px] lg:px-[112px]  ">
      <div className="m-auto max-w-[1223px] pt-12 pb-6 flex flex-col gap-20 md:pt-16 md:pb-6 md:gap-20 lg:p-112 lg:flex-row items-stretch ">
        {/*  first page section */}
        <div className="flex flex-col gap-8 max-w-[568px] relative ">
          {/* page info section */}
          <div className="flex flex-col gap-8 lg:gap-4 ">
            <div className="color-accent-500 text-base font-semibold">
              Libelit.com
            </div>
            <div className="font-bold text-4xl md:text-[2.75rem] leading-[2.75rem] md:leading-[3.25rem] lg:text-[3.5rem] lg:leading-[4.5rem] font-bold">
              {translate.road_map}
            </div>
          </div>
          <div className="hidden lg:block text-base color-black font-regular grow-1 text-black">
            {translate.roadmap_description}
          </div>
          {/* lg connector */}
          <div className="hidden lg:block absolute -bottom-[2.2rem] left-[1.45rem] border-accent-500 border-t-2 w-[calc(100%+5rem+1.4rem-1.3rem)] border-l-2 h-[2.2rem]"></div>
        </div>
        {/* # end of page info section */}
        <div className={`flex flex-col gap-2  relative`}>
          {/* first roadmap section */}
          <Phases phases={phases[0]} />
          {/* md connector */}
          <div className="hidden md:block lg:hidden absolute -bottom-[3rem] left-[1.45rem] border-accent-500 border-t-2 w-[calc(50%+1.5rem)] border-l-2 border-r-2 h-[3rem]"></div>
        </div>
        {/* # end of first roadmap section */}
      </div>

      {/* # end of first page section */}

      {/* second page section */}

      <div className="m-auto max-w-[1223px] pt-6 pb-12 flex flex-col gap-8 md:pt-6 md:pb-16 md:gap-8 lg:p-112 lg:pt-6 lg:gap-20 md:flex-row items-stretch relative justify-between">
        <div className={`${styles.secondSection} basis-[50%]`}>
          {/* marketing roadmap */}
          <div className="mb-8 text-black text-lg font-bold capitalize lg:uppercase">
            {translate.marketing}
          </div>
          <div className="flex flex-col gap-2">
            <Phases phases={phases[1]} />
          </div>
        </div>
        {/* # end of marketing roadmap */}

        <div className={`${styles.secondSection} basis-[50%]`}>
          {/* platform development roadmap */}
          <div className="mb-8 text-black text-lg font-bold capitalize lg:uppercase">
            {translate.platform_development}
          </div>
          <div className="flex flex-col gap-2">
            <Phases phases={phases[2]} />
          </div>
        </div>

        {/* # end of platform development roadmap  */}
      </div>
      <div className="mb-12 md:mb-16 lg:mb-24 ">
        <SubscribeForm translate={translate} />
      </div>
      {/* # end of second page section */}
    </div>
  );
}
