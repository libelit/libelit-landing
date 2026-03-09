import React, { useEffect, useState } from "react";
import Image from "next/image";
import TipIcon from "../../../../../public/icons/general/tip.svg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import axiosClient from "@/app/axiosClient";

interface TipProps {
  TipTitle?: string;
  TipSubtitle?: string;
  TipDescription?: string;
  className?: string;
}

const TipCard: React.FC<TipProps> = ({
  TipTitle,
  TipSubtitle,
  TipDescription,
  className,
}) => {
  const [tip, setTip] = useState<any>(null);

  const fetchData = async () => {
    const response = await axiosClient.get("faq/random");
    if (response.status == 200) {
      setTip(response.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className={className + " tip-container"}>
      <div className="card h-100">
        <div className="flex section-tip flex-wrap">
          <div className="flex-item">
            <div className="square-box flex flex-vertical-center bg-color-accent-25">
              <TipIcon className=" color-accent-500 rotate-180" />
              {/* <Image src={TipIcon} alt="Info Icon" /> */}
            </div>
          </div>
          <div className="flex-item flex-col tip-title ">
            <div className="text-lg color-primary-600 ">Tip of the day</div>
            <div className="d-h5 color-primary-900">
              {" "}
              {tip ? (
                tip.question
              ) : (
                <Skeleton className="block  min-w-[130px]  h-[20px]" />
              )}
            </div>
          </div>
        </div>
        <div className="tip-content text-lg color-primary-600">
          {tip ? (
            <div dangerouslySetInnerHTML={{ __html: tip.answer }} />
          ) : (
            <Skeleton className="block  w-full h-[120px] " />
          )}
        </div>
      </div>
    </div>
  );
};

export default TipCard;
