import { getDictionary } from "@/library/dictionaries";
import { Locale } from "@/i18n.config";
import Animate from "../UiComponents/Animate";

export async function Roadmap({ lang = "en" }: { lang: Locale }) {
  const { translate } = await getDictionary(lang);
  return (
    <>
      <div className="w-full lg:py-[112px] md:py-14 py-12 md:px-8 px-5">
        <div className="max-w-[1223px] justify-center m-auto">
          <div className="self-stretch flex flex-col">
            <div className="flex w-full max-w-[1223px] flex-col">
              <div className="flex justify-between gap-16 md:flex-row flex-col align-bottom item-end">
                <div className="flex flex-col gap-3 z-[1] relative">
                  <Animate type="pull-up-first" reverse>
                    <h3 className="subheading text-accent-400 color-accent-400">
                      {translate.roadmap_subheading}
                    </h3>
                  </Animate>
                  <Animate type="pull-up-second" reverse>
                    <h2 className="heading">{translate.road_map}</h2>
                  </Animate>
                </div>
                <div>
                  <Animate type="pull-up-third" reverse>
                    <a href={`/${lang}/roadmap/`}>
                      <button className="btn-secondary">
                        {translate.goto_roadmap}
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.16797 10.0013H15.8346M15.8346 10.0013L10.0013 4.16797M15.8346 10.0013L10.0013 15.8346"
                            stroke="#1C1C1C"
                            strokeWidth="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>
                    </a>
                  </Animate>
                </div>
              </div>
              <div className="mt-32 mb-10">
                <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                  <div className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0">
                    <div className="self-stretch flex grow flex-col rounded-2xl items-start max-md:max-w-full">
                      <Animate type="fade-in-first" reverse>
                        {" "}
                        <div className="justify-center items-center shadow-sm bg-accent-400 flex aspect-square flex-col w-14 h-14 px-3.5 rounded-[50px]">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/bda8f96da920ea15a4b097b04482543bf5d5082485c85c84b1264853fb9810bb?apiKey=4bdb733861e342ef8dd676167946912c&"
                            className="aspect-square object-contain object-center w-full overflow-hidden"
                          />
                        </div>{" "}
                      </Animate>
                      <Animate type="pull-up-first" reverse>
                        <div className="self-stretch text-neutral-950 text-xl font-bold leading-8 mt-4 max-md:max-w-full">
                          {translate.roadmap_heading_1}
                        </div>
                      </Animate>
                      <Animate type="pull-up-first" reverse>
                        <div
                          className="self-stretch text-neutral-700 text-base leading-6 mt-6 max-md:max-w-full"
                          dangerouslySetInnerHTML={{
                            __html: translate.roadmap_supporting_text_1,
                          }}
                        ></div>
                      </Animate>
                    </div>
                  </div>
                  <div className="flex flex-col items-stretch w-6/12 ml-5 max-md:w-full max-md:ml-0">
                    <div className="items-start flex grow flex-col rounded-2xl max-md:max-w-full max-md:mt-8">
                      <Animate type="fade-in-first" reverse>
                        <div className="justify-center items-center shadow-sm bg-accent-400 flex aspect-square flex-col w-14 h-14 px-3.5 rounded-[50px] self-start">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1f819e0f215c48359258487ee6ef8ba7461d9e5f68b84e34ab463786a4e6c2f8?apiKey=4bdb733861e342ef8dd676167946912c&"
                            className="aspect-square object-contain object-center w-full overflow-hidden"
                          />
                        </div>
                      </Animate>
                      <Animate type="pull-up-first" reverse>
                        <div className="self-stretch text-neutral-950 text-xl font-bold leading-8 mt-4 max-md:max-w-full">
                          {translate.roadmap_heading_2}
                        </div>
                      </Animate>
                      <Animate type="pull-up-first" reverse>
                        <div className="self-stretch text-neutral-700 text-base font-bold leading-6 mt-6 max-md:max-w-full">
                          {translate.roadmap_supporting_heading_1}
                        </div>
                      </Animate>
                      <Animate type="pull-up-first" reverse>
                        <div
                          className="self-stretch text-neutral-700 text-base leading-6 mt-1 max-md:max-w-full"
                          dangerouslySetInnerHTML={{
                            __html: translate.roadmap_supporting_description_1,
                          }}
                        ></div>
                      </Animate>
                      <Animate type="pull-up-first" reverse>
                        <div className="self-stretch text-neutral-700 text-base font-bold leading-6 sm:mt-4 max-md:max-w-full">
                          {translate.roadmap_supporting_heading_2}
                        </div>

                        <div
                          className="self-stretch text-neutral-700 text-base leading-6 mt-1 max-md:max-w-full"
                          dangerouslySetInnerHTML={{
                            __html: translate.roadmap_supporting_description_2,
                          }}
                        ></div>
                      </Animate>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
