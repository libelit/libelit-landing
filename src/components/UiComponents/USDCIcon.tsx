import USDCPrimary from "@icons/finance/usdc-primary.svg";
import USDCSecondary from "@icons/finance/usdc-secondary.svg";
import USDCAccent from "@icons/finance/usdc-accent.svg";

function USDCIcon({ type, className }: any) {
  return type == "primary" ? (
    <USDCPrimary className={className + " inline-block"} />
  ) : type == "secondary" ? (
    <USDCSecondary className={className + " inline-block"} />
  ) : (
    <USDCAccent className={className + " inline-block"} />
  );
}

export default USDCIcon;
//className="w-[14px] md:w-6"
