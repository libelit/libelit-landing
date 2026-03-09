/* 

    Description: Used for project description that has project information like status, proces and gives access to buy bricks for project
*/
"use client";
import React from "react";
import ProgressBar from "../../ProgressBar";
import Button from "../../Button/Button";
import Image from "next/image";
import ProjectImage from "../../../../public/images/project.png";
import "./project.card.large.scss";

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
  onViewClick: () => void;
  progressPercent: number;
  imageSrc: string;
  imageAlt: string;
  progressBarData: any;
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
}) => {
  const handleBuyClick = () => {
    onBuyClick();
  };
  const handleViewClick = () => {
    onViewClick();
  };
  return (
    <div className="project-card project-details">
      <div className="project-card-sm">
        <div className="project-image pos-rel">
          <Image src={imageSrc} alt={imageAlt} width="956" height="541" />
          <div className="pos-abs img-caption text-bold">
            {meta.projectTitle} | {meta.projectLocation}
          </div>
        </div>

        <div className="meta-project-info flex project-desc-text">
          <div>Start</div>
          <div>End</div>
          <div>Blockchain</div>
          <div>Ethereum</div>
        </div>

        <div className="project-desc">
          <div className="project-desc-text text-md">{description}</div>
          <ProgressBar
            progress={progressPercent}
            topLeftLabel={progressBarData.topLeftLabel}
            topRightLabel={progressBarData.topRightLabel?.replace("_", " ")}
            bottomLeftLabel={""}
            bottomRightLabel={""}
            color={progressBarData.color}
          />
          <div className="project-price mt-20">
            {listItems.map((item) => (
              <div key={item.label} className="flex-space-between mt-4">
                <div className="flex-item color-primary-800 text-regular">
                  {item.label}
                </div>
                <div className="flex-item text-regular text-bold">
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          <Button
            text="Buy Bricks"
            onClick={handleBuyClick}
            btn-contained-dark
            className={`btn home-btn text-lg sm-mt-12 w-100p mt-20 cursor-pointer ${
              meta.theme === "dark" ? "btn-contained-dark" : "btn-contained"
            }`}
          />
          <Button
            text="View Detail"
            onClick={handleViewClick}
            btn-contained-dark
            className={`btn home-btn text-lg sm-mt-12 w-100p mt-20 btn-outlined cursor-pointer`}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
