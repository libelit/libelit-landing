import ProgressBar from "@/components/UiComponents/ProgressBar";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import Image from "next/image";
import infoIcon from "@icons/general/help-circle-gray.svg?url";
import moment from "moment";
import Button from "../Button/Button";
import { useRouter } from "next/router";
import Modal from "@/components/UiComponents/Modal";
import CloseIcon from "/public/icons/general/x-close.svg";
import CheckIcon from "/public/icons/general/check.svg";
import DeleteIcon from "/public/icons/general/delete-red.svg";
import { removeTokensFromSale } from "../Forms/utils";
import { useAlert } from "@/contexts/AlertContext";
import AwaitTransactionModal from "@/components/Transaction/AwaitTransactionModal";
import axiosClient from "@/app/axiosClient";
import { useContainer } from "@/contexts/ContainerContext";
import styles from "./datatable.module.scss";
import USDCIcon from "../USDCIcon";
import Tooltip from "../Tooltip";

function PortfolioExpandedRowData({
  isPortfolioPage,
  isExpanded,
  row,
  expandedRowData,
  data,

  rowIndex,
}: any) {
  const [resaleData, setResaleData] = useState<any>();

  const { accounts } = useContainer();
  console.log(accounts, data);

  const fetchResaleData = async () => {
    const response = await axiosClient.get(
      `/resellBricks/getResaleTokensForProject?walletId=${accounts[0].address}&projectId=${data.projectId}`
    );

    if (response.status == 200) {
      setResaleData(response.data);
      console.log(response.data);
    }
  };

  useEffect(() => {
    fetchResaleData();
  }, []);

  const router = useRouter();

  const calculateCompletionDays = (startTime: number, endTime: number) => {
    const formattedStartTime = moment(startTime);
    const formattedEndTime = moment(endTime);
    const diff = formattedEndTime.diff(formattedStartTime, "days");
    return diff;
  };

  const { alert } = useAlert();

  const handleDelete = async () => {
    setIsDeleteModalOpen(false);
    setIsAwaitModelOpen(true);

    try {
      await removeTokensFromSale("0x5DBfdAC1BE2F0a3941849b3614D2bB48DF48ef76");
      alert("The bricks were successfully removed from resale.", "success");
    } catch (error) {
      alert(
        "There was some error during the transaction. Please try again.",
        "error"
      );
    }
    setIsAwaitModelOpen(false);
  };
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAwaitModelOpen, setIsAwaitModelOpen] = useState(false);
  console.log(expandedRowData);
  return (
    <>
      {" "}
      {isPortfolioPage && isExpanded && (
        <>
          <tr key={row.id} className="relative ">
            <td className="w-[calc(100vw-32px)] md:w-[calc(100vw-64px)] lg:w-full absolute flex flex-col">
              <div className=" flex   justify-between   px-5 py-5 gap-16 portfolio-project-details">
                <div className="project-defail-stats grow flex gap-8 flex-items-center  ">
                  <div className="flex flex-col w-full">
                    <div className="project-detail-progress item w-full">
                      <ProgressBar
                        // progress={projectDetail.projectMeta.execution.progress}  // need to update API to include this field
                        progress={
                          expandedRowData?.projectMeta.execution
                            .progressPercentage
                            ? expandedRowData?.projectMeta.execution
                                .progressPercentage
                            : expandedRowData?.projectMeta.execution
                                .progressPercentage == 0
                            ? 0
                            : 12.5
                        }
                        // page="project-details"
                        topLeftLabel={
                          expandedRowData?.projectMeta.execution.topLeftLabel
                        }
                        topRightLabel={expandedRowData?.projectMeta.execution.topRightLabel?.replace(
                          "_",
                          " "
                        )}
                        bottomLeftLabel={""}
                        bottomRightLabel={""}
                        color="accent"
                      />
                    </div>
                    <div className="flex  gap-4 mt-24 portfolio-financial-detail-container w-full">
                      <div className="item flex w-full justify-between md:justify-start md:flex-col min-w-[160px] basis-[224px] grow">
                        {expandedRowData ? (
                          <>
                            <div className="item text-lg">Brick Price:</div>
                            <div className="item item-value text-bold flex items-center gap-1">
                              <USDCIcon type="primary" className="w-4" />
                              {expandedRowData?.projectMeta.unitPricePerBrick}
                            </div>
                          </>
                        ) : (
                          <div className="w-full">
                            <Skeleton className="h-[60px]  w-full" />
                          </div>
                        )}
                      </div>

                      <div className="item flex w-full justify-between md:justify-start md:flex-col min-w-[160px] basis-[224px] grow">
                        {expandedRowData ? (
                          <>
                            {" "}
                            <div className="item text-lg flex gap-4">
                              Available Bricks:{" "}
                              <Image
                                data-tooltip-id="bricks"
                                src={infoIcon}
                                width={16}
                                alt="info icon "
                                className="cursor-pointer"
                              />
                            </div>
                            <div className="item item-value text-bold">
                              <span className="text-accent-400 ">
                                {" "}
                                {expandedRowData?.projectMeta.availableBricks}
                              </span>
                              /{" "}
                              {expandedRowData?.projectMeta.totalNumberOfBricks}
                            </div>
                          </>
                        ) : (
                          <div className="w-full">
                            <Skeleton className="h-[60px]  w-full" />
                          </div>
                        )}
                      </div>

                      <div className="item flex w-full justify-between md:justify-start md:flex-col min-w-[160px] basis-[224px] grow">
                        {expandedRowData ? (
                          <>
                            <div className="item text-lg">Return Estimate:</div>
                            <div className="item item-value text-bold">
                              {expandedRowData?.projectMeta.estimatedReturn}
                              {"%"}
                            </div>
                          </>
                        ) : (
                          <div className="w-full">
                            <Skeleton className="h-[60px]  w-full" />
                          </div>
                        )}
                      </div>

                      <div className="item flex w-full justify-between md:justify-start md:flex-col min-w-[160px] basis-[224px] grow">
                        {expandedRowData ? (
                          <>
                            <div className="item text-lg">
                              Project completion:
                            </div>
                            <div className="item item-value text-bold">
                              {expandedRowData?.projectMeta.completionTime ? (
                                calculateCompletionDays(
                                  new Date().getTime(),
                                  expandedRowData?.projectMeta.completionTime
                                ) + " days"
                              ) : (
                                <span>--</span>
                              )}
                            </div>
                          </>
                        ) : (
                          <div className="w-full">
                            <Skeleton className="h-[60px]  w-full" />
                          </div>
                        )}
                      </div>

                      <div className="item flex w-full justify-between md:justify-start md:flex-col min-w-[160px] basis-[224px] grow">
                        {expandedRowData ? (
                          <>
                            <div className="item text-lg">Blockchain:</div>
                            <div className="item item-value text-bold">
                              {expandedRowData?.projectMeta.chain}
                            </div>
                          </>
                        ) : (
                          <div className="w-full">
                            <Skeleton className="h-[60px]  w-full" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="buttons p-0 md:p-[20px] grow flex items-center flex-col gap-16 max-w-full md:max-w-[274px]">
                  {expandedRowData ? (
                    <>
                      <Button
                        text="Buy Bricks"
                        className="btn text-lg btn-contained  w-full max-w-[254px] px-[22px] py-[10px] text-nowrap"
                        onClick={() =>
                          router.push(
                            `/user/marketplace/detail/${data.projectId}?buy=true`
                          )
                        }
                      />
                      <Button
                        hierarchy="secondary"
                        text="Sell your Bricks"
                        className="btn text-lg btn-contained  w-full max-w-[254px] px-[22px] py-[10px] text-nowrap"
                        onClick={() =>
                          router.push(
                            `/user/marketplace/detail/${data.projectId}?list=true`
                          )
                        }
                        disabled
                        dataTooltipId="resell-disable"
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              {/*resale bricks data*/}
              {!!resaleData?.length && false && (
                <div className="flex flex-col gap-8 px-5">
                  <div className=" pt-[14px] pb-[6px] text-primary-800 text-lg text-semiBold">
                    Bricks on resale market (Bricks on hold)
                  </div>
                  {resaleData.map((resaleData: any, i: number) => (
                    <div
                      className="flex flex-col md:flex-row md:items-center"
                      key={i}
                    >
                      {/* resale data  */}
                      <div className="py-[14px]  flex gap-1 grow w-full md:w-auto">
                        <div className="flex flex-col gap-1 grow">
                          <div className="text-md text-regular text-primary-600">
                            Proposal ID:
                          </div>
                          <div className="text-lg text-bold text-primary-900">
                            {rowIndex + 1}
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 grow">
                          <div className="text-md text-regular text-primary-600">
                            {resaleData?.type !== "resaleListing"
                              ? "Sold bricks:"
                              : "Bricks on resale:"}
                          </div>
                          <div className="text-lg text-bold text-primary-900">
                            {resaleData?.tokenAmount ?? 0}
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 grow">
                          <div className="text-md text-regular text-primary-600">
                            Brick price:
                          </div>
                          <div className="text-lg text-bold text-primary-900">
                            ${resaleData?.resalePrice ?? 0}
                          </div>
                        </div>
                      </div>

                      {/* resale action buttons */}
                      <div
                        className={`py-[14px]  flex md:flex-col md:max-w-[254px] ${styles.resaleButtons}`}
                      >
                        {resaleData?.type !== "resaleListing" ? (
                          <div className="text-primary-700 text-md text-semiBold text-center">
                            Didn't receive money after 24h? Contact us.
                          </div>
                        ) : (
                          <>
                            <Button
                              hierarchy="tertiaryAccent"
                              size="md"
                              icon={"left"}
                              iconName={"edit"}
                              text={"Edit proposal details"}
                              className="text-nowrap "
                              onClick={() =>
                                router.push(
                                  `/user/marketplace/detail/${data.projectId}?list=true`
                                )
                              }
                            />
                            <Button
                              hierarchy="tertiaryGray"
                              size="md"
                              icon={"left"}
                              iconName={"cross"}
                              text={"Delete from resale"}
                              className="text-nowrap "
                              onClick={() => setIsDeleteModalOpen(true)}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </td>
          </tr>
          <tr
            className={
              isPortfolioPage && isExpanded
                ? resaleData?.length
                  ? styles.padRow
                  : styles.padRowSmall
                : ""
            }
          ></tr>
        </>
      )}
      <Tooltip
        anchorSelect={`resell-disable`}
        title={"This option will be available soon."}
        place="top"
      />
      <Modal isOpen={isDeleteModalOpen} className="wallet-connect-modal !h-fit">
        <div className="flex-col gap-32">
          <div className="flex-space-between flex-center">
            <div className="icon-container">
              <DeleteIcon />
            </div>
            <span className="cursor-pointer close-button">
              <CloseIcon onClick={() => setIsDeleteModalOpen(false)} />
            </span>
          </div>
          <div>
            <div className="d-h3">Delete from resale</div>
            <div className="mt-16 ">
              Are you sure you want to delete your proposal from resale market?
            </div>
            <div className="flex gap-[8px]">
              <Button
                hierarchy="primary"
                size="lg"
                text="Delete Proposal"
                onClick={handleDelete}
                className="text-lg   mt-32 p-12-26 w-100p "
                tooltipTitle="Delete Proposal"
                tooltipText=""
              />
              <Button
                hierarchy="secondary"
                size="lg"
                text="Cancel"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                }}
                className=" text-lg   mt-32 p-12-26 w-100p "
                tooltipTitle="Cancel"
                tooltipText=""
                dataTooltipId="Cancel"
              />
            </div>
          </div>
        </div>
      </Modal>
      <AwaitTransactionModal
        isTransactionModalOpen={isAwaitModelOpen}
        setIsTransactionModalOpen={setIsAwaitModelOpen}
      />
    </>
  );
}

export default PortfolioExpandedRowData;
