import React from "react";
import Image from "next/image";
import PieIcon from "../../../../../public/icons/finance/pie.svg";
import ArrowupIcon from "../../../../../public/icons/finance/arrow-up.svg";
import Tooltip from "../../Tooltip";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import USDCIcon from "@/components/UiComponents/USDCIcon";

interface CardProps {
  titleIcon: any;
  titleText: string;
  amount: string;
  subIcon: any;
  subTextPercent: number;
  subText: string;
  className?: string;
  currentPage?: string;
  tooltipTitle?: string;
  tooltipText?: string;
  color?: string;
}

const Card: React.FC<CardProps> = ({
  titleIcon,
  titleText,
  amount,
  subIcon,
  subTextPercent,
  subText,
  className,
  currentPage,
  tooltipTitle,
  tooltipText,
  color,
}) => {
  const router = useRouter();
  const isDashboard = router.asPath.includes("/dashboard");
  const isDemo = router.asPath.startsWith("/demo");
  return (
    <>
      <Tooltip
        anchorSelect={`card-tooltip-${tooltipTitle}`}
        title={isDemo ? "Log in or sign up" : tooltipTitle}
        text={
          isDemo
            ? "Log in or sign up to connect your wallet and start investing."
            : tooltipText
        }
        place="top"
      />
      <div
        className={`h-[100%] relative card card-tooltip ${className} cursor-pointer `}
        data-tooltip-id={`card-tooltip-${tooltipTitle}`}
      >
        <div className="flex relative card-box">
          <div
            className={`flex-item 
          ${
            currentPage === "wallet" || currentPage == "dashboard"
              ? "card-main-icon "
              : ""
          }
          card-title-flex
        
          justify-start
        ${styles.titleContainer}
          `}
          >
            <div className="flex-item card-icon">
              {/* <Image className="card-icon" src={titleIcon} alt="Graph icon" /> */}
              {titleIcon}
            </div>
            <div className="flex-item text-regular card-title whitespace-nowrap overflow-hidden text-ellipsis max-w-[calc(100%-0px)]">
              {titleText}
            </div>
          </div>
          <div className={`${styles.amountContainer}`}>
            <div className="card-currency d-h1 color-primary-900 flex gap-4 items-center">
              <USDCIcon className="w-6" type={color} />
              {amount}
            </div>
            {/* <div className="card-progress flex flex-items-center">
                <div className="card-sub-icon">
                  {/* <Image src={subIcon} alt="finance arrow icon" /> */}
            {/*subIcon}
                </div>
                <div className="card-sub-text">
                  <div className="sub-text-percent">
                    <span className="card-percent">
                      <span className="text-semiBold">{subTextPercent}</span>%
                    </span>
                    <span className="sub-text"> {subText}</span>
                  </div>
                </div>
              </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
