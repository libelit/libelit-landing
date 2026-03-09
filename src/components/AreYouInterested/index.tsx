import { Locale } from "@/i18n.config";
import { getDictionary } from "@/library/dictionaries";
import Image from "next/image";
import spreadVector from "icons/shapes/spread-vector.svg?url";
import stayInTouchBanner from "images/stay-in-touch-banner.png";
import stayInTouchBannerTablet from "images/stay-in-touch-banner-md.png";
import { Social } from "@/components/social";
import SubscribeButton from "../SubscribeButton";
import Animate from "../UiComponents/Animate";

export async function AreYouInterested({ lang = "en" }: { lang: Locale }) {
  const { translate } = await getDictionary(lang);
  return (
    <div className="max-w-[1223px] justify-center m-auto lg:py-[96px] md:py-[72px] py-[48px] description-wrapper">
      <div className="lg:gap-16 flex md:flex-row flex-col max-md:items-stretch flex-align-center gap-6">
        <div className="flex flex-col items-stretch md:w-6/12 max-md:w-full max-md:ml-0 lg:gap-[64px] gap-6 overflow-hidden">
          <div className="flex-col overflow-hidden relative flex lg:min-h-[660px] grow pl-6 pr-16 pt-7 pb-12 items-start max-md:max-w-full rounded-2xl">
            <Animate type="fade-in-first" disableHide>
              <Image
                loading="lazy"
                className="lg:block md:hidden block absolute h-full w-full object-cover object-center inset-0"
                src={stayInTouchBanner}
                alt="interested house"
              />
              <Image
                loading="lazy"
                className="lg:hidden md:block hidden absolute lg:h-full w-full object-cover object-center inset-0"
                src={stayInTouchBannerTablet}
                alt="interested house"
              />
              <div className="relative justify-between backdrop-blur-[15px] bg-white/60 flex flex-col md:p-8 p-6 lg:rounded-xl items-start">
                <Image
                  loading="lazy"
                  className="aspect-[1.01] object-contain object-center w-[77px] overflow-hidden max-w-full lg:mb-24 md:mb-5 mb-2"
                  src={spreadVector}
                  alt="vector"
                />
                <div className="text-primary-900 lg:text-4xl lg:leading-[44px] md:text-3xl md:leading-8 text-2xl leading-[26px] font-bold self-stretch">
                  {translate.your}
                  <br />
                  {translate.property}
                  <br />
                  <br />
                  {translate.your}
                  <br />
                  {translate.currency}
                  <br />
                  <br />
                  {translate.your}
                  <br />
                  {translate.future}
                </div>
              </div>
            </Animate>
          </div>
        </div>

        <div className="flex flex-col items-stretch md:w-6/12 max-md:w-full max-md:ml-0">
          <div className="self-stretch text-accent-400 text-base font-semibold leading-6 max-md:max-w-full">
            <Animate type="pull-up-first" reverse>
              {" "}
              {translate.are_you_interested_sub_heading}
            </Animate>
          </div>
          <div className="self-stretch lg:text-4xl lg:leading-[44px] md:text-3xl md:leading-8 text-2xl leading-[26px] font-bold mt-4 max-md:max-w-full">
            <Animate type="pull-up-second" reverse>
              {" "}
              {translate.are_you_interested_heading}
            </Animate>
          </div>
          <div className="self-stretch text-neutral-700 text-lg leading-8 mt-6 max-md:max-w-full">
            <Animate type="pull-up-third" reverse>
              {" "}
              {translate.are_you_interested_supporting_text}{" "}
            </Animate>
          </div>
          <div className="items-stretch flex gap-2.5 mt-24 self-start ">
            <Animate type="fade-in-first" reverse>
              <div className="flex gap-2 flex-wrap">
                <div className="md:flex-initial flex-grow">
                  {" "}
                  <SubscribeButton translate={translate} className="w-full" />
                </div>
                <div className="flex gap-2 ">
                  <Social />
                </div>
              </div>
            </Animate>
          </div>
        </div>
      </div>
    </div>
  );
}
