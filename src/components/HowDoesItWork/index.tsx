import Image from "next/image";
import downArrowRight from "icons/arrows/down-arrow-right.svg?url";
import downArrowLeft from "icons/arrows/down-arrow-left.svg?url";
import { getDictionary } from "@/library/dictionaries";
import { Locale } from "@/i18n.config";
import Animate from "../UiComponents/Animate";
interface Step {
  title: string;
  icon: string;
}

export async function HowDoesItWork({
  lang = "en",
  steps,
}: {
  lang: Locale;
  steps: Step[];
}) {
  const { translate } = await getDictionary(lang);

  return (
    <div className="bg-secondary-25 w-full lg:py-[112px] md:py-14 py-12 md:px-8 px-5">
      <Animate type="pull-up-first" reverse>
        <div className="max-w-[1223px] justify-center text-center m-auto">
          <div className="flex flex-col gap-3">
            <h3 className="subheading text-accent-400 color-accent-400">
              {translate.how_does_it_work_subheading}
            </h3>
            <h2 className="heading lg:mb-14 mb-12">
              {translate.how_does_it_work_heading}
            </h2>
            <ol>
              {steps.map((step, index) => (
                <li
                  key={index}
                  className="text-left md:text-right mb-32  blockchain-process relative"
                >
                  <div className="flex flex-row-reverse md:flex-row items-center  gap-24 md:gap-6">
                    <div className="flex flex-col items-stretch flex-1 change-title-order h4 text-regular">
                      {step.title}
                    </div>
                    <div className="flex flex-co items-stretch change-image-order">
                      <div className="items-center bg-white self-stretch flex flex-col justify-center md:w-[88px] md:h-[88px] w-[72px] h-[72px] px-5 rounded-[1000px]">
                        <Image
                          loading="lazy"
                          className="w-full process-icon"
                          src={step.icon}
                          alt={`step-${index + 1}`}
                        />
                      </div>
                    </div>
                    <div className="hidden flex-1 md:block"></div>
                  </div>
                  {index % 2 === 0 && index + 1 != steps.length ? (
                    <Image
                      loading="lazy"
                      className="w-5 absolute md:left-[calc(49%+50px)] bottom-[-47%] hidden md:block"
                      src={downArrowRight}
                      alt={`down arrow ${index}`}
                    />
                  ) : index + 1 != steps.length ? (
                    <Image
                      loading="lazy"
                      className="w-5 absolute md:right-[calc(49%+50px)] bottom-[-47%] hidden md:block"
                      src={downArrowLeft}
                      alt={`down arrow ${index}`}
                    />
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Animate>
    </div>
  );
}
