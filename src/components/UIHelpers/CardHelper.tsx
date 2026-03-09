import React from "react";
import PieIcon from "../../../public/icons/finance/pie-wallet.svg";
import WalletIcon from "../../../public/icons/finance/wallet-wallet.svg";
import PiggyBankIcon from "../../../public/icons/finance/piggy-bank-wallet.svg";
import ArrowupIcon from "../../../public/icons/finance/arrow-up.svg";

const getCardIcon = (code: string) => {
  if (code === "total_balance") {
    return <PieIcon />;
  } else if (code === "wallet") {
    return <WalletIcon />;
  } else if (code === "savings") {
    return <PiggyBankIcon />;
  }
};

const getPerformanceIcon = (performance: string) => {
  if (performance === "positive") {
    return <ArrowupIcon />;
  } else if (performance === "negative") {
    return <ArrowupIcon />;
  } else if (performance === "neutral") {
    return <ArrowupIcon />;
  }
};

const getCardClass = (cardProperty: any) => {
  if (cardProperty.code === "total_balance") {
    return "card-neutral card-lg";
  } else if (cardProperty.code === "wallet") {
    if (cardProperty.is_connected) {
      return "card-neutral ";
    } else {
      return "card-disabled";
    }
  } else if (cardProperty.code === "savings") {
    return "card-enabled";
  }
};

export { getCardClass, getCardIcon, getPerformanceIcon };
