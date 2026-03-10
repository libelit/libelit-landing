import { ReactNode } from "react";
import { PlacesType, Tooltip as ReactTooltip } from "react-tooltip";

const PLACES = [
  "top",
  "top-start",
  "top-end",
  "right",
  "right-start",
  "right-end",
  "bottom",
  "bottom-start",
  "bottom-end",
  "left",
  "left-start",
  "left-end",
];

interface ITooltip {
  anchorSelect: string | undefined;
  title?: string;
  text?: string;
  place?: PlacesType;
  children?: ReactNode;
}

const TooltipStyles = {
  borderRadius: "8px",
  lineHeight: "18px",
  maxWidth: "920px",
  backgroundColor: "#303030",
};

const Tooltip = ({ anchorSelect, title, text, place, children }: ITooltip) => {
  return (
    <div className="absolute">
      <ReactTooltip
        id={anchorSelect}
        opacity={1}
        place={place}
        style={TooltipStyles}
        className="!max-w-[320px] text-left z-50"
      >
        <p style={{ fontWeight: "600", fontSize: "12px" }}>{title}</p>
        <p style={{ fontWeight: "400", fontSize: "12px" }}>{text}</p>

        {children}
      </ReactTooltip>
      {/* <ReactTooltip id={anchorSelect} place={place} style={TooltipStyles} render={({content, activeAnchor}) => (
        <div>
        <p style={{fontWeight: "600", fontSize: "12px",}}>{title}</p>
        <p style={{fontWeight: "400", fontSize: "12px"}}>{text}</p>          
        </div>
      )} /> */}
    </div>
  );
};

export default Tooltip;
