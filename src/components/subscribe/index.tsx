import { getDictionary } from "@/library/dictionaries";
import { Locale } from "@/i18n.config";

export async function Subscribe({ lang = "en" }: { lang: Locale }) {
  const { translate } = await getDictionary(lang);
  return (
    <>
      <div className="w-full max-w-[1216px] m-auto bg-secondary-25 rounded-[14px]">
        <div className="items-center self-stretch flex w-full flex-col justify-center mt-4  p-6 md:p-8 lg:p-16  max-md:max-w-full gap-[32px] ">
          <div className="flex flex-col gap-[20px]">
            <h2 className="self-stretch text-black text-center font-bold lg:text-[44px] lg:leading-[52px] md:text-3xl md:leading-[38px] text-2xl">
              {translate.are_you_interested}
            </h2>
            <p className="text-neutral-700 text-center lg:leading-[30px] md:text-lg md:leading-[26px] text-base mb-3">
              {translate.cta_text}
            </p>
          </div>
          <div className="flex gap-24 md:flex-row flex-col">
            <div className="flex flex-col gap-1.5">
              <input
                type="email"
                className="border border-[color:var(--Primary-200,#C2C2C2)] shadow-sm bg-white bg-opacity-20 justify-center px-3.5 py-3 rounded-lg border-solid"
                placeholder="Enter your email"
              />
              <p className="text-neutral-500 text-sm leading-5">
                We care about your data privacy. Check our
                <span className="font-semibold"> Privacy Policy.</span>
              </p>
            </div>
            <div>
              <button className="btn-accent grow md:w-auto w-full">
                {translate.subscribe}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
