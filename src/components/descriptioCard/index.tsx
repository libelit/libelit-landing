import Image from "next/image";
import Animate from "../UiComponents/Animate";

export interface Description {
  heading: string;
  subheading: string;
  supporting_text: string;
  image: any;
  image_tablet: any;
}

interface DescriptionCardProps {
  description: Description;
}

export const DescriptionCard = ({
  description: { heading, subheading, supporting_text, image, image_tablet },
}: DescriptionCardProps) => {
  return (
    <div className="max-w-[1223px] justify-center m-auto lg:py-[112px] md:py-[56px] py-[48px] description-wrapper">
      <div className="lg:gap-20 flex lg:flex-row flex-col max-md:items-stretch flex-align-center">
        <div className="flex flex-col items-stretch lg:w-6/12 max-md:w-full max-md:ml-0">
          <Animate type="pull-up-first" reverse>
            <h3 className="subheading text-accent-400 mb-3">{subheading}</h3>
          </Animate>
          <Animate type="pull-up-second" reverse>
            <h2 className="heading mb-6">{heading}</h2>
          </Animate>
          <Animate type="pull-up-third" reverse>
            <div
              className="supporting-text"
              dangerouslySetInnerHTML={{ __html: supporting_text }}
            ></div>
          </Animate>
        </div>

        <div className="flex flex-col items-stretch lg:w-6/12 md:w-full max-md:w-full max-md:ml-0 lg-change-order">
          <Animate type="pull-up-third" reverse disableHide>
            <Image
              loading="lazy"
              className="w-full overflow-hidden max-md:mt-8 md:hidden lg:block"
              src={image}
              alt={subheading}
            />
            <Image
              loading="lazy"
              className="w-full overflow-hidden md:mt-8 max-md:mt-10 hidden md:block lg:hidden"
              src={image_tablet}
              alt={subheading}
            />
          </Animate>
        </div>
      </div>
    </div>
  );
};
