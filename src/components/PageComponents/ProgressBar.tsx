import { useRouter } from "next/router";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";

interface IProgressBarProps {
  page: string;
  progress: number | null;
  topLeftLabel: any;
  topRightLabel: any;
  bottomLeftLabel: any;
  bottomRightLabel: any;
  color: string;
}

const ProgressBar = ({
  page,
  progress,
  topLeftLabel,
  topRightLabel,
  bottomLeftLabel,
  bottomRightLabel,
  color,
}: IProgressBarProps) => {
  const router = useRouter();
  // const path = router.pathname;
  // const destination = path.split("/").at(-1);

  const barColors: any = {
    primary: "#292D33",
    secondary: "#6F8190",
    accent: "#D25130",
  };
  const labelColor = color === "primary" ? "color-primary-900" : "accent-500";
  const barColor = barColors[color];

  const progressStyles = {
    width: `${progress}%`,
    backgroundColor: barColor,
  };

  return (
    <div>
      {progress != null ? (
        <>
          {" "}
          <div className={`mt-20 mb-4 flex flex-space-between ${labelColor}`}>
            <div className="flex-item flex text-lg text-bold color-primary-800">
              {/* {progress.toString()}% */}
              {topLeftLabel}
              {topLeftLabel && page === "project-details" ? "%" : ""}
            </div>
            <div className="flex-item text-lg text-bold color-primary-800">
              {topRightLabel}
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
            <div className="flex-item text-lg color-primary-500">
              {bottomLeftLabel} {bottomLeftLabel && "$"}
            </div>
            <div className="flex-item text-lg color-primary-500">
              {bottomRightLabel} {bottomRightLabel && "$"}
            </div>
          </div>
        </>
      ) : (
        <Skeleton className="w-full h-[80px] rounded-md" />
      )}
      {/* estimation block */}
    </div>
  );
};

export default ProgressBar;
