import Image from "next/image";

export interface Support {
  heading: string;
  supporting_text: string;
  support_text: string;
  loading_icon: string;
  support_icon: string;
}

interface SupportCardProps {
  support: Support;
}

export const SupportCard = ({
  support: {
    heading,
    supporting_text,
    support_text,
    loading_icon,
    support_icon,
  },
}: SupportCardProps) => {
  return (
    <div className="flex flex-col lg:w-12/12 md:w-4/12  items-stretch border border-[color:var(--Secondary-25,#F4F5F7)] bg-secondary-25 p-6 rounded-2xl box-shadow">
      <div className="text-primary-900 text-2xl font-bold leading-8 mb-2.5">
        {heading}
      </div>
      <div className="text-primary-600 text-md leading-5 mb-4 grow">
        {supporting_text}
      </div>
      <div className="flex w-full items-stretch justify-between gap-5 text-accent-500 max-md:max-w-full max-md:flex-wrap">
        <div className="items-stretch flex gap-2 mt-5 self-end">
          <Image
            loading="lazy"
            className="aspect-square object-contain object-center w-5 shrink-0"
            src={loading_icon}
            alt="loading..."
          />
          <div className="text-accent500 text-md leading-5 grow whitespace-nowrap">
            {support_text}
          </div>
        </div>

        <div className="justify-center items-center shadow-lg bg-white flex aspect-square flex-col w-[46px] h-[46px] px-2 rounded-lg">
          <Image
            loading="lazy"
            className="aspect-square object-contain object-center w-full"
            src={support_icon}
            alt="file attachment"
          />
        </div>
      </div>
    </div>
  );
};
