/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { Locale } from "@/i18n.config";
import { getDictionary } from "library/dictionaries";
import "../page.module.scss";

import banner from "images/dev-banner.png";
import bannerTablet from "images/dev-banner-md.png";
import bannerMobile from "images/dev-banner-sm.png";
import whatWeDo from "images/developer-what-we-do.png";
import whatWeDoMobile from "images/developer-what-we-do-sm.png";
import target from "images/target.png";
import invFundTools from "images/inv-fund-tools.png";
import community from "images/community.png";
import communityTablet from "images/community-md.png";
import tools from "images/tools.png";
import toolsTablet from "images/tools-md.png";
import possibilities from "images/possibilities.png";
import possibilitiesTablet from "images/possibilities-md.png";
import attachmentGrayIcon from "icons/shapes/file-attachment-gray.svg?url";
import loadingIcon from "icons/shapes/loading.svg?url";
import playGrayIcon from "icons/shapes/play-gray.svg?url";
import pinGrayIcon from "icons/shapes/pin-gray.svg?url";
import notificationGrayIcon from "icons/shapes/notification-gray.svg?url";
import usersGrayIcon from "icons/shapes/users-gray.svg?url";
import aboutProject from "images/about-project.png";
import Image from "next/image";
import { DescriptionCard, type Description } from "@/components/descriptioCard";
import { SupportCard, type Support } from "@/components/projectCard";
import { HowDoesItWork } from "components/HowDoesItWork";

import userIcon from "icons/shapes/user.svg?url";
import usersIcon from "icons/shapes/users.svg?url";
import bookIcon from "icons/shapes/book.svg?url";
import playIcon from "icons/shapes/play.svg?url";
import shareIcon from "icons/shapes/share.svg?url";
import piggyBankIcon from "icons/shapes/piggy-bank.svg?url";

import { Timer } from "@/components/timer";
import { AreYouInterested } from "@/components/AreYouInterested";
import SubscribeButton from "@/components/SubscribeButton";
import FindOutMoreButton from "@/components/WhitepaperButton";
import Animate from "@/components/UiComponents/Animate";

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { translate } = await getDictionary(lang);

  const developerPageDetail: Description[] = [
    {
      heading: translate.community_heading,
      subheading: translate.community_subheading,
      supporting_text: translate.community_supporting_text,
      image: community,
      image_tablet: communityTablet,
    },
    {
      heading: translate.tools_heading,
      subheading: translate.tools_subheading,
      supporting_text: translate.tools_supporting_text,
      image: tools,
      image_tablet: toolsTablet,
    },
  ];

  const supportToolsDetail: Support[] = [
    {
      heading: translate.elearning,
      supporting_text: translate.elearn_desc,
      support_text: translate.in_progress,
      loading_icon: loadingIcon,
      support_icon: playGrayIcon,
    },
    {
      heading: translate.land_list,
      supporting_text: translate.land_list_desc,
      support_text: translate.in_progress,
      loading_icon: loadingIcon,
      support_icon: pinGrayIcon,
    },
    {
      heading: translate.social_media_platform,
      supporting_text: translate.social_media_platform_desc,
      support_text: translate.in_progress,
      loading_icon: loadingIcon,
      support_icon: notificationGrayIcon,
    },
  ];

  const profileSupportDetail: Support[] = [
    {
      heading: translate.user_profile_portfolio,
      supporting_text: translate.user_profile_portfolio_desc,
      support_text: translate.in_progress,
      loading_icon: loadingIcon,
      support_icon: usersGrayIcon,
    },
  ];

  const howItWorks = [
    {
      icon: userIcon,
      title: "1. Set up your profile.",
    },
    {
      icon: usersIcon,
      title:
        "2. Meet other specialists, start chatting and expand your network. Pick people that share your vision and build a team.",
    },
    {
      icon: bookIcon,
      title: "3. Improve your knowledge with eLearning materials.",
    },
    {
      icon: playIcon,
      title:
        "4. Start a new real estate development project. Tokenize the project and raise funds with Libelit.",
    },
    {
      icon: shareIcon,
      title: "5. Start construction. ",
    },
    {
      icon: piggyBankIcon,
      title:
        "6. Sell the completed real estate and share the profit with your fundraisers.",
    },
  ];

  return (
    <>
      <div className="w-full lg:px-[112px] md:px-8 px-5">
        {/* banner section start */}
        <div className="max-w-[1223px] w-full mt-[31px] text-gray-600 font-inter-700 m-auto lg:pb-[245px] lg:mb-[96px] md:mb-[72px] mb-8 md:pb-8">
          <div className="md:mt-16 mt-6 relative">
            <div className="relative bg-blur z-1 lg:max-w-[825px] md:min-w-[450px] md:max-w-[70%] md:p-8 md:pl-0 md:mt-[101px]">
              <Animate type="pull-up-first" reverse>
                <h1 className="h1   rounded-[40px] break-words">
                  {translate.banner_dev_heading}
                </h1>
              </Animate>
              <Animate type="pull-up-second" reverse>
                <h4 className="h4  z-auto text-primary-600 max-w-[575px]  md:max-w-[70%]  lg:max-w-[575px] mt-24">
                  {translate.banner_dev_supporting_text}
                </h4>
              </Animate>
            </div>
            <Animate type="fade-in-first" disableHide>
              <div className="border-2 border-accent-400 rounded-tr-3xl rounded-bl-3xl rounded-br-3xl absolute top-0 right-20 -mt-[80px] md:block hidden">
                <Animate type="fade-in-second" disableHide>
                  <div className="pt-8 pl-9 -mr-20">
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

            <Animate
              type="pull-up-third"
              className="items-stretch flex flex-col md:flex-row gap-2.5 mt-24 md:mt-1 max-md:max-w-full max-md:flex-wrap relative z-1"
              reverse
            >
              <FindOutMoreButton
                text={translate.find_out_more}
                className="md:flex-initial flex-grow !bg-white"
              />

              <SubscribeButton
                className=" md:flex-initial flex-grow"
                translate={translate}
              />
            </Animate>
          </div>

          {/* banner for mobile */}
          <div className="mt-32 md:m-auto block md:hidden mr-[28px]">
            <Animate type="fade-in-first" disableHide>
              <div className="border-2 border-accent-400 rounded-tr-3xl rounded-bl-3xl rounded-br-3xl mt-8">
                <Animate type="fade-in-second" disableHide>
                  <div className="pt-[18px] pl-[28px] -mr-[30px]">
                    <Image
                      className="-mb-[1.125rem] w-full"
                      src={bannerMobile}
                      alt="banner"
                    />
                  </div>
                </Animate>
              </div>
            </Animate>
          </div>
        </div>
        {/* banner section start */}

        {/* what we do section start */}
        <div className="max-w-[1223px] justify-center m-auto lg:py-[112px] py-[64px]">
          <div className="max-w-[768px] justify-center m-auto text-center relative">
            {/* target icon */}
            <Animate type="fade-in-third" disableHide>
              <Image
                loading="lazy"
                className="hidden lg:z-0 lg:block absolute -top-[72%] -left-[33%] w-[383px] h-[291px]"
                src={target}
                alt="what we do"
              />
            </Animate>
            {/* target icon */}
            <div className="flex flex-col gap-3 z-[1] relative">
              <Animate type="pull-up-first" reverse>
                <h3 className="subheading text-accent-400 color-accent-400">
                  {translate.what_we_do_subheading}
                </h3>
              </Animate>
              <Animate type="pull-up-second" reverse>
                <h2 className="heading">{translate.what_we_do_dev_heading}</h2>
              </Animate>
              <Animate type="pull-up-third" reverse>
                <div className="supporting-text mt-8">
                  {translate.what_we_do_dev_supporting_text}
                </div>
              </Animate>
            </div>
          </div>
          <Animate type="fade-in-first" disableHide>
            <Image
              loading="lazy"
              className="w-full overflow-hidden mt-20 max-md:max-w-full max-md:mt-10 md:rounded-xl rounded-lg hidden md:block"
              src={whatWeDo}
              alt="what we do"
            />
            <Image
              loading="lazy"
              className="w-full overflow-hidden mt-20 max-md:max-w-full max-md:mt-10 md:rounded-xl rounded-lg md:hidden"
              src={whatWeDoMobile}
              alt="what we do"
            />
          </Animate>
        </div>
        {/* what we do section end */}

        {/* Community & networking section start */}
        {developerPageDetail.map((description, key) => (
          <DescriptionCard
            key={`description-` + key}
            description={description}
          />
        ))}

        <div className="max-w-[1223px] justify-center m-auto lg:py-[112px] md:py-[56px] py-[48px] description-wrapper">
          <div className="lg:gap-20 flex lg:flex-row flex-col max-md:items-stretch flex-align-center">
            <div className="flex flex-col items-stretch lg:w-6/12 max-md:w-full max-md:ml-0">
              <Animate type="pull-up-first" reverse>
                <h3 className="subheading text-accent-400 mb-3">
                  {translate.possibilities_subheading}
                </h3>
              </Animate>
              <Animate type="pull-up-second" reverse>
                <h2 className="heading mb-6">
                  {translate.possibilities_heading}
                </h2>
              </Animate>
              <Animate type="pull-up-third" reverse>
                <div
                  className="supporting-text"
                  dangerouslySetInnerHTML={{
                    __html: translate.possibilities_supporting_text,
                  }}
                ></div>
              </Animate>
              <Animate
                type="pull-up-third"
                className="items-stretch flex flex-col md:flex-row gap-2.5 mt-32 max-md:max-w-full max-md:flex-wrap relative z-1"
              >
                <FindOutMoreButton
                  text={translate.find_out_more}
                  className=" md:flex-initial flex-grow"
                />
                <SubscribeButton
                  className=" md:flex-initial flex-grow"
                  translate={translate}
                />
              </Animate>
            </div>

            <div className="flex flex-col items-stretch lg:w-6/12 md:w-full max-md:w-full max-md:ml-0 lg-change-order">
              <Animate type="fade-in-first" disableHide>
                <Image
                  loading="lazy"
                  className="w-full overflow-hidden max-md:mt-8 md:hidden lg:block"
                  src={possibilities}
                  alt={translate.possibilities_subheading}
                />
                <Image
                  loading="lazy"
                  className="w-full overflow-hidden md:mt-8 max-md:mt-10 hidden md:block lg:hidden"
                  src={possibilitiesTablet}
                  alt={translate.possibilities_subheading}
                />
              </Animate>
            </div>
          </div>
        </div>

        {/* Community & networking section end */}

        {/* What we offer section start */}
        <div className="max-w-[1223px] justify-center m-auto lg:py-[112px] md:py-14 py-12">
          <div className="max-w-[768px] justify-center text-center m-auto mb-10">
            <div className="flex flex-col gap-3">
              <Animate type="pull-up-first" reverse>
                <h3 className="subheading text-accent-400">
                  {translate.what_we_offer_subheading}
                </h3>
              </Animate>
              <Animate type="pull-up-second" reverse>
                <h2 className="heading">{translate.what_we_offer_heading}</h2>
              </Animate>
              <Animate type="pull-up-third" reverse>
                <div className="supporting-text">
                  {translate.what_we_offer_supporting_text}
                </div>
              </Animate>
            </div>
          </div>

          <div className="flex lg:flex-row md:flex-col flex-col gap-16 ">
            <div className="flex   gap-16 lg:w-full lg:max-w-[472px] what-we-offer-row lg:!flex-col">
              {/* Investing section starts */}
              <Animate type="pull-up-first" disableHide>
                <div className="flex flex-col lg:h-[400px] lg:w-full md:w-8/12 justify-between items-stretch border border-[color:var(--Secondary-25,#F4F5F7)] bg-secondary-25 pt-6 pl-6 rounded-2xl box-shadow gap-16">
                  <h5 className="h3 font-bold mr-6">
                    {translate.inv_fund_tools}
                  </h5>
                  <ul className="list-disc text-md ml-6 mr-6">
                    <li key={`inv-tool-` + 1}>{translate.inv_tool_1}</li>
                    <li key={`inv-tool-` + 2}>{translate.inv_tool_2}</li>
                    <li key={`inv-tool-` + 3}>{translate.inv_tool_3}</li>
                  </ul>
                  <Image
                    loading="lazy"
                    className="w-full"
                    src={invFundTools}
                    alt="Investing & fundraising tools"
                  />
                </div>
              </Animate>
              {/* Investing section ends */}
              {/* Simplified real estate section starts */}
              <Animate type="pull-up-second" disableHide>
                <div className="flex flex-col  lg:w-full md:w-4/12 justify-between items-stretch border border-[color:var(--Secondary-25,#F4F5F7)] bg-secondary-25 p-6 rounded-2xl box-shadow">
                  <div className="text-primary-900 text-2xl font-bold leading-8 mb-2.5">
                    {translate.sim_real_state}
                  </div>
                  <div className="text-primary-600 text-md leading-5 mb-4">
                    <ul className="list-disc text-md ml-6">
                      <li key={"real-state-" + 1}>
                        {translate.sim_real_state_1}
                      </li>
                      <li key={"real-state-" + 2}>
                        {translate.sim_real_state_2}
                      </li>
                      <li key={"real-state-" + 3}>
                        {translate.sim_real_state_3}
                      </li>
                      <li key={"real-state-" + 4}>
                        {translate.sim_real_state_4}
                      </li>
                    </ul>
                  </div>
                  <div className="flex w-full items-stretch justify-between gap-5 mt-14 max-md:max-w-full max-md:flex-wrap">
                    <div className="items-stretch flex gap-2 mt-5 self-end">
                      <Image
                        loading="lazy"
                        className="aspect-square object-contain object-center w-5 shrink-0"
                        src={loadingIcon}
                        alt="loading..."
                      />
                      <div className="text-accent500 text-md leading-5 grow whitespace-nowrap">
                        {translate.in_progress}
                      </div>
                    </div>

                    <div className="justify-center items-center box-shadow bg-white flex aspect-square flex-col w-[46px] h-[46px] px-2 rounded-lg">
                      <Image
                        loading="lazy"
                        className="aspect-square object-contain object-center w-full"
                        src={attachmentGrayIcon}
                        alt="file attachment"
                      />
                    </div>
                  </div>
                </div>
              </Animate>
              {/* Simplified real estate section ends */}
            </div>
            <div className="flex flex-col gap-16 lg:w-auto ">
              <Animate type="pull-up-first" disableHide>
                <div className="flex  gap-16 what-we-offer-row">
                  {/* eLearning, Land Listings, Social Media Platform section starts */}
                  {supportToolsDetail.map((support, key) => (
                    <SupportCard
                      key={`support-tool-` + key}
                      support={support}
                    />
                  ))}
                  {/* eLearning, Land Listings, Social Media Platform section ends */}
                </div>
              </Animate>
              <Animate type="pull-up-second" disableHide>
                <div className="flex  gap-16 what-we-offer-row">
                  {/* Project presentation page section starts */}

                  <div className="flex md:flex-row md:w-8/12 flex-col gap-5 border border-[color:var(--Secondary-25,#F4F5F7)] bg-secondary-25 p-6 rounded-2xl box-shadow overflow-hidden">
                    <div className="flex flex-col gap-2.5">
                      <h5 className="h3 font-bold">
                        {translate.project_present_page}
                      </h5>
                      <ul className="list-disc text-md ml-6">
                        <li>{translate.project_present_page_1}</li>
                        <li>{translate.project_present_page_2}</li>
                        <li>{translate.project_present_page_3}</li>
                        <li>{translate.project_present_page_4}</li>
                        <li>{translate.project_present_page_5}</li>
                      </ul>
                    </div>

                    <Image
                      loading="lazy"
                      className="w-full -mb-6"
                      src={aboutProject}
                      alt="about the project"
                    />
                  </div>
                  {/* Project presentation page section ends */}
                  {/* User profile and portfolio section starts */}
                  {profileSupportDetail.map((profile, key) => (
                    <SupportCard key={`profile-` + key} support={profile} />
                  ))}

                  {/* User profile and portfolio section ends */}
                </div>
              </Animate>
            </div>
          </div>
        </div>
        {/* What we offer section ends */}
      </div>
      {/* how does it work section starts */}
      <HowDoesItWork lang={lang} steps={howItWorks} />
      {/* how does it work section ends */}

      <div className="w-full lg:px-[112px] md:px-8 px-5">
        {/* platform launch section starts */}
        <Timer lang={lang} />
        {/* platform launch section ends */}

        {/* Are you interested section starts */}
        <AreYouInterested lang={lang} />
        {/* Are you interested section ends */}

        <div className="max-w-[880px] justify-center m-auto lg:pb-[112px] md:pt-[48px] mb:pb-[64px] pt-[32px] pb-[48px] text-center">
          <Animate type="pull-up-first" reverse>
            <div className="text-primary-900 lg:text-4xl lg:leading-[44px] md:text-3xl md:leading-8 text-2xl leading-[26px] font-bold self-stretch md:mb-10 mb-32">
              {translate.like_to_learn}
            </div>
          </Animate>
          <Animate type="pull-up-second" reverse>
            <a href={`/${lang}`}>
              <button className="btn-secondary md:flex-initial flex-grow">
                {translate.section_for_investors}
              </button>
            </a>
          </Animate>
        </div>
      </div>
    </>
  );
}
