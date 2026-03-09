import React, { useState } from "react";
import CopyIcon from "@icons/general/copy-icon.svg";
import CheckIcon from "@icons/general/check.svg";
import Tooltip from "./Tooltip";

function CopyButton({ textToCopy, className }: any) {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <>
      {isCopied ? (
        <CheckIcon
          className={className}
          data-tooltip-id="copy-icon"
          onClick={() => {
            navigator.clipboard.writeText(textToCopy);
            setIsCopied(true);
          }}
          onMouseLeave={() => setTimeout(() => setIsCopied(false), 200)}
        />
      ) : (
        <CopyIcon
          className={className}
          data-tooltip-id="copy-icon"
          onClick={() => {
            navigator.clipboard.writeText(textToCopy);
            setIsCopied(true);
          }}
          onMouseLeave={() => setTimeout(() => setIsCopied(false), 200)}
        />
      )}

      <Tooltip
        anchorSelect={`copy-icon`}
        place="top"
        title={isCopied ? "Copied!" : "Copy Address"}
      />
    </>
  );
}

export default CopyButton;
