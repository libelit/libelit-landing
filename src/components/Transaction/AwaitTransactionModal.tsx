import React, { useEffect, useTransition } from "react";
import Modal from "../UiComponents/Modal";
import CloseIcon from "@icons/general/x-close-black-lg.svg";
import PiggyBankIcon from "@icons/finance/piggy-bank-wallet.svg";
import { useContainer } from "@/contexts/ContainerContext";
import { ethers } from "ethers";
function AwaitTransactionModal({
  isTransactionModalOpen,
  setIsTransactionModalOpen,
}: any) {
  const { transaction, setTransaction } = useContainer();

  // const watchTransaction = async () => {
  //   if (!window?.ethereum) return;
  //   console.log("here");
  //   const provider = new ethers.BrowserProvider(window.ethereum as any);
  //   provider.subscribe("data", async (txHash: any) => {
  //     console.log(txHash);
  //     const provider = new ethers.BrowserProvider(window.ethereum as any);
  //     const tx = await provider.getTransaction(txHash);
  //     console.log(tx);
  //   });
  // };

  // useEffect(() => {
  //   if (!transaction) return;

  //   const provider = new ethers.BrowserProvider(window.ethereum as any);
  //   const transactionHash = transaction.hash;

  //   const checkForReplacement = async () => {
  //     console.log("Checking");
  //     const tx = await provider.getTransaction(transactionHash);
  //     //console.log(tx);

  //     const newTx = await provider.getTransactionReceipt(transactionHash);
  //     //console.log(newTx);

  //     //   if (tx && tx.confirmations === (0 as any)) {
  //     //     const newTx = await provider.getTransactionReceipt(transactionHash);
  //     //     if (newTx) {
  //     //       console.log("Transaction Speed-up Detected");
  //     //       console.log("New transaction confirmed:", newTx);
  //     //     }
  //     //   }
  //   };
  //   const interval = setInterval(checkForReplacement, 1000);
  //   return () => {
  //     clearInterval(interval);
  //     setTransaction(null);
  //   };
  // }, [transaction]);

  return (
    <Modal
      isOpen={isTransactionModalOpen}
      className="buy-bricks-modal !h-[280px]"
    >
      <div className="flex-col gap-8 ">
        <div className="flex-space-between flex-center">
          <span className="circle-accent accent-500">
            <PiggyBankIcon />
          </span>
          <span className="cursor-pointer close-button">
            <CloseIcon onClick={() => setIsTransactionModalOpen(false)} />
          </span>
        </div>
      </div>

      <div className="flex-col flex-center mt-24">
        <div className="d-h4">Please wait for the transaction to complete.</div>
        <div className="mt-40 mb-40">
          <div className="loading"></div>
        </div>
      </div>
    </Modal>
  );
}

export default AwaitTransactionModal;
