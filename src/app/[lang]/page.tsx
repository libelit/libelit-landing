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
import { HowDoesItWork } from "components/HowDoesItWork";
import userIcon from "icons/shapes/user.svg?url";
import walletIcon from "icons/shapes/wallet.svg?url";
import bookIcon from "icons/shapes/book.svg?url";
import searchIcon from "icons/shapes/search.svg?url";
import coinHandIcon from "icons/shapes/coins-hand.svg?url";
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

        {/* what we do section starts */}
        <div className="max-w-[1223px] justify-center m-auto lg:py-[112px] py-[64px]">
          <div className="max-w-[768px] justify-center m-auto text-center relative lg:mb-[80px] md:mb-[72px] mb-[56px]">
            {/* target icon */}
            <Animate type="fade-in-first" disableHide>
              <Image
                loading="lazy"
                className="hidden lg:z-0 lg:block absolute -top-[72%] -left-[33%] w-[383px] h-[291px]"
                src={target}
                alt="what we do"
              />
              <Image
                loading="lazy"
                className="lg:hidden md:block hidden md:z-0 absolute -top-[28%] -left-[8%] h-[157px]"
                src={targetTablet}
                alt="what we do"
              />
            </Animate>
            {/* target icon */}
            <div className="flex flex-col gap-3 z-[1] relative">
              <Animate type="pull-up-first" reverse>
                <h3 className=" subheading text-accent-400 color-accent-400">
                  {translate.what_we_do_subheading}
                </h3>
              </Animate>
              <Animate type="pull-up-first" reverse>
                <h2 className="heading">{translate.what_we_do_heading}</h2>
              </Animate>
              <Animate type="pull-up-first" reverse>
                <div className="supporting-text">
                  {translate.what_we_do_supporting_text}
                </div>
              </Animate>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 lg:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-20 ">
            <Animate type="pull-up-first" reverse>
              <div className="lg:flex flex-col items-stretch ml-5 max-md:w-full max-md:ml-0 text-center hidden">
                <div className="items-center flex grow flex-col">
                  <div className="justify-center items-center shadow-sm bg-red-50 flex aspect-square flex-col w-14 h-14 px-3.5 rounded-[50px]">
                    <svg
                      width="29"
                      height="28"
                      viewBox="0 0 29 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.1693 13.4181L13.5026 15.7514L18.7526 10.5014M24.0026 14.0014C24.0026 19.7279 17.7563 23.8929 15.4836 25.2188C15.2253 25.3694 15.0962 25.4448 14.9139 25.4839C14.7725 25.5142 14.5661 25.5142 14.4246 25.4839C14.2424 25.4448 14.1132 25.3694 13.8549 25.2188C11.5822 23.8929 5.33594 19.7279 5.33594 14.0014V8.42193C5.33594 7.48917 5.33594 7.02278 5.48849 6.62188C5.62326 6.26773 5.84225 5.95172 6.12654 5.70118C6.44835 5.41757 6.88504 5.25382 7.75841 4.9263L14.0138 2.58052C14.2564 2.48956 14.3777 2.44408 14.5024 2.42606C14.6131 2.41006 14.7255 2.41006 14.8361 2.42606C14.9609 2.44408 15.0822 2.48956 15.3247 2.58051L21.5801 4.9263C22.4535 5.25382 22.8902 5.41757 23.212 5.70118C23.4963 5.95172 23.7153 6.26773 23.8501 6.62188C24.0026 7.02278 24.0026 7.48917 24.0026 8.42193V14.0014Z"
                        stroke="#D25130"
                        strokeWidth="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="text-primary-900 text-2xl font-bold leading-8 self-stretch md:mt-5 mt-4">
                    {translate.trustworthy_title}
                  </div>
                  <div className="self-stretch text-primary-600 text-base leading-6 mt-2">
                    {translate.trustworthy_supporting_text}
                  </div>
                </div>
              </div>
            </Animate>
            <Animate type="pull-up-second" reverse>
              <div className="flex flex-col items-stretch  max-md:w-full max-md:ml-0 text-center">
                <div className="items-center flex grow flex-col">
                  <div className="justify-center items-center shadow-sm bg-red-50 flex aspect-square flex-col w-14 h-14 px-3.5 rounded-[50px]">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.0217 15.7604L17.99 20.4037M17.9783 7.5937L10.0217 12.237M24.5 5.83203C24.5 7.76503 22.933 9.33203 21 9.33203C19.067 9.33203 17.5 7.76503 17.5 5.83203C17.5 3.89903 19.067 2.33203 21 2.33203C22.933 2.33203 24.5 3.89903 24.5 5.83203ZM10.5 13.9987C10.5 15.9317 8.933 17.4987 7 17.4987C5.067 17.4987 3.5 15.9317 3.5 13.9987C3.5 12.0657 5.067 10.4987 7 10.4987C8.933 10.4987 10.5 12.0657 10.5 13.9987ZM24.5 22.1654C24.5 24.0984 22.933 25.6654 21 25.6654C19.067 25.6654 17.5 24.0984 17.5 22.1654C17.5 20.2324 19.067 18.6654 21 18.6654C22.933 18.6654 24.5 20.2324 24.5 22.1654Z"
                        stroke="#D25130"
                        strokeWidth="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="text-primary-900 text-2xl font-bold leading-8 self-stretch md:mt-5 mt-4">
                    {translate.investment_title}
                  </div>
                  <div className="self-stretch text-primary-600 text-base leading-6 mt-2">
                    {translate.investment_supporting_text}
                  </div>
                </div>
              </div>
            </Animate>
            <Animate type="pull-up-third" reverse>
              <div className="flex flex-col items-stretch  max-md:w-full max-md:ml-0 text-center md:col-span-2 lg:col-span-1">
                <div className="items-center flex grow flex-col">
                  <div className="justify-center items-center shadow-sm bg-red-50 flex aspect-square flex-col w-14 h-14 px-3.5 rounded-[50px]">
                    <svg
                      width="29"
                      height="28"
                      viewBox="0 0 29 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.16789 15.1667C6.16789 17.0898 6.9434 18.8318 8.19875 20.097C8.31982 20.219 8.38036 20.28 8.41609 20.3386C8.45019 20.3946 8.47004 20.4428 8.48526 20.5066C8.50122 20.5734 8.50122 20.6494 8.50122 20.8015V23.5667C8.50122 23.8934 8.50122 24.0567 8.5648 24.1815C8.62073 24.2913 8.70996 24.3805 8.81973 24.4364C8.94451 24.5 9.10786 24.5 9.43455 24.5H11.6512C11.9779 24.5 12.1413 24.5 12.266 24.4364C12.3758 24.3805 12.465 24.2913 12.521 24.1815C12.5846 24.0567 12.5846 23.8934 12.5846 23.5667V23.1C12.5846 22.7733 12.5846 22.61 12.6481 22.4852C12.7041 22.3754 12.7933 22.2862 12.9031 22.2302C13.0278 22.1667 13.1912 22.1667 13.5179 22.1667H15.1512C15.4779 22.1667 15.6413 22.1667 15.766 22.2302C15.8758 22.2862 15.965 22.3754 16.021 22.4852C16.0846 22.61 16.0846 22.7733 16.0846 23.1V23.5667C16.0846 23.8934 16.0846 24.0567 16.1481 24.1815C16.2041 24.2913 16.2933 24.3805 16.4031 24.4364C16.5278 24.5 16.6912 24.5 17.0179 24.5H19.2346C19.5613 24.5 19.7247 24.5 19.8495 24.4364C19.9592 24.3805 20.0485 24.2913 20.1044 24.1815C20.168 24.0567 20.168 23.8934 20.168 23.5667V22.4284C20.168 22.1926 20.168 22.0748 20.2015 21.9802C20.2337 21.8895 20.2742 21.826 20.3429 21.7586C20.4146 21.6883 20.5361 21.632 20.7789 21.5192C21.9249 20.9872 22.9027 20.1542 23.6109 19.1219C23.7355 18.9403 23.7978 18.8496 23.8643 18.7959C23.9278 18.7446 23.9849 18.7146 24.0632 18.6912C24.145 18.6667 24.2422 18.6667 24.4365 18.6667H25.068C25.3947 18.6667 25.558 18.6667 25.6828 18.6031C25.7926 18.5472 25.8818 18.4579 25.9377 18.3482C26.0013 18.2234 26.0013 18.06 26.0013 17.7333V13.75C26.0013 13.439 26.0013 13.2835 25.9435 13.1635C25.8862 13.0445 25.7901 12.9484 25.6711 12.8911C25.5511 12.8333 25.3956 12.8333 25.0846 12.8333C24.8595 12.8333 24.7469 12.8333 24.6562 12.8028C24.5585 12.7698 24.4899 12.726 24.419 12.6511C24.3532 12.5816 24.2995 12.4654 24.1921 12.2331C23.8474 11.4873 23.3753 10.8124 22.8038 10.2364C22.6827 10.1144 22.6222 10.0534 22.5864 9.99469C22.5523 9.93871 22.5325 9.89052 22.5173 9.82677C22.5013 9.75995 22.5013 9.68392 22.5013 9.53187V8.23734C22.5013 7.81729 22.5013 7.60726 22.4138 7.46609C22.3372 7.34243 22.2171 7.25186 22.0772 7.21215C21.9174 7.16682 21.7155 7.22452 21.3116 7.33992L18.5436 8.13076C18.4965 8.1442 18.473 8.15092 18.4491 8.15563C18.4279 8.15982 18.4064 8.16283 18.3848 8.16463C18.3606 8.16667 18.3361 8.16667 18.2872 8.16667H17.7868M6.16789 15.1667C6.16789 12.4786 7.68305 10.1444 9.90593 8.97156M6.16789 15.1667H5.0013C3.71264 15.1667 2.66797 14.122 2.66797 12.8333C2.66797 11.9697 3.1372 11.2156 3.83464 10.8122M17.8346 7.58333C17.8346 9.8385 16.0065 11.6667 13.7513 11.6667C11.4961 11.6667 9.66797 9.8385 9.66797 7.58333C9.66797 5.32817 11.4961 3.5 13.7513 3.5C16.0065 3.5 17.8346 5.32817 17.8346 7.58333Z"
                        stroke="#D25130"
                        strokeWidth="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="text-primary-900 text-2xl font-bold leading-8 self-stretch md:mt-5 mt-4">
                    {translate.diversify_title}
                  </div>
                  <div className="self-stretch text-primary-600 text-base leading-6 mt-2">
                    {translate.diversify_supporting_text}
                  </div>
                </div>
              </div>
            </Animate>
          </div>
        </div>
        {/* what we do section ends */}

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
          {/* how does it work section starts */}
          <HowDoesItWork lang={lang} steps={howItWorks} />

          {/* how does it work section ends */}

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
