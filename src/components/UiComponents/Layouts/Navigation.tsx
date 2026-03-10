import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import notificationLogo from "../../../../public/icons/general/notification.svg?url";
import CloseIcon from "../../../../public/icons/general/x-close.svg";
import LoginIcon from "../../../../public/icons/general/login.svg";
import navigationHeaderMap from "@/components/UIHelpers/NavigationHeaderMap";
import navigationSubHeaderMap from "@/components/UIHelpers/NavigationSubHeaderMap";
import collapsedMenuIcon from "../../../../public/icons/general/menu-collapsed.svg?url";
import { useRouter } from "next/router";
import Modal from "../Modal";
import Button from "../Button/Button";
import Link from "next/link";
import logoIcon from "../../../../public/logo/Logo.png";
import LeftArrowIcon from "../../../../public/icons/arrows/left-arrow.svg";
import ReactModal from "react-modal";
import { getUsernameFromToken } from "@/utility/auth";
import { useContainer } from "@/contexts/ContainerContext";
import Tooltip from "../Tooltip";
import notificationLogoAccent from "../../../../public/icons/general/notification-accent.svg?url";

function Navigation(props: any) {
  const { isOpen, handleSidebarToggle } = props;
  const [history, setHistory] = useState<string[]>([]);
  const [isNotificationModelOpen, setIsNotificationModelOpen] = useState(false);
  const notificationRef = useRef<any>();

  const router = useRouter();
  const pathname = router.pathname;

  {
    /* Temporary state and handlers. Need to place at appropriate place. */
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { pageTitle } = useContainer();
  useEffect(() => {
    setUserName(getUsernameFromToken());
  }, []);

  useEffect(() => {
    //store last 2 pages

    if (history.length < 2) {
      setHistory((history) => [...history, router.asPath]);
      return;
    }

    setHistory((history) => {
      const temp_history = [...history];
      temp_history[0] = temp_history[1];
      temp_history[1] = router.asPath;
      return temp_history;
    });
  }, [router.asPath]);

  return (
    <>
      {/* large screen structure */}
      <div className="navbar navbar-lg">
        <div className="flex-item">
          <div className="nav-title d-h2 capitalize flex items-center gap-4">
            {pathname.split("/").at(-1) === "[id]" ? (
              <span className="back-route-arrow p-5">
                <LeftArrowIcon
                  onClick={() => {
                    if (history.length <= 1) router.back();
                    else {
                      router.push(history[0] as any);
                      setHistory([]);
                    }
                  }}
                />
              </span>
            ) : (
              ""
            )}

            {pageTitle ??
              (navigationHeaderMap.hasOwnProperty(pathname)
                ? pathname === "/user/dashboard"
                  ? navigationHeaderMap[pathname] + userName
                  : navigationHeaderMap[pathname]
                : pathname.split("/").at(-1))}
          </div>
          <div className="nav-subtitle text-lg">
            {navigationSubHeaderMap.hasOwnProperty(pathname)
              ? navigationSubHeaderMap[pathname]
              : ""}

            {/* Platform for investing in real-estate development projects. */}
          </div>
        </div>
        <div
          className="flex-item nav-icon"
          data-tooltip-id="notificationBellDesktop"
        >
          <Image
            src={notificationLogo}
            alt="notification icon"
            className="cursor-pointer"
            onClick={() => setIsNotificationModelOpen(true)}
          />
        </div>
      </div>
      {/* <Tooltip
        anchorSelect={"notificationBellDesktop"}
        title={"Notifications available soon"}
        place="top"
      /> */}

      {/* sm mg structure */}
      <div className="navbar-sm">
        <div className="navbar">
          <div className="item">
            <span
              className="btn-navigation-collapse"
              onClick={handleSidebarToggle}
            >
              <Image
                className="hover-pointer"
                src={collapsedMenuIcon}
                alt="menu"
              />{" "}
            </span>
          </div>
          <div className="item">
            <Image src={logoIcon} alt="logo" className="li-logo" />
          </div>
          <div className="item">
            <Image
              src={notificationLogo}
              alt="notification icon"
              // data-tooltip-id="notificationBell"
              onClick={(e) => {
                setIsNotificationModelOpen(true);
              }}
            />
          </div>
        </div>
        {/* <Tooltip
          anchorSelect={"notificationBell"}
          title={"Notifications available soon"}
          place="top"
        /> */}
        <div className="nav-title d-h2 capitalize flex items-center gap-4">
          {pathname.split("/").at(-1) === "[id]" ? (
            <span className="back-route-arrow p-5">
              <LeftArrowIcon onClick={() => router.back()} />
            </span>
          ) : (
            ""
          )}

          {pageTitle ??
            (navigationHeaderMap.hasOwnProperty(pathname)
              ? navigationHeaderMap[pathname]
              : pathname.split("/").at(-1))}
        </div>
        <div className="nav-subtitle text-lg">
          {navigationSubHeaderMap.hasOwnProperty(pathname)
            ? navigationSubHeaderMap[pathname]
            : ""}
        </div>
      </div>

      <Modal
        isOpen={isNotificationModelOpen}
        className="wallet-connect-modal !h-[300px] !max-h-[calc(100%-40px)]"
        reff={notificationRef}
      >
        <div className="flex-col gap-32">
          <div className="flex-space-between flex-center">
            <div className="icon-container">
              {/* <Image src={NotificationLogo} alt="notification icon" /> */}
              <Image src={notificationLogoAccent} alt="notification icon" />
            </div>
            <span className="cursor-pointer close-button">
              <CloseIcon onClick={() => setIsNotificationModelOpen(false)} />
            </span>
          </div>
          <div>
            <div className="d-h3">Notifications</div>
            <div className="mt-32">
              <div className="text-primary-500 mt-[48px] text-center">
                You don't have any notification.
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Temporary Modal. Need to place at appropriate place along with above openModal and closeModal event handlers and states. */}
      <Modal isOpen={isModalOpen} className="login-signup-modal !h-fit">
        <div className="flex-col gap-[32px]">
          <div className="flex-space-between flex-center">
            <Link href="/user/login" className="circle-accent">
              {/* <Image src={loginIcon} alt="Login" /> */}
              <LoginIcon className="accent-500" />
            </Link>
            <span className="cursor-pointer close-button">
              <CloseIcon onClick={closeModal} />
            </span>
          </div>
          <div>
            <h2 className="d-h3">Log in or sign up</h2>
            <p className="text-lg color-primary-600">
              In order to start your investing adventure, you need to log in or
              sign up first.
            </p>
          </div>
          <div className="flex-space-between gap-8">
            <Button
              hierarchy="primary"
              size="lg"
              text="Signup"
              onClick={() => router.push("/user/signup")}
              className="btn text-lg btn-contained sm-mt-12 bg-col-primary-900 flex-1 font-semibold cursor-pointer hover-accent"
            />

            <Button
              hierarchy="secondary"
              size="lg"
              text="Log in"
              onClick={() => router.push("/user/login")}
              className="btn btn-outline sm-mt-12 btn-outlined text-lg flex-1 font-semibold cursor-pointer hover-accent"
            />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Navigation;
