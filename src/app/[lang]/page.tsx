/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { Locale } from "@/i18n.config";
import { getDictionary } from "library/dictionaries";
import "./page.module.scss";

import banner from "images/banner.png";
import bannerTablet from "images/banner-md.png";
import bannerMobile from "images/banner-sm.png";
import blockchain from "images/blockchain.png";
import blockchainMobile from "images/blockchain-sm.png";
import Image from "next/image";
import aboutRealEstate from "images/about-real-estate.png";
import realEstatePresent from "images/real-estate-present.png";
import invFundTools from "images/inv-fund-tools.png";

import { Timer } from "@/components/timer";
import { AreYouInterested } from "@/components/AreYouInterested";
import target from "images/target.png";
import targetTablet from "images/target-md.png";
import { DescriptionCard, type Description } from "@/components/descriptioCard";
import betterDesign from "images/better-design.png";
import betterDesignTablet from "images/better-design-md.png";
import bernard from "images/people/bernard-hermant-md.png";
import bernardTablet from "images/people/bernard-hermant.png";
import bernardMobile from "images/people/team-member-1-sm.png";
import { Roadmap } from "@/components/roadmap";
import SubscribeButton from "@/components/SubscribeButton";
import FindOutMoreButton from "@/components/WhitepaperButton";
import { AlertProvider } from "@/contexts/AlertContext";
import Animate from "@/components/UiComponents/Animate";
// import ReactGA from "react-ga4";

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  // ReactGA.initialize("G-C7H999MVM9", { debug_mode: true } as any);
  // ReactGA.send({ hitType: "pageview", page: "/en" });
  const { translate } = await getDictionary(lang);

  const betterDesignDetail: Description[] = [
    {
      heading: translate.better_design_heading,
      subheading: translate.better_design_subheading,
      supporting_text: translate.better_design_supporting_text,
      image: betterDesign,
      image_tablet: betterDesignTablet,
    },
  ];
  return (
    <>
      <div className="w-full lg:px-[112px] md:px-8 px-5">
        {/* banner section starts */}
        <div className="max-w-[1223px] w-full mt-[31px] text-gray-600 font-inter-700 m-auto lg:pb-[245px] lg:mb-[96px] md:mb-[72px] mb-8 md:pb-8">
          <div className="md:mt-16 mt-6 relative">
            <div className=" relative bg-blur z-1 lg:max-w-[825px] md:max-w-[70%] md:p-8 md:pl-0 md:mt-[101px]">
              <Animate type="pull-up-first" reverse>
                <h1 className=" h1   rounded-[40px] break-words">
                  {translate.banner_heading}
                </h1>
              </Animate>
              <Animate type="pull-up-second" reverse>
                <h4 className=" h4  z-auto text-primary-600 max-w-[575px] md:max-w-[70%]  lg:max-w-[575px] mt-24">
                  {translate.banner_supporting_text}
                </h4>
              </Animate>
            </div>
            <Animate type="fade-in-first" disableHide>
              <div className=" border-2 border-accent-400 rounded-tr-3xl rounded-bl-3xl rounded-br-3xl absolute top-0 right-20 -mt-[80px] md:block hidden">
                <Animate type="fade-in-second" disableHide>
                  <div className=" pt-8 pl-9 -mr-20">
                    <Image
                      loading="lazy"
                      className="-mb-28 lg:block hidden"
                      src={banner}
                      alt="banner"
                    />
                    <Image
                      loading="lazy"
                      className="-mb-28 lg:hidden md:block"
                      src={bannerTablet}
                      alt="banner"
                    />
                  </div>
                </Animate>
              </div>
            </Animate>
            <Animate type="pull-up-third">
              <div className="items-stretch flex flex-col md:flex-row gap-2.5 mt-24 md:mt-1 max-md:max-w-full max-md:flex-wrap relative z-1">
                <FindOutMoreButton
                  text={translate.find_out_more}
                  className="z-50 md:flex-initial flex-grow !bg-white"
                />

                <SubscribeButton
                  className="z-50  md:flex-initial flex-grow"
                  translate={translate}
                />
              </div>
            </Animate>
          </div>

          {/* banner for mobile */}
          <div className="mt-32 md:m-auto block md:hidden mr-[28px]">
            <Animate type="fade-in-second" disableHide>
              <div className="border-2 border-accent-400 rounded-tr-3xl rounded-bl-3xl rounded-br-3xl mt-8">
                <div className="pt-[18px] pl-[28px] -mr-[30px]">
                  <Animate type="fade-in-third" disableHide>
                    <Image
                      className="-mb-[1.125rem] w-full"
                      src={bannerMobile}
                      alt="banner"
                    />
                  </Animate>
                </div>
              </div>
            </Animate>
          </div>
        </div>
        {/* banner section end */}

        {/* Better Design section starts */}
        <div className="better-design">
          {betterDesignDetail.map((description, key) => (
            <DescriptionCard
              key={`description-` + key}
              description={description}
            />
          ))}
        </div>
        {/* Better Design section ends */}

        {/* Blockchain section starts */}
        <div className="max-w-[1223px] justify-center m-auto lg:py-[112px] py-[64px]">
          <div className="gap-6 flex lg:flex-row md:flex-col max-md:gap-0">
            <div className="flex flex-col items-stretch lg:flex-1 max-md:w-full max-md:ml-0">
              <div className="flex grow flex-col items-start max-md:max-w-full max-md:mt-6">
                <Animate type="pull-up-first" reverse>
                  <h3 className="subheading text-accent-400 mb-3">
                    {translate.blockchain_subheading}
                  </h3>
                </Animate>
                <Animate type="pull-up-second" reverse>
                  <h2 className="heading">{translate.blockchain_heading}</h2>
                </Animate>
                <Animate type="pull-up-third" reverse>
                  <div
                    className="supporting-text lg:hidden md:block"
                    dangerouslySetInnerHTML={{
                      __html: translate.blockchain_supporting_text,
                    }}
                  ></div>
                </Animate>
                <Animate type="fade-in-second">
                  <FindOutMoreButton
                    text={translate.find_out_more}
                    className="mt-24"
                  />
                </Animate>
              </div>
            </div>
            <div className="lg:flex lg:flex-col items-stretch lg:flex-1 ml-5 max-md:w-full max-md:ml-0 hidden">
              <Animate type="pull-up-first">
                <div
                  className="supporting-text"
                  dangerouslySetInnerHTML={{
                    __html: translate.blockchain_supporting_text,
                  }}
                ></div>
              </Animate>
            </div>
          </div>
          <Animate type="fade-in-first" disableHide>
            <Image
              loading="lazy"
              className="md:block hidden w-full overflow-hidden lg:mt-20 mt-32 rounded-[14px]"
              src={blockchain}
              alt="blockchain"
            />
            <Image
              loading="lazy"
              className="md:hidden block w-full overflow-hidden mt-32 rounded-[14px]"
              src={blockchainMobile}
              alt="blockchain"
            />
          </Animate>
        </div>
        {/* Blockchain section ends */}
      </div>

      {/* Meet the team section starts */}
      <div className="bg-secondary-25 w-full lg:py-[96px] md:py-16 py-12 md:px-8 px-5">
        <div className="max-w-[1223px] justify-center m-auto">
          <div className="lg:gap-20 flex lg:flex-row flex-col max-md:items-stretch flex-align-center">
            <div className="flex flex-col items-stretch lg:w-6/12 max-md:w-full max-md:ml-0">
              <Animate type="pull-up-first" reverse>
                <h3 className="subheading text-accent-400 mb-3">
                  {translate.who_are_we}
                </h3>
              </Animate>
              <Animate type="pull-up-second" reverse>
                <h2 className="heading mb-6 ">{translate.meet_our_team}</h2>
              </Animate>
              <Animate type="pull-up-third" reverse>
                <div
                  className="supporting-text"
                  dangerouslySetInnerHTML={{
                    __html: translate.team_supporting_text,
                  }}
                ></div>
              </Animate>
              <Animate type="pull-up-first" reverse>
                <div className="items-stretch flex flex-col md:flex-row gap-2.5 mt-24 max-md:max-w-full max-md:flex-wrap relative z-1">
                  <a
                    href={`/${lang}/about/`}
                    className=" md:flex-initial flex-grow"
                  >
                    <button className="btn-secondary w-full">
                      {translate.meet_the_team}
                    </button>
                  </a>

                  <SubscribeButton
                    translate={translate}
                    className={"md:flex-initial flex-grow"}
                  />
                </div>
              </Animate>
            </div>

            <div className="flex flex-col items-stretch lg:w-6/12 md:w-full max-md:w-full max-md:ml-0 lg-change-order lg:-order-1">
              <Animate type="fade-in-first" disableHide>
                <Image
                  loading="lazy"
                  className="w-full overflow-hidden md:mt-8 max-md:mt-10 hidden md:block lg:hidden"
                  src={bernard}
                  alt="bernard hermant"
                />
                <Image
                  loading="lazy"
                  className="w-full overflow-hidden mt-8 md:hidden lg:block hidden"
                  src={bernardTablet}
                  alt="bernard hermant"
                />
                <Image
                  loading="lazy"
                  className="w-full overflow-hidden sm:mt-8 md:hidden block"
                  src={bernardMobile}
                  alt="bernard hermant"
                />
              </Animate>
            </div>
          </div>
        </div>
      </div>
      {/* Meet the team section ends */}

      <div className="w-full lg:px-[112px] md:px-8 px-5">
        {/* what we do section starts */}
        <div className="max-w-[1223px] justify-center m-auto lg:py-[112px] md:py-[56px] py-[48px]">
          <div className="max-w-[768px] justify-center m-auto text-center relative lg:mb-[80px] md:mb-[72px] mb-[56px]">
            <div className="flex flex-col gap-3 z-[1] relative">
              <Animate type="pull-up-first">
                <h3 className="subheading text-accent-400 color-accent-400">
                  {translate.what_we_offer_subheading}
                </h3>
              </Animate>
              <Animate type="pull-up-second">
                <h2 className="heading">
                  {translate.investing_tools_knowledge_subheading}
                </h2>
              </Animate>
              <Animate type="pull-up-third">
                <div className="supporting-text">
                  {translate.investing_tools_knowledge_supporting_text}
                </div>
              </Animate>
            </div>
          </div>
          <Animate type="fade-in-first" disableHide>
            <div className="justify-center self-stretch mt-10 max-md:max-w-full">
              <div className="gap-5 flex lg:flex-row flex-col">
                {/* Constrution Finance section starts */}
                <div className="flex flex-col items-stretch max-md:w-full max-md:ml-0">
                  <div className="items-stretch self-stretch border border-[color:var(--Secondary-25,#F4F5F7)] bg-gray-100 flex grow flex-col w-full pl-6 pt-6 rounded-2xl border-solid relative overflow-hidden box-shadow">
                    <h5 className="h3 font-bold">
                      {translate.construction_finance}
                    </h5>
                    <ul className="list-disc text-sm ml-6 mb-">
                      <li>{translate.construction_finance_1}</li>
                      <li>{translate.construction_finance_2}</li>
                      <li>{translate.construction_finance_3}</li>
                    </ul>
                    <Image
                      loading="lazy"
                      className="w-full bottom-0 right-0 lg:absolute"
                      src={invFundTools}
                      alt="Investing & fundraising tools"
                    />
                  </div>
                </div>

                {/* Constrution Finance section ends */}
                {/* Real Estate presentation section starts */}

                <div className="flex md:flex-row lg:w-8/12 flex-col gap-5 border border-[color:var(--Secondary-25,#F4F5F7)] bg-secondary-25 px-6 pt-6 rounded-2xl box-shadow">
                  <div className="flex flex-col gap-2.5 md:w-7/12 relative">
                    <h5 className="h3 font-bold">
                      {translate.real_estate_present}
                    </h5>
                    <ul className="list-disc text-sm ml-6">
                      <li>{translate.project_present_page_1}</li>
                      <li>{translate.project_present_page_2}</li>
                      <li>{translate.project_present_page_3}</li>
                      <li>{translate.project_present_page_4}</li>
                      <li>{translate.project_present_page_5}</li>
                    </ul>

                    <Image
                      loading="lazy"
                      className="w-full mt-2.5 md:absolute bottom-0 image-shadow"
                      src={realEstatePresent}
                      alt="real estate presentation"
                    />
                  </div>
                  <div className="md:w-5/12">
                    <Image
                      loading="lazy"
                      className="w-full image-shadow"
                      src={aboutRealEstate}
                      alt="about real estate"
                    />
                  </div>
                </div>

                {/* Real Estate presentation section ends */}
              </div>
            </div>
          </Animate>
        </div>
        {/* what we do section ends */}
      </div>

      <div className="relative w-full">
        <div className="flex flex-col items-center justify-start m-auto w-full">

          {/* Roadmap section starts */}
          <Roadmap lang={lang} />

          {/* Roadmap section ends */}
        </div>
      </div>

      <div className="w-full lg:px-[112px] md:px-8 px-5">
        {/* platform launch section starts */}
        <Timer lang={lang} />
        {/* platform launch section ends */}

        {/* Are you interested section starts */}
        <AreYouInterested lang={lang} />
        {/* Are you interested section ends */}

        <div className="max-w-[880px] justify-center m-auto lg:pb-[112px] md:pt-[64px] md:pb-[64px] pt-[32px] pb-[48px] text-center">
          <Animate type="pull-up-first" reverse>
            <div
              className="text-primary-900 lg:text-4xl lg:leading-[44px] md:text-3xl md:leading-8 text-2xl leading-[26px] font-bold self-stretch md:mb-10 mb-32"
              dangerouslySetInnerHTML={{
                __html: translate.support_next_project,
              }}
            ></div>
          </Animate>
          <Animate type="pull-up-third">
            <a href={`/${lang}/developers`}>
              <button className="btn-secondary md:flex-initial flex-grow">
                {translate.goto_section_for_developers}
              </button>
            </a>
          </Animate>
        </div>
      </div>
    </>
  );
}
