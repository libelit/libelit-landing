import { Locale } from "@/i18n.config";
import { getDictionary } from "library/dictionaries";
import Image from "next/image";
import libelitLogo from "logos/libelit-logo.svg?url";
import discordIcon from "logos/discord.svg?url";
import xIcon from "logos/x.svg?url";
import linkedinIcon from "logos/linkedin.svg?url";

export async function Footer({ lang = "en" }: { lang: Locale }) {
  const { translate } = await getDictionary(lang);
  const year = new Date().getFullYear();

  return (
    <div className="bg-secondary-25 w-full">
      <div className="max-w-[1223px] flex w-full flex-col items-stretch gap-4 py-10 md:py-16 text-gray-600 font-inter-700 m-auto px-4 md:px-8 ">
        <div className="items-stretch flex justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
          <div className="justify-center flex grow basis-[0%] flex-col items-start max-md:max-w-full">
            <a href={`/${lang}`}>
              <Image
                loading="lazy"
                className="w-[105px] max-w-[105px] "
                src={libelitLogo}
                alt="Libelit"
              />
            </a>
            <div className="flex-col md:flex-row md:justify-between w-full">
              <div className="items-stretch self-stretch flex md:justify-between gap-5 mt-24 max-md:max-w-full max-md:flex-wrap">
                <div className="text-primary-900 text-center text-base font-semibold leading-6">
                  <a href={`/${lang}/about`}>{translate.about_us}</a>
                </div>
                <div className="text-primary-900 text-center text-base font-semibold leading-6">
                  <a href={`/${lang}/roadmap`}>{translate.road_map}</a>
                </div>
                <div className="text-primary-900 text-center text-base font-semibold leading-6">
                  <a href={`/${lang}/faq?whitepaper=true`}>
                    {" "}
                    {translate.white_paper}
                  </a>
                </div>
                <div className="text-primary-900 text-center text-base font-semibold leading-6 whitespace-nowrap">
                  <a href={`/${lang}/faq`}> {translate.faq}</a>
                </div>
              </div>

              <div className="md:justify-between md:self-end flex gap-5 pl-24 items-start max-md:max-w-full max-md:flex-wrap sm:mt-10 md:mt-0 sm:pl-0">
  
                <a
                  href="https://www.linkedin.com/company/libelit"
                  target="_blank"
                >
                  <Image
                    loading="lazy"
                    src={linkedinIcon}
                    alt="linkedin"
                    className="aspect-square object-contain object-center w-6 justify-center items-center overflow-hidden self-stretch shrink-0 max-w-full"
                  />
              </div>
            </div>
          </div>
        </div>
        <div className="items-stretch border-t-[color:var(--Primary-800,#1C1C1C)] flex-col md:flex-row md:justify-between gap-5 mt-32 pt-8 border-t border-solid max-md:max-w-full max-md:flex-wrap">
          <div className="text-zinc-900 text-base leading-6 grow whitespace-nowrap">
            © {year} Libelit. All rights reserved.
          </div>

          <div className="justify-start md:justify-end md:items-stretch flex gap-4 lg:pl-20 max-md:max-w-full max-md:flex-wrap ">
            <div className="text-zinc-900 text-base leading-6  whitespace-nowrap">
              {translate.terms}
            </div>
            <div className="text-zinc-900 text-base leading-6 ">
              {translate.privacy}
            </div>
            <div className="text-zinc-900 text-base leading-6  whitespace-nowrap">
              {translate.cookies}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
