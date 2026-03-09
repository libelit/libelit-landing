import React from "react";
import TipIcon from "../../../../../public/icons/general/tip.svg";
import "react-loading-skeleton/dist/skeleton.css";

interface TipProps {
  TipTitle: string;
  TipSubtitle: string;
  TipDescription: string;
  className?: string;
}

const StaticTipCard: React.FC<TipProps> = ({
  TipTitle,
  TipSubtitle,
  TipDescription,
  className,
}) => {
  return (
    <div className={className + " tip-container"}>
      <div className="card h-100">
        <div className="flex section-tip flex-wrap">
          <div className="flex-item">
            <div className="square-box flex flex-vertical-center bg-color-accent-25 color-accent-500">
              <TipIcon className="  color-accent-500 rotate-180" />
              {/* <Image src={TipIcon} alt="Info Icon" /> */}
            </div>
          </div>
          <div className="flex-item flex-col tip-title ">
            <div className="text-lg color-primary-600 ">{TipTitle}</div>
            <div className="d-h5 color-primary-900"> {TipSubtitle}</div>
          </div>
        </div>
        <div className="tip-content text-lg color-primary-600">
          {TipDescription}
        </div>
      </div>
    </div>
  );
};

export default StaticTipCard;
