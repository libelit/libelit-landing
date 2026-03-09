import { useState } from "react";
import MetamaskIcon from "../../../public/icons/finance/metamask.svg";
import EditIcon from "../../../public/icons/general/edit.svg";
import DeleteIcon from "../../../public/icons/general/x-close.svg";
import CheckIcon from "@icons/general/check.svg";

import Image from "next/image";
import { ErrorMessage } from "formik";

function MyWallet({
  accounts,
  disconnectWallet,
  walletName,
  setWalletName,
}: {
  accounts: any;
  disconnectWallet: any;
  walletName: string;
  setWalletName: any;
}) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [walletLocalName, setWalletLocalName] = useState(walletName);

  const isNameEmpty = (walletLocalName: string) => {
    if (walletLocalName.length == 0) {
      return true;
    }
    return false;
  };
  return (
    <div className="flex gap-20 mywallet-container ">
      {/* {accounts.map((acc: any) => (
        <div key={acc.address}>
          Account:{acc.address} <br />
          Balance: {Number(acc.balance)}
          <br />
        </div>
      ))} */}
      <div className="mywallet-image">
        <MetamaskIcon />
      </div>
      <div className="mywallet-details">
        <div className="">
          {isEditingName ? (
            <>
              <div
                className={`flex gap-[4px] cursor-pointer items-center form-input-container form-field !mb-0`}
              >
                <input
                  className={`!max-w-[300px] h-[36px] text-lg  text-regular text-black ${
                    isNameEmpty(walletLocalName) && "error-field"
                  }`}
                  onChange={(e) => setWalletLocalName(e.target.value)}
                  value={walletLocalName}
                />

                <div
                  className="p-[2px] bg-primary-100 border-0 rounded-[4px] flex items-center"
                  onClick={() => {
                    if (!isNameEmpty(walletLocalName)) {
                      setWalletName(walletLocalName);
                      setIsEditingName(false);
                    }
                  }}
                >
                  <CheckIcon
                    width={28}
                    height={28}
                    stroke="#E66C4B"
                    stroke-width="2"
                  />
                </div>
              </div>
              <span className="error form-error-section text-md text-regular">
                {isNameEmpty(walletLocalName)
                  ? "Wallet name cannot be null."
                  : ""}
              </span>
            </>
          ) : (
            <>
              <div className="mywallet-wallet-name inline-block">
                {walletName}
              </div>
              <div className="mywallet-action-icon">
                {" "}
                <EditIcon onClick={() => setIsEditingName(true)} />
              </div>
              <div className="mywallet-action-icon">
                {" "}
                <DeleteIcon onClick={disconnectWallet} />
              </div>
            </>
          )}
        </div>
        <div className="mywallet-wallet-address text-primary-600">
          {accounts[0]?.address}
        </div>
      </div>
    </div>
  );
}

export default MyWallet;
