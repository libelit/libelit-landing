import { useRouter } from "next/router";
import { useState } from "react";
import USDCIcon from "./USDCIcon";
import infoIcon from "@icons/general/help-circle-gray.svg?url";
import Image from "next/image";
import Tooltip from "./Tooltip";

interface IProgressBarProps {
  progress: Number;
  topLeftLabel: any;
  topRightLabel: string;
  bottomLeftLabel: any;
  bottomRightLabel: any;
  color: string;
  tooltip?: Boolean;
}

const ProgressBar = ({
  progress,
  topLeftLabel,
  topRightLabel,
  bottomLeftLabel,
  bottomRightLabel,
  color,
  tooltip,
}: IProgressBarProps) => {
  const router = useRouter();
  // const path = router.pathname;
  // const destination = path.split("/").at(-1);

  const barColors: any = {
    primary: "#292D33",
    secondary: "#6F8190",
    accent: "#D25130",
  };
  const labelColors: any = {
    primary: "color-primary-900",
    secondary: "color-secondary-800",
    accent: "accent-500",
  };
  const labelColor = labelColors[color];
  const barColor = barColors[color];

  const progressStyles = {
    width: `${progress}%`,
    backgroundColor: barColor,
  };

  return (
    <div>
      {/* estimation block */}
      <div className={`mt-20 mb-4 flex flex-space-between ${labelColor}`}>
        <div className="flex-item text-lg text-bold flex items-center gap-1">
          {/* {progress.toString()}% */}
          {topLeftLabel?.split("$").map((part: any, index: any) => (
            <>
              {part}
              {index < topLeftLabel?.split("$").length - 1 && (
                <USDCIcon type="accent" className="w-4" />
              )}{" "}
            </>
          ))}
        </div>
        <div
          className={`flex items-center gap-1 flex-item text-lg text-bold ${
            color == "accent" && "color-primary-900"
          }`}
        >
          {topRightLabel?.split("$").map((part: any, index: any) => (
            <>
              {part}
              {index < topRightLabel?.split("$").length - 1 && (
                <USDCIcon type="accent" className="w-4" />
              )}{" "}
            </>
          ))}
          {tooltip && (
            <>
              {" "}
              <Image
                data-tooltip-id="info"
                src={infoIcon}
                width={16}
                alt="info icon "
                className="cursor-pointer"
              />
              <Tooltip
                anchorSelect={`info`}
                // title={"Bricks number"}
                place="top"
              >
                <div className="text-sm">
                  <div className="mt-[4px] md:mt-[8px] text-regular">
                    <span className=" text-accent-400 text-accent-400 text-semiBold">
                      Project Funding:{" "}
                    </span>
                    - The amount of funds raised for this development project.
                  </div>
                  <div className="mt-[4px] md:mt-[8px] text-regular">
                    <span className=" text-accent-400 text-semiBold">
                      Min Goal:{" "}
                    </span>{" "}
                    The minimum amount of funds required to be raised for the
                    project to receive additional financing from traditional
                    banking. This includes initial funds provided by the
                    development team.
                  </div>
                  <div className="mt-[4px] md:mt-[8px] text-regular">
                    <span className=" text-accent-400 text-semiBold">
                      Max Goal:{" "}
                    </span>{" "}
                    The maximum amount of funds required for this project, which
                    is also the total project cost.
                  </div>

                  <div className="mt-[4px] md:mt-[8px] text-regular">
                    <span className=" text-accent-400 text-semiBold">
                      Brick Price:{" "}
                    </span>{" "}
                    The price of an individual token.
                  </div>

                  <div className="mt-[4px] md:mt-[8px] text-regular">
                    <span className=" text-accent-400 text-semiBold">
                      Available Bricks:{" "}
                    </span>{" "}
                    The number of tokens available for purchase.
                  </div>

                  <div className="mt-[4px] md:mt-[8px] text-regular">
                    <span className=" text-accent-400 text-semiBold">
                      Return Estimate (ROI):{" "}
                    </span>{" "}
                    The forecasted benefit from the entire project duration in
                    relation to the investment cost.
                  </div>

                  <div className="mt-[4px] md:mt-[8px] text-regular">
                    <span className=" text-accent-400 text-semiBold">
                      Project Completion:{" "}
                    </span>{" "}
                    The time remaining until the project is completed.
                  </div>
                </div>
              </Tooltip>
            </>
          )}
        </div>
      </div>
      {/* #estimation block */}

      {/* estimation graph */}
      <div className="progress-container">
        <div
          className={`progress-bar ${labelColor}`}
          style={progressStyles}
        ></div>
      </div>
      {/* #estimation graph */}

      <div className="mt-4 flex-space-between">
        <div className="flex-item text-md color-primary-500 flex items-center gap-1">
          {bottomLeftLabel?.split("$").map((part: any, index: any) => (
            <>
              {part}
              {index < bottomLeftLabel?.split("$").length - 1 && (
                <USDCIcon type="secondary" className="w-4" />
              )}{" "}
            </>
          ))}
        </div>
        <div className="flex-item text-md color-primary-500 flex items-center gap-1">
          {bottomRightLabel?.split("$").map((part: any, index: any) => (
            <>
              {part}
              {index < bottomRightLabel?.split("$").length - 1 && (
                <USDCIcon type="secondary" className="w-4" />
              )}{" "}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
