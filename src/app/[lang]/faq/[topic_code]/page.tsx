"use client";

import React, { useEffect, useState } from "react";

import leftArrow from "@icons/arrows/left-arrow.svg?url";
import planeIcon from "@icons/general/Icon-26.svg?url";
import arrowUpIcon from "@icons/arrows/Icon-3.svg?url";
import arrowDownIcon from "@icons/arrows/Icon-1.svg?url";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import sunIcon from "@icons/shapes/Icon-5.svg?url";
import axiosClient from "@/app/axiosClient";

const faqs: any = {
  "getting-started": {
    icon: planeIcon,
    heading: "Getting Started",
    subheading: " Set up and start managing your account.",
    qans: [
      {
        question: "What is Libelit?",
        answer: " Libelit is a platform to......",
      },
      {
        question: "What is Libelit?",
        answer: " Libelit is a platform to......",
      },
      {
        question: "What is Libelit?",
        answer: " Libelit is a platform to......",
      },
    ],
  },
  "what-is-libelit": {
    icon: sunIcon,
    heading: "What is Libelit",
    subheading: "Out mission and vision",
    qans: [
      {
        question: "What is Libelit?",
        answer: " Libelit is a platform to......",
      },
      {
        question: "What is Libelit?",
        answer: " Libelit is a platform to......",
      },
      {
        question: "What is Libelit?",
        answer: " Libelit is a platform to......",
      },
    ],
  },
};

function page({ params }: any) {
  const { lang, topic_code } = params;
  const router = useRouter();

  const [data, setData] = useState<any>(null);

  const fetchData = async () => {
    const response = await axiosClient.get("/faq/get");
    if (response.status == 200) {
      setData(response.data.filter((d: any) => d.topic_code == topic_code)[0]);
      return;
    }

    redirect(`/${lang}/faq`);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const qans = data?.data ?? [];

  const [expand, setExpand] = useState(qans?.map(() => 0));

  const expandQuestion = (i: number) => {
    const new_expand = [...expand];
    new_expand[i] = 1;
    setExpand(new_expand);
  };

  const collapseQuestion = (i: number) => {
    const new_expand = [...expand];
    new_expand[i] = 0;
    setExpand(new_expand);
  };

  const icon = data?.imageUrl;
  const heading = data?.topic;
  const subheading = data?.topicPhrase;

  if (!data)
    return (
      <div className="loader-container">
        <div className="loading"></div>
      </div>
    );

  return (
    <div className="w-full px-[16px] md:px-[32px] lg:px-[112px]">
      <div className="max-w-[1223px] mx-[auto]">
        <div className="py-[64px]">
          {/* heading */}
          <div className="flex gap-[8px] items-center">
            <div className="p-[12px]">
              <Image
                src={leftArrow}
                alt="back"
                className="w-[20px] p-[3px] cursor-pointer"
                onClick={() => router.push(`/${lang}/faq`)}
              />
            </div>
            <div className="d-h2">FAQ</div>
          </div>

          {/* category */}
          <div className="flex gap-[16px] mt-[32px] items-start">
            <div className="bg-accent-25 rounded-[8px] p-[16px]">
              <Image
                src={icon}
                className="w-[32px]"
                alt={data.topic}
                width={32}
                height={32}
              />
            </div>
            <div>
              <div className="d-h3">{heading}</div>
              <div className="text-lg">{subheading}</div>
            </div>
          </div>

          <div className="mt-[32px] d-h3">FAQ</div>
          <div className="divider-grey mt-[8px]"></div>

          {/* questions */}
          <div className="mt-[32px]">
            {qans.map((faq: any, i: number) => (
              <div key={i}>
                <div className="question-container flex justify-between  items-center">
                  <div className="d-h4">{faq.question}</div>
                  {expand[i] ? (
                    <Image
                      src={arrowUpIcon}
                      className="cursor-pointer"
                      alt="collapse"
                      onClick={() => collapseQuestion(i)}
                    />
                  ) : (
                    <Image
                      src={arrowDownIcon}
                      className="cursor-pointer"
                      alt="expand"
                      onClick={() => expandQuestion(i)}
                    />
                  )}
                </div>
                {!!expand[i] && (
                  <div
                    className="mt-[24px] text-base  [&>a]:underline"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                )}

                <div className="divider-grey mt-[24px]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
