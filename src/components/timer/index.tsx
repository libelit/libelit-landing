"use client";
import { Locale } from "@/i18n.config";
import { getDictionary } from "library/dictionaries";
import { useEffect, useState } from "react";
import { Social } from "@/components/social";
import Animate from "../UiComponents/Animate";

export function Timer({ lang = "en" }: { lang: Locale }) {
  const [translate, setTranslate] = useState({ time_left_to_launch: "" });
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    getDictionary(lang).then(({ translate }) => setTranslate(translate));

    const interval = setInterval(() => {
      const lunch_date = new Date(Date.UTC(2024, 9, 26, 8, 0, 0));
      const current_local_date = new Date();
      const current_date = new Date();
      var utc_timestamp = Date.UTC(
        current_local_date.getUTCFullYear(),
        current_local_date.getUTCMonth(),
        current_local_date.getUTCDate(),
        current_local_date.getUTCHours(),
        current_local_date.getUTCMinutes(),
        current_local_date.getUTCSeconds(),
        current_local_date.getUTCMilliseconds()
      );

      const diff =
        new Date(lunch_date).getTime() - new Date(current_date).getTime();
      setDays(Math.floor(diff / 1000 / 60 / 60 / 24));
      setHours(Math.floor((diff / 1000 / 60 / 60) % 24));
      setMinutes(Math.floor((diff / 1000 / 60) % 60));
      setSeconds(Math.floor((diff / 1000) % 60));
    }, 1000);
    return () => clearInterval(interval);
  }, [lang]);

  return (
    <div className="max-w-[1223px] justify-center m-auto lg:pt-[48px] lg:pb-[72px] md:pt-[48px] pt-[32px] pb-[48px] text-center">
      <h3 className="font-bold text-3xl leading-[2.375rem] md:text-4xl md:leading-[2.75rem] lg:text-[2.75rem] lg:leading-[3.5rem] mb-10">
        <Animate type="pull-up-first" reverse>
          {" "}
          {translate.time_left_to_launch}
        </Animate>
      </h3>
      <Animate type="pull-up-third" reverse>
        <div className="bg-secondary-25 py-12 px-6 w-full rounded-[14px] mb-10">
          <div className="flex flex-start justify-center">
            <div className="flex flex-col md:min-w-[115px] min-w-[55px]">
              <div className="md:text-[64px] lg:text-[80px] text-[38px] md:leading-[84px] leading-[44px] font-bold text-accent-400 md:mb-6 mb-2">
                {String(days).padStart(2, "0")}
              </div>
              <div className="md:text-[22px] text-[12px] leading-6">days</div>
            </div>
            <div className="flex  lg:mx-5 mx-[2px] md:text-[64px] lg:text-[80px] text-[38px] md:leading-[84px] leading-[44px] font-bold text-accent-400">
              <span>:</span>
            </div>
            <div className="flex flex-col md:min-w-[115px] min-w-[55px]">
              <div className="md:text-[64px] lg:text-[80px] text-[38px] md:leading-[84px] leading-[44px] font-bold text-accent-400 md:mb-6 mb-2">
                {String(hours).padStart(2, "0")}
              </div>
              <div className="md:text-[22px] text-[12px] leading-6">hours</div>
            </div>
            <div className="flex  lg:mx-5 mx-[2px] md:text-[64px] lg:text-[80px] text-[38px] md:leading-[84px] leading-[44px] font-bold text-accent-400">
              <span>:</span>
            </div>
            <div className="flex flex-col md:min-w-[115px] min-w-[55px]">
              <div className="md:text-[64px] lg:text-[80px] text-[38px] md:leading-[84px] leading-[44px] font-bold text-accent-400 md:mb-6 mb-2">
                {String(minutes).padStart(2, "0")}
              </div>
              <div className="md:text-[22px] text-[12px] leading-6">
                minutes
              </div>
            </div>
            <div className="flex  lg:mx-5 mx-[2px] md:text-[64px] lg:text-[80px] text-[38px] md:leading-[84px] leading-[44px] font-bold text-accent-400">
              <span>:</span>
            </div>
            <div className="flex flex-col md:min-w-[115px] min-w-[55px]">
              <div
                className="md:text-[64px] lg:text-[80px] text-[38px] md:leading-[84px] leading-[44px] font-bold text-accent-400 md:mb-6 mb-2"
                id="seconds"
              >
                {String(seconds).padStart(2, "0")}
              </div>
              <div className="md:text-[22px] text-[12px] leading-6">
                seconds
              </div>
            </div>
          </div>
        </div>
      </Animate>
      <Animate type="fade-in-second">
        <div className="flex gap-3 justify-center">
          <Social />
        </div>
      </Animate>
    </div>
  );
}
