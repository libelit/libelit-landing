"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import PlayIcon from "../../../public/icons/general/playIcon.svg";
import EndIcon from "../../../public/icons/general/EndIcon.svg";
import CubeIcon from "../../../public/icons/general/CubeIcon.svg";
import UsersIcon from "../../../public/icons/general/UsersIcon.svg";
import ProgressBar from "../UiComponents/ProgressBar";
import Button from "../UiComponents/Button/Button";
import ArrowDownIcon from "../../../public/icons/arrows/arrow-down.svg";
import ImageGallery from "../UiComponents/ImageGallery/ImageGallery";
import GlobeIcon from "/public/icons/general/globe-04.svg";
import ReceiptIcon from "/public/icons/general/receipt-check.svg";
import RouteIcon from "/public/icons/general/route-white-sm.svg";
import SquareCheckIcon from "/public/icons/general/square-check.svg";
import SquareUncheckIcon from "/public/icons/general/square-uncheck.svg";
import FileAttachmentIcon from "/public/icons/files/file-attachment.svg";
import CloseIcon from "/public/icons/general/x-close-black-lg.svg";
import PiggyBankIcon from "/public/icons/finance/piggy-bank-wallet.svg";
import FireIcon from "/public/icons/general/fire.svg";
import GoogleMap from "../UiComponents/Maps/GoogleMap";
import Tooltip from "../UiComponents/Tooltip";
import axiosClient from "@/app/axiosClient";
import Link from "next/link";
import { useRouter } from "next/router";
import Modal from "../UiComponents/Modal";
import Iframe from "react-iframe";
import BuyBricksForm from "../UiComponents/Forms/BuyBricksForm";
import * as Yup from "yup";
import moment from "moment";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import FullScreenIcon from "/public/icons/general/fullscreen.svg";
import LoginIcon from "@icons/general/icon-login.svg";

import ProjectTeam from "./ProjectTeam";
import ProgressGallery from "./ProgressGallery";
import { useContainer } from "@/contexts/ContainerContext";
import { useAlert } from "@/contexts/AlertContext";
import infoIcon from "@icons/general/help-circle-gray.svg?url";
import UserIcon from "public/icons/general/user.svg";
import CustomImage from "@/components/UiComponents/Image";
import ReactPlayer from "react-player";
import YouTube from "react-youtube";
import Skeleton from "react-loading-skeleton";
import Comments from "@/components/comments/Comments";
import {
  buyTokensForSale,
  getBalance,
  getListedTokens,
  getPrice,
  getTokenBalance,
  listTokensForSale,
} from "../UiComponents/Forms/utils";
import AwaitTransactionModal from "../Transaction/AwaitTransactionModal";

import BrickSell from "../../../public/icons/finance/bricksell.svg";
import StarCheck from "../../../public/icons/finance/starcheck.svg";
import RightArrow from "../../../public/icons/arrows/right-arrow.svg";
import SellBackForm from "../UiComponents/Forms/SellBackForm";
import WarnIcon from "@icons/general/error-icon-gray.svg";
import ResaleForm from "../UiComponents/Forms/ResaleForm";
import CheckIcon from "@icons/general/check.svg";
import PdfViewer from "../PdfViewer";
import ShowMoreIcon from "@icons/arrows/arrow-down-white.svg";
import USDCIcon from "../UiComponents/USDCIcon";
import CopyButton from "../UiComponents/CopyButton";

function ProjectDetails({
  buy,
  list,
  projectId,
  resale,
  openResaleBricksModal,
  resaleDetails,
}: {
  buy: boolean;
  list: boolean;
  projectId: any;
  resale?: boolean;
  openResaleBricksModal?: any;
  resaleDetails?: any;
}) {
  const [transaction, setTransaction] = useState<any>();
  const [mainImageSrc, setMainImageSrc] = useState("/images/project.png");
  const [projectDetail, setProjectDetail] = useState<any>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [progressDetails, setProgressDetails] = useState();

  const { setPageTitle } = useContainer();
  const [
    propertyOwnershipContractAddress,
    setPropertyOwnershipContractAddress,
  ] = useState<any>();
  const { alert } = useAlert();
  const fetchProjectDetails = async () => {
    if (!projectId) return;
    await axiosClient
      .get(`project/getProjectById/${projectId}`)
      .then((response) => {
        if (response.status === 200) {
          //src="/images/project.png"
          setProjectDetail(response.data);
          console.log(response.data);
          setPageTitle(response.data.projectMeta.name ?? "Project");

          if (response.data.projectMeta.imageUrl)
            setMainImageSrc(response.data.projectMeta.imageUrl);

          setPropertyOwnershipContractAddress(
            response.data.projectMeta.contractAddress
          );

          if (response.data.aboutProject.imageList)
            setAboutDetails(response.data.aboutProject.imageList);
          if (response.data.progressGallery)
            setProgressDetails(
              formatProgressData(response.data.progressGallery)
            );
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const router = useRouter();

  useEffect(() => {
    setPageTitle("Project");
    setLoading(true);
    fetchProjectDetails();
    return () => {
      setPageTitle();
    };
  }, [projectId]);
  const { accounts } = useContainer();

  const handle = useFullScreenHandle();

  {
    /* IFrame Modal State and Handlers */
  }
  const [isIFrameModalOpen, setIsIFrameModalOpen] = useState(false);
  const [isStreamModalOpen, setIsStreamModalOpen] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [isPdfModelOpen, setIsPdfModelOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<any>(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const openIFrameModal = (e: Event) => {
    setIsIFrameModalOpen(true);
    e.stopPropagation();
  };

  const closeIFrameModal = () => {
    setIsIFrameModalOpen(false);
  };

  {
    /* Buy Bricks Modal State and Handlers */
  }
  const [isBricksModalOpen, setIsBricksModalOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isResaleBackBricksModalOpen, setIsResaleBackBricksModalOpen] =
    useState(false);

  const [isResaleBricksModalOpen, setIsResaleBricksModalOpen] = useState(false);

  const [isResaleBackSuccessModalOpen, setIsResaleBackSuccessModalOpen] =
    useState(false);
  const [isResaleSuccessModalOpen, setIsResaleSuccessModalOpen] =
    useState(false);
  const [saleDetails, setSaleDetails] = useState<any>();

  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isTermsIFrameOpen, setIsTermsIFrameModalOpen] = useState(false);

  const [price, setPrice] = useState<any>();
  const [balance, setBalance] = useState(0);

  const [pptBalance, setPptBalance] = useState(0);

  const updateBalance = async () => {
    if (!accounts?.length) {
      setBalance(0);
      return;
    }

    const balance = await getBalance(accounts[0].address);
    setBalance(balance ?? 0);
  };
  useEffect(() => {
    if (!isBricksModalOpen) return;
    if (accounts?.length && propertyOwnershipContractAddress) {
      updateBalance();
      getPrice(propertyOwnershipContractAddress).then((price) => {
        if (!price && price != 0) {
          handleBuyBricksError({ code: "NO_PRICE" });
          return;
        }

        setPrice(price);
      });
    } else {
      handleBuyBricksError({ code: "NO_WALLET" });
    }
  }, [accounts, propertyOwnershipContractAddress, isBricksModalOpen]);

  const closeTermsIFrameModal = () => {
    setIsTermsIFrameModalOpen(false);
  };
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };
  const openBricksModal = () => {
    setIsBricksModalOpen(true);
  };

  const closeBricksModal = () => {
    setIsBricksModalOpen(false);
  };

  const [aboutProjectGalleryImages, setAboutProjectGalleryImages] =
    useState<any>([]);

  const handleTabClick = (index: any) => {
    setActiveTab(index);
  };

  const handleButtonClick = (link: String) => {
    // console.log("handle" + link);
  };

  // const getProjectCompletionDays = (projectCompletionDate) => {
  //     const diff = Date.now() - (projectCompletionDate * 1000)
  // }

  const isDemo = router.pathname.startsWith("/demo");

  // const projectId = 2;

  const tabs = [
    {
      label: "About the project",
      href: "about-project",
    },
    {
      label: "Project team",
      href: "project-team",
    },
    {
      label: "Progress gallery",
      href: "progress-gallery",
    },
    {
      label: "Local impact",
      href: "local-impact",
    },
    {
      label: "Location",
      href: "location",
    },
    {
      label: "Documentation",
      href: "documentation",
    },
  ];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    buy && !loading && !isDemo && accounts.length && setIsBricksModalOpen(true);
    buy &&
      !loading &&
      !isDemo &&
      !accounts.length &&
      handleBuyBricksError({ code: "NO_WALLET" });

    buy && !loading && isDemo && setIsLoginModalOpen(true);
  }, [buy, loading]);

  useEffect(() => {
    list && !loading && !isDemo && setIsListModalOpen(true);
    list && !loading && isDemo && setIsLoginModalOpen(true);
    if (list && !loading) {
      getPptBalance();
    }
  }, [list, loading, accounts]);

  const getPptBalance = async () => {
    if (!accounts || !accounts.length) return;
    const balance = await getTokenBalance(
      propertyOwnershipContractAddress,
      accounts[0].address
    );
    setPptBalance(balance);
  };
  const setAboutDetails = (imageDetails: any) => {
    //TODO only setting the images, need to set about details as well
    let imageList = imageDetails.map((item: any) => {
      return {
        original: item.imageUrl,
        thumbnail: item.imageUrl,
        image_description: item?.image_description,
        heading: item?.heading,
      };
    });

    setAboutProjectGalleryImages(imageList);
  };

  const formatProgressData = (data: any) => {
    // format the progressDetail for gallery
    // const progressDetails: any = {};
    // data?.forEach((phase: any) => {
    //   //for each phase
    //   if (!progressDetails[phase.phase])
    //     progressDetails[phase.phase] = {
    //       value: phase.phase,
    //       label: phase.phase,
    //       years: {},
    //     };

    //   phase.imageList?.forEach((item: any) => {
    //     //for each image value
    //     if (!progressDetails[phase.phase].years[item.year])
    //       progressDetails[phase.phase].years[item.year] = {
    //         value: item.year,
    //         label: item.year,
    //         months: {},
    //       };
    //     if (!progressDetails[phase.phase].years[item.year].months[item.month])
    //       progressDetails[phase.phase].years[item.year].months[item.month] = {
    //         value: item.month,
    //         label: item.month,
    //         images: [],
    //       };

    //     progressDetails[phase.phase].years[item.year].months[
    //       item.month
    //     ].images.push(item.image_url);
    //   });
    // });
    const progressDetail: any = {};
    data.forEach(
      (phase: any) =>
        (progressDetail[phase.phase.replace("_", " ")] = {
          imageList: phase.imageList,
        })
    );

    return progressDetail;
  };

  // Buy Bricks Form Data, Validation and Handler //
  const buyBricksInitialFormData = {
    numberOfBricks: 1,
    total: 100,
    "terms-and-conditions": false,
    "privacy-policy": false,
    newsletter: false,
    "select-all": false,
  };

  const buyBricksFormInfo = {
    type: "buybricksform",
    formButtonText: "Pay now",
  };

  const buyBricksFormFields = [
    {
      name: "numberOfBricks",
      label: "No. of Bricks",
      type: "number",
      placeholder: "1",
      subLabel: "*1 brick minimum purchase amount",
    },

    {
      name: "total",
      label: "Total",
      type: "number",
      placeholder: "99.99",
      subLabel: "Transaction includes 2% fee: 2.45 USDC",
    },
    // {
    //     name: "note",
    //     label: "Note: All the values are based on current exchange rate.",
    //     type: "",
    //     placeholder: "",
    // },
    {
      name: "select-all",
      label: "",
      type: "checkbox",
      placeholder: "Select all",
    },
    {
      name: "terms-and-conditions",
      label: "",
      type: "checkbox",
      placeholder: (
        <span
          className="cursor-pointer"
          onClick={() => setIsTermsIFrameModalOpen(true)}
        >
          I understand Libelit AUS -<strong>Terms & Conditions</strong>,
          <strong> Product Disclosure Statement </strong>
          and
          <strong> Financial Service Guide</strong>
          (ASIC Regulated).
        </span>
      ),
    },
    {
      name: "privacy-policy",
      label: "",
      type: "checkbox",
      placeholder:
        "I acknowledge that my information will be used in accordance with the Privacy Policy and Cookie Policy. ",
    },
    {
      name: "newsletter",
      label: "",
      type: "checkbox",
      placeholder:
        "I agree for my personal data to be processed for the purpose of receiving a newsletter or marketing information from Libelit. ",
    },
  ];

  const buyBricksValidationSchema = Yup.object({
    numberOfBricks: Yup.number()
      .required("Required")
      .min(1, "No. of Bricks should be greater than 0."),
    "terms-and-conditions": Yup.boolean().oneOf([true], "Required"),
    "privacy-policy": Yup.boolean().oneOf([true], "Required"),
  });

  const resaleBricksInitialFormData = {
    numberOfBricks: 1,
    brickPrice: 99,
    total: 99,
    "terms-and-conditions": false,
    "privacy-policy": false,
    newsletter: false,
    "select-all": false,
  };

  const resaleBricksFormFields = [
    {
      name: "numberOfBricks",
      label: "No. of Bricks",
      type: "number",
      placeholder: "1",
      subLabel: "*1 brick minimum purchase amount",
    },
    {
      name: "brickPrice",
      label: "Brick price",
      type: "number",
      placeholder: "99.00",
      subLabel: "Purchase risk: Low",
    },

    {
      name: "total",
      label: "Total",
      type: "number",
      placeholder: "99.99",
      subLabel: "Transaction includes 2% fee: 2.45 USDC",
    },
    // {
    //     name: "note",
    //     label: "Note: All the values are based on current exchange rate.",
    //     type: "",
    //     placeholder: "",
    // },
    {
      name: "select-all",
      label: "",
      type: "checkbox",
      placeholder: "Select all",
    },
    {
      name: "terms-and-conditions",
      label: "",
      type: "checkbox",
      placeholder: (
        <span
          className="cursor-pointer"
          onClick={() => setIsTermsIFrameModalOpen(true)}
        >
          I understand Libelit AUS -<strong>Terms & Conditions</strong>,
          <strong> Product Disclosure Statement </strong>
          and
          <strong> Financial Service Guide</strong>
          (ASIC Regulated).
        </span>
      ),
    },
    {
      name: "privacy-policy",
      label: "",
      type: "checkbox",
      placeholder:
        "I acknowledge that my information will be used in accordance with the Privacy Policy and Cookie Policy. ",
    },
    {
      name: "newsletter",
      label: "",
      type: "checkbox",
      placeholder:
        "I agree for my personal data to be processed for the purpose of receiving a newsletter or marketing information from Libelit. ",
    },
  ];
  const resaleBricksValidationSchema = Yup.object({
    numberOfBricks: Yup.number().required("Required").min(1),
    brickPrice: Yup.number().required("Required").min(1),
    "terms-and-conditions": Yup.boolean().oneOf([true], "Required"),
    "privacy-policy": Yup.boolean().oneOf([true], "Required"),
  });

  const errorCodeMessage: any = {
    NO_WALLET: "No wallet connected.",
    NO_METAMASK: "Metamask not installed.",
    INSUFFICIENT_BALANCE: "Insufficient balance.",
    NO_PRICE: "Oops, there was some error. geting the price.",
  };
  const handleBuyBricksSubmit = async () => {
    setIsBricksModalOpen(false);
    setIsTransactionModalOpen(true);
  };
  const handleBuyBricksError = (error: any) => {
    setIsBricksModalOpen(false);
    setIsTransactionModalOpen(false);

    if (errorCodeMessage[error.code]) {
      alert(errorCodeMessage[error.code], "error");

      return;
    }

    alert("There was an error processing your request.", "error");

    return;
  };

  const handleBuyBricksSuccess = () => {
    alert("The transaction was successful!", "success");
    setIsTransactionModalOpen(false);
  };

  const handleSellBackSuccess = (values: any) => {
    // alert("The transaction was successful!", "success");
    setIsTransactionModalOpen(false);
    setSaleDetails(values);
    setIsResaleBackSuccessModalOpen(true);
  };

  const handleSellBackSubmit = async () => {
    setIsListModalOpen(false);
    setIsResaleBackBricksModalOpen(false);

    setIsTransactionModalOpen(true);
  };
  const handleSellBackError = (error: any) => {
    setIsResaleBackBricksModalOpen(false);
    setIsTransactionModalOpen(false);

    if (errorCodeMessage[error.code]) {
      alert(errorCodeMessage[error.code], "error");

      return;
    }

    alert("There was an error processing your request.", "error");

    return;
  };

  const handleResaleSuccess = (values: any) => {
    // alert("The transaction was successful!", "success");
    setIsTransactionModalOpen(false);
    setSaleDetails(values);

    setIsResaleSuccessModalOpen(true);
  };

  const handleResaleSubmit = async () => {
    setIsListModalOpen(false);
    setIsResaleBricksModalOpen(false);

    setIsTransactionModalOpen(true);
  };
  // End - Buy Bricks Form Data, Validation and Handler //

  const formatDateTime = (timestampEpoch: any) => {
    const timestamp = timestampEpoch;
    const formattedDate = moment(timestamp).format("DD MMMM YYYY");
    return formattedDate;
  };

  const calculateCompletionDays = (startTime: number, endTime: number) => {
    const formattedStartTime = moment(startTime);
    const formattedEndTime = moment(endTime);
    const diff = formattedEndTime.diff(formattedStartTime, "days");
    return diff;
  };

  let localImpacts = projectDetail?.localImpact.reduce(
    (acc: any, curr: any) => {
      return { ...acc, [curr.Section]: curr.items };
    },
    {}
  );

  const [isStreamLoaded, setIsStreamLoaded] = useState(false);
  useEffect(() => {
    if (!propertyOwnershipContractAddress) return;
  }, [propertyOwnershipContractAddress]);

  // for mobile, information to scroll down for more
  const bricksFormRef = useRef<any>();
  const bricksModalRef = useRef<any>();

  const [hasScrolledForm, setHasScrolledForm] = useState(false);
  const [isObserverSet, setIsObserverSet] = useState(false);
  const [observer, setObserver] = useState<any>();
  console.log(hasScrolledForm);
  useEffect(() => {
    console.log("effect");
    // if (isObserverSet) return;
    const temp_observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("visible");
            setHasScrolledForm(true);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );
    if (bricksFormRef.current) {
      temp_observer.observe(bricksFormRef.current);
      setIsObserverSet(true);
    }
    setObserver(temp_observer);

    // const handleScroll = () => {
    //   console.log("here");

    //   setHasScrolledForm(true);
    // };

    // console.log("attached");
    // bricksModalRef.current?.addEventListener("scroll", handleScroll);

    // return () => {
    //   // if (bricksModalRef.current) {
    //   //   bricksModalRef.current.removeEventListener("scroll", handleScroll);
    //   // }
    // };
    if (!isBricksModalOpen) observer?.disconnect();
  }, [bricksFormRef.current, isBricksModalOpen]);

  const [aboutProjectIndex, setAboutProjectIndex] = useState(0);
  console.log(hasScrolledForm);
  if (loading)
    return (
      <div className="loader-container">
        <div className="loading"></div>
      </div>
    );
  return (
    <div
      className="parent-container w-full max-w-full md:max-w-[1088px] mx-auto flex flex-col gap-32 project-details-container"
      onClick={closeIFrameModal}
    >
      <Modal
        isOpen={isLoginModalOpen}
        className="wallet-connect-modal w-full !h-fit "
      >
        <div className="flex-col gap-32 ">
          <div className="flex-space-between flex-center">
            <div className="icon-container">
              <LoginIcon className="accent-500" />
            </div>
            <span className="cursor-pointer close-button">
              <CloseIcon
                onClick={() => {
                  closeLoginModal();
                }}
              />
            </span>
          </div>
          <div>
            <div>
              <div className="d-h3">Log in or sign up</div>
              <div className="mt-12 flex-center">
                <div className="text-left text-lg color-primary-900 ">
                  In order to start your investing adventure you need to Log in
                  or sign up first.
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-8">
            <Button
              hierarchy="primary"
              size="lg"
              text="Sign up"
              className="grow h-12 flex items-center justify-center"
              onClick={() => router.push("/user/signup")}
            />
            <Button
              hierarchy="secondary"
              size="lg"
              text="Log in"
              className="grow h-12 flex items-center justify-center"
              onClick={() => router.push("/user/login")}
            />
          </div>
        </div>
      </Modal>

      {/* top section */}

      <div className="curved-section bg-white">
        <div className="project-image pos-rel">
          {/* {mainImageSrc && (
            <Image
              src={mainImageSrc} // uncomment when image available
              // src="/images/project.png"
              alt="Project Alt"
              width="100"
              height="100"
              unoptimized
            />
          )} */}

          <CustomImage
            src={mainImageSrc}
            alt="Project Alt"
            width="100"
            height="100"
            skeletonClassName="absolute -top-[5px] h-[400px] "
          />
          <div className="pos-abs img-caption text-bold">
            {projectDetail.projectMeta.name} |{" "}
            {projectDetail.projectMeta.location}
          </div>
        </div>

        <div className="pr-2 pl-2 md:pr-6 md:pl-6 pb-8">
          <div className="project-detail-metasection">
            <div className=" project-detail-metasection-container">
              <div className="metasection-item min-w-[160px]">
                <div className="flex project-detail-metasection-icon sm-mb-10">
                  <div className="item metasection-icon">
                    <PlayIcon />
                  </div>
                  <div className="item flex-col gap-4">
                    <div className="item color-primary-900 text-lg text-semiBold">
                      Start
                    </div>
                    <div className="item text-md text-regular">
                      {formatDateTime(projectDetail.projectMeta.startTime) ??
                        "-"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="ghost-grid-item" />
              <div className="metasection-item min-w-[160px]">
                <div className="flex project-detail-metasection-icon">
                  <div className="item metasection-icon">
                    <EndIcon />
                  </div>
                  <div className="item flex-col gap-4">
                    <div className="item color-primary-900 text-lg text-semiBold">
                      End
                    </div>
                    <div className="item text-md text-regular">
                      {formatDateTime(
                        projectDetail.projectMeta.completionTime
                      ) ?? "-"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="metasection-item min-w-[160px]">
                <div className="flex project-detail-metasection-icon">
                  <div className="item metasection-icon">
                    <CubeIcon />
                  </div>
                  <div className="item flex-col gap-4">
                    <div className="item color-primary-900 text-lg text-semiBold">
                      Blockchain
                    </div>
                    <div className="item text-md text-regular">
                      {projectDetail.projectMeta.chain ?? "-"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="ghost-grid-item" />
              <div className="metasection-item min-w-[160px]">
                <div className="flex project-detail-metasection-icon">
                  <div className="item metasection-icon">
                    <UsersIcon />
                  </div>
                  <div className="item flex-col gap-4">
                    <div className="item color-primary-900 text-lg text-semiBold">
                      Investors
                    </div>
                    <div className="item text-md text-regular">
                      {projectDetail.projectMeta.investorCount ?? "0"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="divider-grey"></div>
          </div>
          <div className="project-defail-stats flex gap-2p flex-items-center">
            <div className="project-detail-progress item w-100">
              <ProgressBar
                // progress={projectDetail.projectMeta.execution.progress}  // need to update API to include this field
                progress={
                  projectDetail.projectMeta.execution.progressPercentage
                    ? projectDetail.projectMeta.execution.progressPercentage
                    : projectDetail.projectMeta.execution.progressPercentage ==
                      0
                    ? 0
                    : 12.5
                }
                // page="project-details"
                topLeftLabel={projectDetail.projectMeta.execution.topLeftLabel}
                topRightLabel={projectDetail.projectMeta.execution.topRightLabel?.replace(
                  "_",
                  " "
                )}
                bottomLeftLabel={
                  projectDetail.projectMeta.execution.bottomLeftLabel
                }
                bottomRightLabel={
                  projectDetail.projectMeta.execution.bottomRightLabel
                }
                color={resale ? "secondary" : "accent"}
                tooltip={true}
              />
            </div>
            <div className="item">
              <Button
                hierarchy={resale ? "primary" : "accent"}
                size="lg"
                text="Buy Bricks"
                onClick={() =>
                  isDemo
                    ? openLoginModal()
                    : resale
                    ? openResaleBricksModal()
                    : openBricksModal()
                }
                className="btn text-lg btn-contained sm-mt-12 md:min-w-[300px]"
              />
            </div>
          </div>

          <div className="flex  gap-4 mt-24 project-financial-detail-container">
            <div className="item flex w-full justify-between md:justify-start md:flex-col min-w-[160px] w-[224px]">
              <div className="item text-lg">Brick Price:</div>
              <div className="item text-lg md:text-lg text-bold flex items-center">
                <div className="h-[16px] flex items-center  ">
                  {" "}
                  <USDCIcon type="primary" className="w-4 mr-1 block  " />
                </div>

                <div className=" ">
                  {resale
                    ? resaleDetails.brickPrice
                    : projectDetail.projectMeta.unitPricePerBrick}
                </div>
              </div>
            </div>
            <div className="item flex w-full justify-between md:justify-start md:flex-col min-w-[160px] w-[224px]">
              <div className="item text-lg flex gap-4">
                Available Bricks:{" "}
                {/* <Image
                  data-tooltip-id="bricks"
                  src={infoIcon}
                  width={16}
                  alt="info icon "
                  className="cursor-pointer"
                /> */}
              </div>
              <div className="item text-lg md:text-lg text-bold">
                <span className="text-accent-400 ">
                  {projectDetail.projectMeta.availableBricks}
                </span>
                {/* / {projectDetail.projectMeta.totalNumberOfBricks} */}
              </div>
            </div>
            <div className="item flex w-full justify-between md:justify-start md:flex-col min-w-[160px] w-[224px]">
              <div className="item text-lg">Return Estimate:</div>
              <div className="item text-lg md:text-lg text-bold">
                {projectDetail.projectMeta.estimatedReturn}
                {"%"}
              </div>
            </div>
            <div className="item flex w-full justify-between md:justify-start md:flex-col min-w-[160px] w-[224px]">
              <div className="item text-lg">Project completion:</div>
              <div className="item text-lg md:text-lg text-bold">
                {projectDetail.projectMeta.completionTime ? (
                  calculateCompletionDays(
                    new Date().getTime(),
                    projectDetail.projectMeta.completionTime
                  ) > 0 ? (
                    calculateCompletionDays(
                      new Date().getTime(),
                      projectDetail.projectMeta.completionTime
                    ) + " days"
                  ) : (
                    "Completed"
                  )
                ) : (
                  <span>--</span>
                )}
              </div>
            </div>
          </div>
          {/* <div className="show-sm">
            <div className="flex flex-space-between items-center">
              <div className="item text-lg">Brick Price:</div>
              <div className="item text-xl text-bold">
                {"$"}

                {projectDetail.projectMeta.unitPricePerBrick}
              </div>
            </div>

            <div className="flex flex-space-between items-center">
              <div className="item text-lg flex gap-4">
                Bricks:{" "}
                <Image
                  data-tooltip-id="bricks"
                  src={infoIcon}
                  width={16}
                  alt="info icon "
                  className="cursor-pointer"
                />
              </div>
              <div className="item text-xl text-bold">
                <span className="text-accent-400 ">
                  {projectDetail.projectMeta.availableBricks}
                </span>
                /0
              </div>
            </div>

            <div className="flex flex-space-between items-center">
              <div className="item text-lg">Return Estimate:</div>
              <div className="item text-xl text-bold">
                {projectDetail.projectMeta.estimatedReturn}
                {"%"}
              </div>
            </div>

            <div className="flex flex-space-between items-center">
              <div className="item text-lg">Project completion:</div>
              <div className="item text-xl text-bold">
                {projectDetail.projectMeta.completionTime &&
                  calculateCompletionDays(
                    new Date().getTime(),
                    projectDetail.projectMeta.completionTime
                  ) + " days"}
              </div>
            </div>
          </div>

          <div className="show-md  ">
            <div className="flex !flex gap-4 mt-24 ">
              <div className="item flex flex-col w-[224px]">
                <div className="item text-lg">Brick Price:</div>
                <div className="item text-xl text-bold">
                  {"$"}
                  {projectDetail.projectMeta.unitPricePerBrick}
                </div>
              </div>
              <div className="item flex flex-col w-[224px]">
                <div className="item text-lg flex gap-4">
                  Bricks:{" "}
                  <Image
                    data-tooltip-id="bricks"
                    src={infoIcon}
                    width={16}
                    alt="info icon "
                    className="cursor-pointer"
                  />
                </div>
                <div className="item text-xl text-bold">
                  <span className="text-accent-400 ">
                    {projectDetail.projectMeta.availableBricks}
                  </span>
                  /0
                </div>
              </div>
              <div className="item flex flex-col w-[224px]">
                <div className="item text-lg">Return Estimate:</div>
                <div className="item text-xl text-bold">
                  {projectDetail.projectMeta.estimatedReturn}
                  {"%"}
                </div>
              </div>
              <div className="item flex flex-col w-[224px]">
                <div className="item text-lg">Project completion:</div>
                <div className="item text-xl text-bold">
                  {projectDetail.projectMeta.completionTime ? (
                    calculateCompletionDays(
                      new Date().getTime(),
                      projectDetail.projectMeta.completionTime
                    ) + " days"
                  ) : (
                    <span>--</span>
                  )}
                </div>
              </div>
            </div>
          </div> */}
          {/* <Tooltip anchorSelect={`bricks`} title={"Bricks number"} place="top">
            <div className="text-sm">
              <div className="mt-4">
                <span className="text-accent-400 text-semiBold">Red no. </span>-
                Available Bricks from original pre-sale.
              </div>
              <div>
                <span className=" text-semiBold">Black no. </span>- All Bricks
              </div>
            </div>
          </Tooltip> */}
          <div className="divider-grey !mb-4"></div>
          <div className="text-md">
            <span className="text-semiBold">Smart Contract: </span>
            <Link
              href={
                "https://amoy.polygonscan.com/address/" +
                (projectDetail?.projectMeta?.contractAddress ?? "")
              }
              target="_blank"
              className="cursor-pointer"
            >
              {projectDetail?.projectMeta?.contractAddress}
            </Link>
            <CopyButton
              textToCopy={projectDetail?.projectMeta?.contractAddress ?? ""}
              className="inline ml-4 text-primary-400 hover:text-accent-400 w-5 cursor-pointer  focus:!outline-none"
            />
          </div>
          <div className="divider-grey !mt-4"></div>
          {/* section comment */}
          {/* <div className="section-comment">
            <div className="comment-title text-lg text-semiBold">
              Comments: 0
            </div>
            <div className="comment-list mt-17">
              <div className="flex gap-12">
                <div className="item comment-profile-image flex-vertical-center">
                  <Image src={avatarImage} alt="avatar image" />
                </div>
                <div className="item">
                  <div className="flex-col">
                    <div className="item flex gap-12">
                      <div className="item commenter-name text-sm text-semiBold">
                        Mr. Somebody
                      </div>
                      <div className="item comment-date text-sm text-regular color-primary-400">
                        {" "}
                        1 day ago
                      </div>
                    </div>
                    <div className="item comment text-md text-regular">
                      This is my comment here.
                    </div>
                  </div>
                </div>
                <div className="item flex-left comment-expand">
                  <ArrowDownIcon className="svg-icon-disabled" />
                </div>
              </div>
              <div className="divider-grey"></div>
            </div>
          </div>
        </div>
      </div> */}

          <Comments projectId={projectId} />
        </div>
      </div>
      {/* #section comment */}

      {/* section navigation */}
      <div className="flex flex-space-between project-details-nav datatable-container overflow-hidden max-w-full">
        <div className="tabs project-detail-tabs">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`tab ${index === activeTab ? "active" : ""}`}
              onClick={() => handleTabClick(index)}
            >
              <span className="text-regular link">
                <a href={`#${tab.href}`}>{tab.label}</a>
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* #section navigation */}

      {/* section about us */}
      <div className={`section-aboutus curved-section `} id="about-project">
        <div className="section-title d-h4 mb-3">About the project</div>
        <div className="about-project-card curved-section">
          <div className="about-us-container bg-white">
            <div className="progress-gallery-carousel  h-[210px] md:h-[426px] lg:h-[600px]">
              {aboutProjectGalleryImages.length == 0 ? (
                <Skeleton className={` h-[210px] md:h-[426px] lg:h-[600px] `} />
              ) : (
                <ImageGallery
                  items={aboutProjectGalleryImages}
                  imageClassName=" w-full h-[100%] md:h-[100%] object-contain"
                  skeletonClassName=" w-full h-[100%] md:h-[600px]"
                  onChangeIndex={(nextIndex: number) =>
                    setAboutProjectIndex(nextIndex)
                  }
                />
              )}
            </div>
          </div>

          <div
            className={`item flex-col section-aboutus-content h-full gap-24
             
            `}
          >
            <div className="item d-h4">
              {aboutProjectGalleryImages[aboutProjectIndex]?.heading &&
              aboutProjectGalleryImages[aboutProjectIndex]?.heading?.length
                ? aboutProjectGalleryImages[aboutProjectIndex]?.heading
                : "About the project"}
            </div>
            <div className="item  text-content">
              {aboutProjectGalleryImages[aboutProjectIndex]
                ?.image_description &&
              aboutProjectGalleryImages[aboutProjectIndex]?.image_description
                ?.length
                ? aboutProjectGalleryImages[aboutProjectIndex]
                    ?.image_description
                : // <>
                  //   Our investment features four semi-detached houses. Each house
                  //   offers a modern and functional living space that seamlessly
                  //   blends style and comfort. With high-quality materials and
                  //   attention to detail, these homes are not only beautiful but
                  //   also built to last.
                  //   <br />
                  //   <br />
                  //   The investment is located in a prime location, with easy
                  //   access to amenities and transportation, making it an ideal
                  //   choice for families.
                  // </>
                  projectDetail.aboutProject.description}
            </div>
            <div className="item flex flex-wrap flex-col md:flex-row lg:flex-col gap-8  btn-container lg:mt-auto">
              <Button
                hierarchy="accent"
                size="lg"
                icon="right"
                iconName={"rightArrow"}
                text={"VR tour"}
                onClick={openIFrameModal}
                className="sm-mt-12  leading-[1.125rem]  filter-btn bg-transparent !pl-[26px] !pr-[22px] leading-[24px] rounded-[50px]"
                disabled={!projectDetail.aboutProject.vrTourUrl}
                dataTooltipId="vr-tour-tooltip"
              />

              <Button
                hierarchy="accent"
                size="lg"
                icon="right"
                iconName={"rightArrow"}
                text={"Live camera"}
                onClick={() => setIsStreamModalOpen(true)}
                className="leading-[1.125rem]   filter-btn bg-transparent !pl-[26px] !pr-[22px] leading-[24px] rounded-[50px] "
                dataTooltipId="live-tooltip"
                disabled={!projectDetail.aboutProject.liveCameraUrl}
              />
            </div>
          </div>
        </div>
      </div>

      {!projectDetail.aboutProject.vrTourUrl && (
        <Tooltip
          anchorSelect={`vr-tour-tooltip`}
          title={"VR tour is not available"}
          place="top"
        />
      )}
      {!projectDetail.aboutProject.liveCameraUrl && (
        <Tooltip
          anchorSelect={`live-tooltip`}
          title={"Live camera is not available"}
          place="top"
        />
      )}

      {/* #section about us */}

      {/* section project team */}
      <ProjectTeam
        teamMembers={projectDetail.teamMembers}
        resale={resale ?? false}
      />

      {/* #section project team */}

      {/* Progress Galleryv*/}
      <section
        className="project-details-progress-gallery"
        id="progress-gallery"
      >
        <ProgressGallery progressDetails={progressDetails} />
      </section>
      {/* Local Impact */}
      <section className="project-details-local-impact" id="local-impact">
        <h3 className="d-h4 mb-3">Local Impact</h3>
        <div
          className={`project-details-card local-impact-card ${
            resale && "!px-0"
          }`}
        >
          <div>
            <div className="local-impact-header mb-[16px]">
              <RouteIcon height={80} width={80} className="mb-[16px]" />
              <p>Mobility</p>
            </div>
            {!localImpacts["Mobility"].length && (
              <div className="color-primary-700">
                No items in this category.
              </div>
            )}
            <ul>
              {localImpacts["Mobility"].map((entry: any) => (
                <li key={entry.name} className="flex items-center gap-2">
                  {entry.value === true ? (
                    <SquareCheckIcon />
                  ) : (
                    <SquareUncheckIcon />
                  )}{" "}
                  {entry.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="local-impact-header  mb-[16px]">
              <GlobeIcon height={80} width={80} className=" mb-[16px]" />
              <p>Sustainability</p>
            </div>
            {!localImpacts["Sustainability"].length && (
              <div className="color-primary-700">
                No items in this category.
              </div>
            )}
            <ul>
              {localImpacts["Sustainability"].map((entry: any) => (
                <li key={entry.name} className="flex items-center gap-2">
                  {entry.value === true ? (
                    <SquareCheckIcon />
                  ) : (
                    <SquareUncheckIcon />
                  )}{" "}
                  {entry.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="local-impact-header  mb-[16px]">
              <ReceiptIcon height={80} width={80} className=" mb-[16px]" />
              <p>Economic Vitality</p>
            </div>
            {!localImpacts["Economic Vitality"].length && (
              <div className="color-primary-700">
                No items in this category.
              </div>
            )}
            <ul>
              {localImpacts["Economic Vitality"].map((entry: any) => (
                <li key={entry.name} className="flex items-center gap-2">
                  {entry.value === true ? (
                    <SquareCheckIcon />
                  ) : (
                    <SquareUncheckIcon />
                  )}{" "}
                  {entry.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      {/* Location */}
      <section className="project-details-location" id="location">
        <h3 className="d-h4 mb-3">Location</h3>
        <div className={`project-details-card ${resale && "!px-0"}`}>
          <h4>
            {/* {projectDetail.location.city}, {projectDetail.location.country} */}
            {projectDetail?.fullLocation?.fullLocation ??
              projectDetail.location.city +
                ", " +
                projectDetail.location.country}
          </h4>
          <div className="location-map location-grid ">
            <div className="map-primary h-[160px] md:h-[267px]">
              <GoogleMap location={projectDetail.location} />
            </div>
            <div className="map-secondary h-[160px] md:h-[267px]">
              <img
                src={
                  projectDetail?.fullLocation?.imageUrl ?? "/images/project.png"
                }
                alt="location-map-secondary"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="location-map-details location-grid">
            <p>{projectDetail.fullLocation.description}</p>
            <div className=" sm-mt-12 ">
              <Button
                text="Read more"
                hierarchy="secondary"
                size="lg"
                className=" text-lg w-full"
                onClick={() => setIsLocationModalOpen(true)}
              />
            </div>
          </div>
        </div>
      </section>
      {/* Documentation */}
      <section className="project-details-documentation" id="documentation">
        <h3 className="d-h4 mb-3">Documentation</h3>
        <div
          className={`project-details-card flex flex-col gap-24 ${
            resale && "!px-0"
          }`}
        >
          {projectDetail?.documentation.map((documentType: any) => {
            return (
              <div className="documents-types" key={documentType.type}>
                <h4>{documentType.type}</h4>

                <div className="documents">
                  {documentType.documents.length == 0 &&
                    "No documents in this category."}
                  {documentType.documents.map((document: any, index: any) => {
                    return (
                      <div
                        className="documents-files"
                        key={document.name + index.toString()}
                      >
                        <span>
                          <FileAttachmentIcon height={24} width={24} />
                          <Tooltip
                            anchorSelect={`document-tooltip-${document.name}`}
                            title={document.name}
                            place="top"
                          />
                        </span>{" "}
                        <span>
                          <div
                            // href={document.fileUrl}
                            // target="_blank"
                            className="cursor-pointer"
                            data-tooltip-id={`document-tooltip-${document.name}`}
                            onClick={() => {
                              setSelectedPdf(document);
                              setIsPdfModelOpen(true);
                            }}
                          >
                            {document.name}
                          </div>
                          {/* <Link
                            href={document.fileUrl}
                            target="_blank"
                            data-tooltip-id={`document-tooltip-${document.name}`}
                          >
                            {document.name}
                          </Link> */}
                        </span>
                        {/* <span>{document.name}</span> */}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Location modal */}
      <Modal
        isOpen={isLocationModalOpen}
        className="vr-tour-modal !max-w-[calc(100%-20px)] !md:max-w-[calc(100%-60px)]  !h-[600px] !w-[800px]"
      >
        <div className=" flex flex-col h-full">
          <div className=" gap-8 ">
            <div className="flex justify-between ">
              <div>
                <h3 className="d-h4">Location</h3>
              </div>
              <div className="flex gap-8">
                <div className="cursor-pointer fullscreen-button">
                  <FullScreenIcon onClick={() => handle.enter()} />
                </div>
                <div className="cursor-pointer close-button">
                  <CloseIcon onClick={() => setIsLocationModalOpen(false)} />
                </div>
              </div>
            </div>
          </div>
          <div className="grow">
            <FullScreen handle={handle} className="vr-tour-iframe">
              <Iframe
                scrolling="yes"
                allowFullScreen
                url={projectDetail?.fullLocation?.readUrl}
                className="iframe"
              ></Iframe>
            </FullScreen>
          </div>
        </div>
      </Modal>
      {/* PDF Modal */}
      <Modal
        isOpen={isPdfModelOpen}
        className="vr-tour-modal !max-w-[calc(100%-20px)] !max-w-[calc(100%-20px)] !h-[900px] !w-[1200px]"
      >
        <div className=" flex flex-col h-full w-full">
          <div className=" gap-8 ">
            <div className="flex justify-between ">
              <div>
                <h3 className="d-h4">{selectedPdf?.name}</h3>
              </div>
              <div className="flex gap-8">
                <div className="cursor-pointer fullscreen-button">
                  <FullScreenIcon onClick={() => handle.enter()} />
                </div>
                <div className="cursor-pointer close-button">
                  <CloseIcon onClick={() => setIsPdfModelOpen(false)} />
                </div>
              </div>
            </div>
          </div>
          <div className="grow  w-full h-full">
            <FullScreen
              handle={handle}
              className="vr-tour-iframe grow  w-full h-full pos-rel"
            >
              {/* <Iframe
                scrolling="no"
                allowFullScreen
                allow="gyroscope; accelerometer; xr-spatial-tracking; vr;"
                url={selectedPdf?.fileUrl}
                className="iframe"
              ></Iframe> */}

              <PdfViewer file={selectedPdf?.fileUrl} />
            </FullScreen>
          </div>
        </div>
      </Modal>

      {/* IFrameModal */}
      <Modal isOpen={isIFrameModalOpen} className="vr-tour-modal">
        <div className=" flex flex-col h-full">
          <div className=" gap-8 ">
            <div className="flex justify-between ">
              <div>
                <h3 className="d-h4">VR Tour</h3>
              </div>
              <div className="flex gap-8">
                <div className="cursor-pointer fullscreen-button">
                  <FullScreenIcon onClick={() => handle.enter()} />
                </div>
                <div className="cursor-pointer close-button">
                  <CloseIcon onClick={closeIFrameModal} />
                </div>
              </div>
            </div>
          </div>
          <div className="grow">
            <FullScreen handle={handle} className="vr-tour-iframe">
              <Iframe
                scrolling="no"
                allowFullScreen
                allow="gyroscope; accelerometer; xr-spatial-tracking; vr;"
                url={projectDetail.aboutProject.vrTourUrl}
                className="iframe"
              ></Iframe>
            </FullScreen>
          </div>
        </div>
      </Modal>

      {/* live stream modal */}
      <Modal
        isOpen={isStreamModalOpen}
        className={`vr-tour-modal  !w-[360px]  md:!w-[620px] !h-auto`}
      >
        <div className=" flex flex-col h-full">
          <div className=" gap-8 ">
            <div className="flex justify-between ">
              <div>
                <h3 className="d-h4">Live Camera</h3>
              </div>
              <div className="flex gap-8">
                <div className="cursor-pointer fullscreen-button">
                  <FullScreenIcon onClick={() => handle.enter()} />
                </div>
                <div className="cursor-pointer close-button">
                  <CloseIcon onClick={() => setIsStreamModalOpen(false)} />
                </div>
              </div>
            </div>
          </div>
          {router.pathname.includes("/demo/") ? (
            <div className=" flex items-center h-[200px] font-semibold text-xl">
              <div className="text-center w-full ">
                Please{" "}
                <Link href="/user/login" className="text-accent-400 ">
                  log in
                </Link>{" "}
                to view live camera.
              </div>
            </div>
          ) : (
            <>
              <div className="aspect-video overflow-hidden">
                <FullScreen handle={handle} className="vr-tour-iframe">
                  <div className="w-full h-full relative   overflow-hidden relative">
                    {!isStreamLoaded && (
                      <div className="h-full w-full flex items-center justify-center">
                        <div className="loading"></div>
                      </div>
                    )}

                    <iframe
                      src={projectDetail.aboutProject.liveCameraUrl}
                      className={`relative w-full h-full overflow-hidden ${
                        !isStreamLoaded && "w-0 h-0  opacity-0"
                      }`}
                      allow="autoplay"
                      onLoad={() => {
                        console.log("loaded");
                        setIsStreamLoaded(true);
                      }}
                    ></iframe>
                  </div>
                </FullScreen>
              </div>
              <div className="pt-2 text-center">
                <span className="text-semiBold">Note</span>: The stream might
                take some time to load.
              </div>
            </>
          )}
        </div>
      </Modal>

      {/* Buy Bricks Modals */}
      <Modal
        isOpen={isBricksModalOpen}
        className="buy-bricks-modal p-0"
        reff={bricksModalRef}
      >
        <div className="buy-bricks-modal-content relative">
          <div
            className={`fixed  z-[10000] md:hidden bottom-6 right-6 bg-primary-900 p-2 rounded-full w-9 h-9 4 ${
              hasScrolledForm ? "hidden" : "block"
            }`}
            onClick={() => {
              bricksFormRef.current?.scrollIntoView({
                behavior: "smooth",
              });
              setHasScrolledForm(true);
            }}
          >
            <div className="w-full h-full flex items-center justify-center arrow-animation">
              <ShowMoreIcon />
            </div>
          </div>
          <div className="flex-col gap-8 mb-[32px]">
            <div className="flex-space-between flex-center">
              <span className="circle-accent accent-500">
                <PiggyBankIcon />
              </span>
              <span className="cursor-pointer close-button">
                <CloseIcon
                  onClick={() => {
                    closeBricksModal();
                    setHasScrolledForm(false);
                  }}
                  className="stroke-[2px]"
                />
              </span>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-[32px]">Buy Bricks</h2>
          <div className="buy-bricks-form-card  ">
            <div className="buy-bricks-details flex">
              <div className="w-[80px] h-[80px]">
                <Image
                  src={mainImageSrc ?? "/images/house.png"}
                  alt="project image"
                  height={80}
                  width={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className=" text-lg text-regular color-primary-600">
                <div className="buy-bricks-details-project-title d-h4 color-primary-900">
                  {projectDetail.projectMeta.name}
                </div>
                <div>
                  1 Brick = ${Number(price)} ({Number(price)} USDC)
                </div>
                <div>
                  Available Bricks: {projectDetail.projectMeta.availableBricks}
                </div>
              </div>
            </div>
            <p className="buy-bricks-available-funds">
              <span>Available funds:</span> ${balance} ({balance} USDC)
            </p>

            {/* <div className="buy-bricks-promo circle-accent">
              <span>
                <FireIcon />
              </span>
              <span>Early entry 5% PROMO applies</span>
            </div> */}

            <div className="buy-bricks-form-div ">
              <div className="buy-bricks-form " ref={bricksFormRef}>
                <BuyBricksForm
                  initialValues={buyBricksInitialFormData}
                  onSubmit={handleBuyBricksSubmit}
                  validationSchema={buyBricksValidationSchema}
                  fields={buyBricksFormFields}
                  formInfo={buyBricksFormInfo}
                  handleError={handleBuyBricksError}
                  handleSucccess={handleBuyBricksSuccess}
                  propertyOwnershipContractAddress={
                    propertyOwnershipContractAddress as any
                  }
                  price={price}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* List tokens Modal */}
      <Modal
        isOpen={isListModalOpen}
        className="buy-bricks-modal p-0 !max-h-[615px]"
      >
        <div className="buy-bricks-modal-content pb-4">
          <div className="flex-col gap-8 mb-[32px]">
            <div className="flex-space-between flex-center">
              <span className="circle-accent accent-500">
                <BrickSell />
              </span>
              <span className="cursor-pointer close-button">
                <CloseIcon
                  onClick={() => setIsListModalOpen(false)}
                  className="stroke-[2px]"
                />
              </span>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-[32px]">Sell Bricks</h2>
          <h2 className="text-2xl font-bold mb-[24px]">Choose option</h2>

          <div className="flex flex-col gap-16 pr-2">
            <div
              className="grid-item "
              onClick={() => setIsResaleBackBricksModalOpen(true)}
            >
              <div className="flex-col gap-16 market-place-card !min-h-[188px] cursor-pointer duration-300 hover:drop-shadow-xl">
                <div className="item">
                  <div className="square-round-border bg-color-accent-300">
                    <StarCheck style={{ color: "#ffffff" }} />
                  </div>
                </div>
                <div className="item flex flex-center gap-8">
                  <div className="item text-lg text-semiBold text-primary-800">
                    Sell Bricks back to the Libelit Platform
                  </div>
                  <div className="item">
                    {" "}
                    <RightArrow />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="grid-item "
              onClick={() => setIsResaleBricksModalOpen(true)}
            >
              <div className="flex-col gap-16 market-place-card !min-h-[188px]  cursor-pointer  duration-300 hover:drop-shadow-xl">
                <div className="item">
                  <div className="square-round-border bg-color-secondary-300">
                    <BrickSell style={{ color: "#ffffff" }} />
                  </div>
                </div>
                <div className="item flex flex-center gap-8">
                  <div className="item text-lg text-semiBold text-primary-800">
                    List Bricks on Resale Marketplace
                  </div>
                  <div className="item">
                    {" "}
                    <RightArrow />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Resale to libelit modal */}
      <Modal
        isOpen={isResaleBackBricksModalOpen}
        className="buy-bricks-modal p-0"
      >
        <div className="buy-bricks-modal-content ">
          <div className="flex-col gap-8 mb-[32px]">
            <div className="flex-space-between flex-center">
              <span className="circle-accent accent-500">
                <BrickSell />
              </span>
              <span className="cursor-pointer close-button">
                <CloseIcon
                  onClick={() => setIsResaleBackBricksModalOpen(false)}
                  className="stroke-[2px]"
                />
              </span>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-[16px]">
            Resale your Bricks to Libelit
          </h2>

          <div className="flex mb-[32px]">
            <div className="p-[8px] pt-[10px]">
              <WarnIcon />
            </div>
            <div className="text-md text-primary-900 p-[8px] pl-0">
              If you wish to sell your bricks for a{" "}
              <span className="text-md text-semiBold">higher price</span>,
              consider listing them for sale on the{" "}
              <span className="text-md text-semiBold">Resale Marketplace</span>{" "}
              , or keeping your bricks until the project is complete and can pay
              you an investment return.
            </div>
          </div>
          <div className="buy-bricks-form-card  ">
            <div className="buy-bricks-details flex">
              <div className="w-[80px] h-[80px]">
                <Image
                  src={mainImageSrc ?? "/images/house.png"}
                  alt="project image"
                  height={80}
                  width={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className=" text-lg text-regular color-primary-600">
                <div className="buy-bricks-details-project-title d-h4 color-primary-900">
                  {projectDetail.projectMeta.name}
                </div>
                <div>
                  Resale Brick value = <span className="text-accent-600"></span>
                  <span className="text-accent-400 text-semiBold">
                    80.00 USDC
                  </span>
                </div>
                <div>Your Bricks: {pptBalance}</div>
              </div>
            </div>

            <div className="buy-bricks-form-div ">
              <div className="buy-bricks-form ">
                <SellBackForm
                  initialValues={buyBricksInitialFormData}
                  onSubmit={handleSellBackSubmit}
                  validationSchema={buyBricksValidationSchema}
                  fields={buyBricksFormFields}
                  formInfo={buyBricksFormInfo}
                  handleError={handleSellBackError}
                  handleSucccess={handleSellBackSuccess}
                  propertyOwnershipContractAddress={
                    propertyOwnershipContractAddress as any
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Resale modal */}
      <Modal isOpen={isResaleBricksModalOpen} className="buy-bricks-modal p-0">
        <div className="buy-bricks-modal-content ">
          <div className="flex-col gap-8 mb-[32px]">
            <div className="flex-space-between flex-center">
              <span className="circle-accent accent-500">
                <BrickSell />
              </span>
              <span className="cursor-pointer close-button">
                <CloseIcon
                  onClick={() => setIsResaleBricksModalOpen(false)}
                  className="stroke-[2px]"
                />
              </span>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-[16px]">
            List Bricks on resale market
          </h2>
          <div className="flex mb-[32px]">
            <div className="p-[8px] pt-[10px]">
              <WarnIcon />
            </div>
            <div className="text-md text-primary-900 p-[8px] pl-0">
              Remember, you are only allowed to list{" "}
              <span className="text-md text-semiBold">one proposal </span>
              for each project. If you wish to sell your bricks for a{" "}
              <span className="text-md text-semiBold">high price</span>,
              consider the purchase risk.
            </div>
          </div>

          <div className="buy-bricks-form-card  ">
            <div className="buy-bricks-details flex">
              <div className="w-[80px] h-[80px]">
                <Image
                  src={mainImageSrc ?? "/images/house.png"}
                  alt="project image"
                  height={80}
                  width={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className=" text-lg text-regular color-primary-600">
                <div className="buy-bricks-details-project-title d-h4 color-primary-900">
                  {projectDetail.projectMeta.name}
                </div>
                <div>
                  1 Initial brick value ={" "}
                  <span className="text-semiBold">
                    ${projectDetail.projectMeta.unitPricePerBrick} (
                    {projectDetail.projectMeta.unitPricePerBrick} USDC)
                  </span>
                </div>
                <div>Your Bricks: {pptBalance}</div>
              </div>
            </div>

            <div className="buy-bricks-form-div ">
              <div className="buy-bricks-form ">
                <ResaleForm
                  initialValues={resaleBricksInitialFormData}
                  onSubmit={handleResaleSubmit}
                  validationSchema={resaleBricksValidationSchema}
                  fields={resaleBricksFormFields}
                  formInfo={buyBricksFormInfo}
                  handleError={handleSellBackError}
                  handleSucccess={handleResaleSuccess}
                  propertyOwnershipContractAddress={
                    propertyOwnershipContractAddress as any
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <AwaitTransactionModal
        isTransactionModalOpen={isTransactionModalOpen}
        setIsTransactionModalOpen={setIsTransactionModalOpen}
        transaction={{ walletAddress: "" }}
      />

      {/* transaction success modals */}

      <Modal
        isOpen={isResaleBackSuccessModalOpen}
        className="wallet-connect-modal  !h-fit"
      >
        <div className="flex-col gap-32">
          <div className="flex-space-between flex-center">
            <span className="icon-container">
              <CheckIcon className="accent-500" />
            </span>
            <span className="">
              <CloseIcon
                onClick={() => {
                  setIsResaleBackSuccessModalOpen(false);
                }}
              />
            </span>
          </div>

          <div>
            <div className="d-h3">Congratulations!</div>
            <div className="mt-16 ">
              You have successfully sold{" "}
              <span className="text-semiBold ">
                {saleDetails?.numberOfBricks} Brick
                {saleDetails?.numberOfBricks > 1 && "s"}{" "}
              </span>
              from the project{" "}
              <span className="text-semiBold ">
                {projectDetail.projectMeta.name}
              </span>
              . You will be informed about further steps by email.
            </div>
            <Button
              text="Back to portfolio"
              onClick={() => {
                router.push("/user/portfolio");
              }}
              className="btn text-lg  btn-contained-dark  mt-32 p-12-26 w-100p "
              tooltipTitle="Continue"
              tooltipText=""
              dataTooltipId="Continue"
            />
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isResaleSuccessModalOpen}
        className="wallet-connect-modal !h-fit "
      >
        <div className="flex-col gap-32">
          <div className="flex-space-between flex-center">
            <span className="icon-container">
              <CheckIcon className="accent-500" />
            </span>
            <span className="">
              <CloseIcon
                onClick={() => {
                  setIsResaleSuccessModalOpen(false);
                }}
              />
            </span>
          </div>
          <div>
            <div className="d-h3">Success!</div>
            <div className="mt-16 text-primary-600">
              You have successfully put{" "}
              <span className="text-semiBold ">
                {saleDetails?.numberOfBricks} Brick
                {saleDetails?.numberOfBricks > 1 && "s"}
              </span>{" "}
              from the project{" "}
              <span className="text-semiBold ">
                {projectDetail.projectMeta.name}
              </span>{" "}
              on resale market. Once your proposal is sold you will be informed
              on further steps.
            </div>
            <Button
              text="Back to portfolio"
              onClick={() => {
                router.push("/user/portfolio");
              }}
              className="btn text-lg  btn-contained-dark  mt-32 p-12-26 w-100p "
              tooltipTitle="Continue"
              tooltipText=""
              dataTooltipId="Continue"
            />
          </div>
        </div>
      </Modal>
      {/* terms modal */}
      <Modal
        isOpen={isTermsIFrameOpen}
        className="vr-tour-modal !h-fit !max-h-[600px] !max-w-[95%]"
      >
        <div className=" flex flex-col h-full ">
          <div className=" gap-8 ">
            <div className="flex justify-between ">
              <div className="text-semiBold text-lg">Terms and Conditions</div>
              <div className="flex gap-8">
                <div className="cursor-pointer close-button">
                  <CloseIcon onClick={closeTermsIFrameModal} />
                </div>
              </div>
            </div>
          </div>
          <div className="grow">
            <div className=" max-h-[500px] overflow-y-auto">
              By accessing this website we assume you accept these terms and
              conditions. Do not continue to use Libelit if you do not agree to
              take all of the terms and conditions stated on this page. The
              following terminology applies to these Terms and Conditions,
              Privacy Statement and Disclaimer Notice and all Agreements:
              "Client", "You" and "Your" refers to you, the person log on this
              website and compliant to the Company's terms and conditions. "The
              Company", "Ourselves", "We", "Our" and "Us", refers to our
              Company. "Party", "Parties", or "Us", refers to both the Client
              and ourselves. <br />
              <br />
              All terms refer to the offer, acceptance and consideration of
              payment necessary to undertake the process of our assistance to
              the Client in the most appropriate manner for the express purpose
              of meeting the Client's needs in respect of provision of the
              Company's stated services, in accordance with and subject to,
              prevailing law of [Your Country]. Any use of the above terminology
              or other words in the singular, plural, capitalization and/or
              he/she or they, are taken as interchangeable and therefore as
              referring to same. Cookies We employ the use of cookies.
              <br />
              <br />
              By accessing Libelit, you agreed to use cookies in agreement with
              the Libelit's Privacy Policy. Most interactive websites use
              cookies to let us retrieve the user’s details for each visit.
              Cookies are used by our website to enable the functionality of
              certain areas to make it easier for people visiting our website.
              Some of our affiliate/advertising partners may also use cookies.
              License Unless otherwise stated, Libelit and/or its licensors own
              the intellectual property rights for all material on Libelit's
              Website. All intellectual property rights are reserved. You may
              access this from Libelit for your own personal use subjected to
              restrictions set in these terms and conditions.
              {/* <Iframe
                scrolling="no"
                allowFullScreen
                allow="gyroscope; accelerometer; xr-spatial-tracking; vr;"
                url="https://naniby.shapespark.com/libelit_osadnicza_preview_04/#help"
                className="iframe"
              ></Iframe> */}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ProjectDetails;
