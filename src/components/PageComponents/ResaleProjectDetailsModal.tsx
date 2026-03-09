import React from "react";
import Modal from "@/components/UiComponents/Modal";
import ProjectDetails from "./ProjectDetails";
import CloseIcon from "@icons/general/x-close-black-lg.svg";

function ResaleProjectDetailsModal({
  isOpen,
  setIsOpen,
  projectId,
  openResaleBricksModal,
  resaleDetails,
}: any) {
  return (
    <Modal
      isOpen={isOpen}
      className="py-6 p-[10px] box-border md:pl-6 md:pr-2 !max-w-[1152px] !w-[calc(100%-40px)] !h-screen !max-h-screen !rounded-none"
      disablePadding
    >
      <div className="h-full overflow-y-auto md:pr-4">
        <div className="flex items-center justify-between nav-title !pt-0 d-h2 capitalize">
          <div className="flex gap-16 items-center ">
            <div>Project Details</div>
          </div>

          <div className="nav-icon">
            <CloseIcon
              onClick={() => setIsOpen(false)}
              className="stroke-[2px] cursor-pointer"
            />
          </div>
        </div>
        <ProjectDetails
          buy={false}
          list={false}
          resale={true}
          resaleDetails={resaleDetails}
          projectId={projectId}
          openResaleBricksModal={() => {
            openResaleBricksModal();
            setIsOpen(false);
          }}
        />
      </div>
    </Modal>
  );
}

export default ResaleProjectDetailsModal;
