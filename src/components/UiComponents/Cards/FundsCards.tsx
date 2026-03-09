import React from "react";
import PieIcon from "@icons/finance/pie-wallet.svg";
import WalletIcon from "@icons/finance/wallet-wallet.svg";
import SmallWalletIcon from "@icons/finance/wallet.svg";
import PiggyBankIcon from "@icons/finance/piggy-bank-wallet.svg";
import Card from "@/components/UiComponents/Cards/FinanceCard/Card";
import ArrowupIcon from "@icons/finance/arrow-up.svg";

function FundsCards({ availableFundsData, balance }: any) {
  return (
    <div className="grid-container cards-container-wallet  max-w-[calc(100%)] overflow-auto">
      <div className="grid-item flex-1">
        <Card
          titleIcon={<PieIcon />}
          titleText={availableFundsData[0]?.titleText ?? "Total balance"}
          amount={balance ?? 0 + availableFundsData[2]?.amount ?? 0}
          subIcon={<ArrowupIcon />}
          subTextPercent={availableFundsData[0]?.performance_percent ?? 0}
          subText={availableFundsData[0]?.performance_duration ?? ""}
          className="card-common card-neutral card-lg "
          currentPage="wallet"
          tooltipTitle={availableFundsData[0]?.tooltip_title ?? ""}
          tooltipText={availableFundsData[0]?.tooltip_text ?? ""}
          color="primary"
        />
      </div>
      <div className="grid-item card-container  flex-1">
        <Card
          titleIcon={<WalletIcon />}
          titleText={availableFundsData[1]?.titleText ?? "Available USDC"}
          amount={balance == 0 ? "0" : String(balance)}
          subIcon={<ArrowupIcon />}
          subTextPercent={availableFundsData[1]?.performance_percent ?? 0}
          subText={availableFundsData[1]?.performance_duration ?? ""}
          className="card-common card-disabled"
          currentPage="wallet"
          tooltipTitle={availableFundsData[1]?.tooltip_title ?? ""}
          tooltipText={availableFundsData[1]?.tooltip_text ?? ""}
          color="secondary"
        />
      </div>
      <div className="grid-item card-container  flex-1">
        <Card
          titleIcon={<PiggyBankIcon />}
          titleText={availableFundsData[2]?.titleText ?? "Libelit Tokens"}
          amount={availableFundsData[2]?.amount ?? "0"}
          subIcon={<ArrowupIcon />}
          subTextPercent={availableFundsData[2]?.performance_percent ?? 0}
          subText={availableFundsData[2]?.performance_duration ?? ""}
          className="card-common card-enabled"
          currentPage="wallet"
          tooltipTitle={availableFundsData[2]?.tooltip_title ?? ""}
          tooltipText={availableFundsData[2]?.tooltip_text ?? ""}
          color="accent"
        />
      </div>
    </div>
  );
}

export default FundsCards;
