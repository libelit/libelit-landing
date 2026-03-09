"use client";
import React from "react";
import Tooltip from "../Tooltip";
import styles from "./styles.module.scss";
import CircleIcon from "@icons/shapes/Icon-1.svg";
import RightArrow from "@icons/arrows/Icon-12.svg";
import thumbsUp from "@icons/general/thumbs-up.svg?url";
import thumbsDown from "@icons/general/thumbs-down.svg?url";
import deleteIcon from "@icons/general/delete-black.svg?url";
import crossIcon from "@icons/general/x-close.svg?url";

import editIcon from "@icons/general/edit-accent.svg?url";
import Image from "next/image";

interface ButtonProps {
  forwardRef?: any;
  id?: string;
  text: any;
  onClick?: any;
  disabled?: boolean;
  className?: string;
  tooltipTitle?: string;
  tooltipText?: string;
  dataTooltipId?: string;
  type?: any;
  hierarchy?:
    | "accent"
    | "primary"
    | "secondaryAccent"
    | "secondary"
    | "tertiaryAccent"
    | "tertiaryGray"
    | "primaryDestructive"
    | "linkGrey";
  size?: "xxl" | "xl" | "lg" | "md" | "sm";
  icon?: null | "none" | "left" | "right" | "only";
  iconName?:
    | null
    | "circle"
    | "rightArrow"
    | "thumbs-up"
    | "thumbs-down"
    | "trash-01"
    | "edit"
    | "cross";
}

const classMap = {
  hierarchy: {
    accent: ` ${styles.btnAccent} `,
    primary: `${styles.btnPrimary}  `,
    secondaryAccent: `${styles.btnSecondaryAccent}  `,
    secondary: `${styles.btnSecondary}  `,
    tertiaryAccent: `${styles.btnTertiaryAccent}  `,
    tertiaryGray: `${styles.btnTertiaryGray}  `,
    primaryDestructive: `${styles.btnPrimaryDestructive}  `,
    linkGrey: `${styles.linkGrey}`,
  },

  size: {
    xxl: `${styles.btnXXLarge} d-h4`,
    xl: `${styles.btnXLarge} text-base  `,
    lg: `${styles.btnLarge} text-base `,
    md: `${styles.btnMedium} text-md `,
    sm: `${styles.btnSmall} text-xs  `,
  },

  icon: {
    none: "",
    left: styles.iconLeft,
    right: styles.iconRight,
    only: styles.iconOnly,
  },
};

const icons = {
  circle: <CircleIcon className={styles.icon} />,
  rightArrow: <RightArrow className={styles.icon} />,
  "thumbs-up": (
    <Image
      src={thumbsUp}
      width={16}
      height={16}
      alt="thumbs up"
      className={styles.icon}
    />
  ),
  "thumbs-down": (
    <Image
      src={thumbsDown}
      width={16}
      height={16}
      alt="thumbs down"
      className={styles.icon}
    />
  ),
  "trash-01": (
    <Image
      src={deleteIcon}
      width={20}
      height={20}
      alt="thumbs down"
      className={styles.icon}
    />
  ),

  edit: <Image width={18} height={18} src={editIcon} alt="edit icon" />,
  cross: <Image width={11} height={11} src={crossIcon} alt="delete icon" />,
};
const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  disabled = false,
  className,
  tooltipTitle,
  tooltipText,
  dataTooltipId,
  type,
  hierarchy,
  size,
  icon,
  iconName,
  id,
  forwardRef,
}) => {
  const handleClick = (e: any) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      ref={forwardRef}
      id={id ?? ""}
      type={type ? type : `button`}
      className={`text-semiBold align-center
      ${hierarchy != "linkGrey" && styles.btn} 
      ${hierarchy && classMap.hierarchy[hierarchy]}  
      ${size && classMap.size[size]}    
      ${
        icon == "only" &&
        styles.iconOnly &&
        (size == "sm"
          ? styles.paddingSm
          : size == "md"
          ? styles.paddingMd
          : styles.paddingLg)
      }
      ${hierarchy == "linkGrey" && "p-0 "}
      ${className}`}
      onClick={handleClick}
      disabled={disabled}
      data-tooltip-id={dataTooltipId}
    >
      <div
        className={` ${styles.btnContent}  
       ${icon && classMap.icon[icon]}`}
      >
        {icon != "only" && <div> {text}</div>}
        {icon != null && icon != "none" && iconName && icons[iconName]}
      </div>
      {(tooltipText || tooltipTitle) && (
        <Tooltip
          anchorSelect={dataTooltipId}
          title={tooltipTitle}
          text={tooltipText}
          place="top"
        />
      )}
    </button>
  );
};

export default Button;
