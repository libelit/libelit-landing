/* eslint-disable @next/next/no-img-element */
import { Locale } from "@/i18n.config";
import { StaticImageData } from "next/image";
import { type ReactNode } from "react";

interface Social {
  name: string;
  url: string;
  icon: ReactNode;
}

export interface TeamPerson {
  name: string;
  role: string;
  image: StaticImageData;

  smImage: StaticImageData;
  description: { en: string; pl: string };
  socials: Social[];
}

interface TeamCardProps {
  person: TeamPerson;
  lang: Locale;
  size: "sm" | "md" | "lg";
}

export const TeamCard = ({
  person: { image, smImage, name, role, socials, description },
  lang,
  size,
}: TeamCardProps) => {
  return (
    <div
      className={`w-full group overflow-ellipsis overflow-hidden relative rounded-xl ${
        size == "sm"
          ? "h-[280px] md:h-[264px] lg:h-[392px]"
          : size == "md"
          ? "h-[312px] lg:h-[440px]"
          : "h-[336px] lg:h-[496px]"
      } flex flex-col justify-end `}
    >
      <img
        className=" hidden md:block w-full h-full object-cover absolute top-0 left-0"
        src={image.src}
        alt={name}
      />

      <img
        className=" block md:hidden w-full h-full object-cover absolute top-0 left-0"
        src={smImage.src}
        alt={name}
      />

      <div
        className={`z-1 overflow-ellipsis w-full group-hover:grow transition-all duration-300 ease-in-out cursor-pointer flex flex-col p-[20px]  ${
          size == "sm" ? "md:p-4" : "md:p-[20px]"
        } lg:p-6 gap-2 border-t border-t-white/50 bg-[rgba(183, 183, 183, 0.3)] group-hover:bg-[rgba(183, 183, 183, 0.9)] blur-background backdrop-blur-max overflow-x-auto`}
      >
        <div className="w-full flex justify-between items-center">
          <h5
            className={`text-white font-bold ${
              size == "sm"
                ? "sm:text-xl md:text-lg lg:text-2xl"
                : "text-[1.25rem]"
            } leading-[1.875rem] lg:text-2xl  lg:leading-8`}
          >
            {name}
          </h5>
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className="ml-4"
            >
              {social.icon}
            </a>
          ))}
        </div>
        <p
          className={`text-white ${
            size == "sm"
              ? "text-md lg:text-base font-normal font-normal"
              : "text-lg lg:text-lg lg:leading-7 sm:font-normal lg:font-medium "
          }  `}
        >
          {role}
        </p>
        <div className="text-md h-0 transition-all delay-150 duration-300 group-hover:h-[315px] text-ellipsis overflow-hidden text-white ">
          {description[lang] == `` ? description.pl : description[lang]}
        </div>
      </div>
    </div>
  );
};
