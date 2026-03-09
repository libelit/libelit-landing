"use client";
import Button from "@/components/UiComponents/Button/Button";
import React, { useEffect, useState } from "react";
import sunIcon from "@icons/shapes/Icon-5.svg?url";
import financeWalletIcon from "@icons/finance/wallet.svg?url";
import piggyBankIcon from "@icons/finance/piggy-bank.svg?url";
import homeIcon from "@icons/general/home.svg?url";
import routeIcon from "@icons/general/route.svg?url";
import arrowUpIcon from "@icons/arrows/Icon-3.svg?url";
import planeIcon from "@icons/general/Icon-26.svg?url";

import arrowDownIcon from "@icons/arrows/Icon-1.svg?url";
import downloadIcon from "@icons/arrows/Icon-4.svg?url";
import fileAttachmentIcon from "@icons/shapes/file-attachment.svg?url";
import scales from "@icons/shapes/scales.svg?url";

import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/library/dictionaries";
import Roadmap from "./Roadmap";
import userIcon from "@icons/shapes/user.svg?url";
import bookIcon from "@icons/shapes/book.svg?url";
import searchIcon from "@icons/shapes/search.svg?url";
import coinHandIcon from "@icons/shapes/coins-hand.svg?url";
import walletIcon from "@icons/shapes/wallet.svg?url";
import { SubscribeForm } from "@/components/SubscribeForm";
import ContactForm from "@/components/UiComponents/Forms/ContactForm";
import Whitepaper from "@/components/Whitepaper";
import ContactUsButton from "@/components/ContactUsButton";
import axiosClient from "@/app/axiosClient";
import { HowDoesItWork } from "@/components/HowDoesItWork";

export default function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const query = useSearchParams();
  const [expand, setExpand] = useState(false);

  let path = usePathname();
  const [translate, setTranslate] = useState({} as any);

  useEffect(() => {
    getDictionary(lang).then((res: any) => setTranslate(res.translate));
  }, [lang]);

  const [isWhitepaperOpen, setIsWhitepaperOpen] = useState(false);
  const [data, setData] = useState<any>(null);

  const howItWorks = [
    {
      icon: userIcon,
      title: "1. Set up your profile.",
    },
    {
      icon: walletIcon,
      title: "2. Connect your digital wallet.",
    },
    {
      icon: bookIcon,
      title: "3. Improve your knowledge with eLearning materials.",
    },
    {
      icon: searchIcon,
      title: "4. Browse various real estate projects.",
    },
    {
      icon: coinHandIcon,
      title: "5. Swap your crypto into project tokens.",
    },
  ];
  const fetchData = async () => {
    const response = await axiosClient.get("/faq/get");
    if (response.status == 200) {
      setData(response.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data && query?.get("whitepaper")) {
      setIsWhitepaperOpen(true);
    }
  }, [data, query]);

  const [isContactOpen, setIsContactOpen] = useState(false);

  if (!data)
    return (
      <div className="loader-container">
        <div className="loading"></div>
      </div>
    );

  return (
    <div className="w-full  px-[16px]  md:px-[32px] lg:px-[112px]  ">
      <div className="max-w-[1223px] mx-[auto]">
        <div className="landing-container max-w-[800px] py-[48px]  md:py-[64px] lg:py-[96px]">
          <div className="color-accent-500 text-lg text-semiBold mb-[12px]">
            {translate.faq_heading}
          </div>
          <div className="d-h1 mb-[20px] text-4xl leading-[2.75rem] md:text-[2.75rem] md:leading-[3.25rem] lg:text-[3.5rem] lg:leading-[72px]">
            {translate.faq_subheading}
          </div>
          <div className=" color-primary-600 text-lg leading-[1.625rem] md:text-xl md:leading-[1.875rem] font-medium mb-[32px]">
            {translate.faq_supporting_text}
          </div>

          <div className="">
            <ContactUsButton text={translate.contact_us} />
          </div>
        </div>

        <div className="faq-container mt-[16px] mb-[48px] md:mt-[32px] md:mb-[64px] lg:mb-[112px]">
          <div className="font-bold text-2xl md:text-3xl md:leading-[2.375rem] lg:text-4xl lg:leading-[2.75rem] color-primary-900">
            FAQ
          </div>
          <div className="color-primary-900 text-base md:text-lg md:leading-[1.625rem] mb-[32px]">
            {translate.choose_topic}
          </div>

          <div className="category-container grid gap-[24px] grid-cols-1 md:grid-cols-3">
            {data?.map((item: any) => (
              <div
                key={item.topic_code}
                className="bg-primary-25 p-[32px] rounded-[14px] cursor-pointer hover:shadow-xl duration-300"
              >
                <a href={`${path}/${item.topic_code}`}>
                  <Image
                    src={item.imageUrl}
                    className=" w-[40px] h-[40px] mb-[20px]"
                    alt={item.topic}
                    width={40}
                    height={40}
                  />

                  <div className="d-h3 mb-2 color-primary-900 ">
                    {item.topic}
                  </div>
                  <div className="color-primary-600">{item.topicPhrase}</div>
                </a>
              </div>
            ))}
          </div>

          {/* helpful diagrams */}
          <div className="mt-[40px]">
            <div className="font-bold text-2xl md:text-3xl md:leading-[2.375rem] lg:text-4xl lg:leading-[2.75rem] ">
              {translate.helpful_diagrams}
            </div>
            <div className="bg-primary-25 rounded-[14px] mt-[32px]  p-[32px]">
              <div className=" flex items-center gap-[8px] justify-between">
                <div className="flex gap-[20px] items-center">
                  <Image src={routeIcon} className="w-[44px] " alt="diagrams" />

                  <div className="grow d-h3">How does it work scheme</div>
                </div>
                {expand ? (
                  <Image
                    src={arrowUpIcon}
                    alt="collapse"
                    className="justify-self-end cursor-pointer"
                    onClick={() => setExpand(false)}
                  />
                ) : (
                  <Image
                    src={arrowDownIcon}
                    alt="expand"
                    className="justify-self-end cursor-pointer"
                    onClick={() => setExpand(true)}
                  />
                )}
              </div>
              {!!expand && <Roadmap steps={howItWorks} />}
            </div>
          </div>

          {/* white paper */}
          <div className="mt-[40px] mb-[112px]">
            <div className="font-bold text-2xl md:text-3xl md:leading-[2.375rem] lg:text-4xl lg:leading-[2.75rem] ">
              {translate.whitepaper}
            </div>
            <div
              className="mt-[32px] bg-primary-25 rounded-[14px] p-[32px]  flex items-center gap-[8px] justify-between cursor-pointer"
              onClick={() => setIsWhitepaperOpen(true)}
            >
              <div className="flex items-center gap-[20px]">
                <Image
                  src={fileAttachmentIcon}
                  className="w-[44px] "
                  alt="whitepaper"
                />

                <div className="grow d-h3 break-all">
                  {translate.read_whitepaper}
                </div>
              </div>

              {/* <div className="flex items-center gap-[4px] md:gap-[8px] ">
                <div className="text-lg text-semiBold">
                  {translate.download}
                </div>
                <Image
                  src={downloadIcon}
                  className="justify-self-end w-[20px] cursor-pointer px-[3px]"
                  alt="download"
                />
              </div> */}
            </div>
          </div>

          {/* susscribe  */}
          <div className="mb-12 md:mb-16 lg:mb-24 ">
            <SubscribeForm translate={translate} />
          </div>
          {/* #subscribe */}
        </div>
      </div>

      <Whitepaper
        isOpen={isWhitepaperOpen}
        closeModal={() => setIsWhitepaperOpen(false)}
      />
    </div>
  );
}
