/* 
    Description: Used for project description that has project information like status, proces and gives access to buy bricks for project
*/
"use client";
import React from "react";
import ProgressBar from "../ProgressBar";
import Button from "../Button/Button";
import Image from "next/image";
import ProjectImage from "../../../../public/images/project.png";
import moment from "moment";
import USDCIcon from "../USDCIcon";

interface listItems {
  label: string;
  value: any;
}

interface Items {
  label: "string";
  value: "string";
}

interface ProjectCardProps {
  meta: any;
  description: any;
  listItems: listItems[];
  onBuyClick: () => void;
  onViewClick: any;
  progressPercent: number;
  imageSrc: string;
  imageAlt: string;
  progressBarData: any;
  onViewButtonClick?: any;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  meta,
  description,
  listItems,
  onBuyClick,
  onViewClick,
  progressPercent,
  imageSrc,
  imageAlt,
  progressBarData,
  onViewButtonClick,
}) => {
  const handleBuyClick = (e: Event) => {
    onBuyClick();
    e.stopPropagation();
  };
  const handleViewClick = (e: Event) => {
    onViewClick(e);
  };
  console.log(progressPercent);
  return (
    <div
      className="cursor-pointer project-card-sm h-full"
      onClick={(e) => handleViewClick(e as any)}
    >
      <div className="project-image pos-rel">
        <div className="w-full h-[243px]">
          <Image src={imageSrc} alt={imageAlt} width={500} height={500} />
        </div>

        <div className="pos-abs  img-caption text-bold ">
          {meta.projectTitle} | {meta.projectLocation}
        </div>
      </div>

      <div className="project-desc flex flex-col justify-space-between h-full">
        <div className="project-desc-text text-md mb-auto">{description}</div>
        <ProgressBar
          progress={progressPercent}
          topLeftLabel={progressBarData?.topLeftLabel}
          topRightLabel={progressBarData?.topRightLabel?.replace("_", " ")}
          bottomLeftLabel={""}
          bottomRightLabel={""}
          color={progressBarData?.color}
        />
        <div className="project-price mt-20 ">
          {listItems?.map((item) => (
            <div key={item.label} className="flex-space-between mt-4">
              <div className="flex-item color-primary-800 text-regular text-lg ">
                {item.label}
              </div>
              <div
                className={`flex items-center gap-1 flex-item text-regular text-semiBold ${
                  item.label == "Available Bricks" ? " accent-500" : ""
                }`}
              >
                {item.label == "Project completion" && item.value
                  ? moment(+item.value).diff(
                      moment(new Date().getTime()),
                      "days"
                    ) + " days"
                  : item.label == "Brick price" || item.label == "Brick Price"
                  ? item.value?.split("$").map((part: any, index: any) => (
                      <>
                        {part}
                        {index < item.value?.split("$").length - 1 && (
                          <USDCIcon type="primary" className="w-4" />
                        )}{" "}
                      </>
                    ))
                  : item.value}
              </div>
            </div>
          ))}
        </div>

        {meta.viewButton && (
          <Button
            hierarchy="secondary"
            text="See project details"
            onClick={onViewButtonClick}
            size="lg"
            className={`mt-8 box-border btn home-btn text-lg text-semiBold sm-mt-12 w-100p mt-20 cursor-pointer !h-12 flex items-center justify-center`}
          />
        )}

        <Button
          hierarchy={meta.viewButton ? "primary" : "accent"}
          size="lg"
          text="Buy Bricks"
          onClick={handleBuyClick}
          btn-contained-dark
          className={`mt-8 btn home-btn text-lg text-semiBold sm-mt-12 w-100p mt-20 cursor-pointer ${
            meta.theme === "dark" ? "btn-contained-dark" : "btn-contained"
          }`}
        />
      </div>
    </div>
  );
};

export default ProjectCard;
