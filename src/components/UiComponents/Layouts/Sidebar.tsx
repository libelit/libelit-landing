import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "public/logo/libelit-logo.svg?url";
import HomeIcon from "public/icons/general/home.svg";
import WalletLogo from "public/icons/finance/wallet.svg";
import MarketplaceLogo from "public/icons/finance/marketplace.svg";
import PortfolioLogo from "public/icons/shapes/portfolio.svg";
import KnowHowLogo from "public/icons/files/know-how.svg";
import SettingLogo from "public/icons/general/settings.svg";
import LandingLogo from "public/icons/shapes/landing.svg";
import FooterLogo from "public/icons/general/footer-login.svg";
import Tooltip from "../Tooltip";
import ArrowLeftIcon from "public/icons/arrows/caret-left.svg";
import UserIcon from "public/icons/general/user.svg";
import { getUsernameFromToken, logout } from "@/utility/auth";
import { useContainer } from "@/contexts/ContainerContext";

function Sidebar(props: any) {
  const router = useRouter();
  const { user } = useContainer();
  const [sidebarImageLoaded, setSidebarImageLoaded] = useState(false);

  const [username, setUsername] = useState(null);
  const isDemoRoute =
    router.pathname === "/demo" || router.pathname.startsWith("/demo/");
  useEffect(() => {
    // Call the getUsernameFromToken function when the component mounts
    const user = getUsernameFromToken();
    setUsername(user);
  }, []);

  const isActive = (pathname: string) => {
    return router.pathname.includes(
      (isDemoRoute ? "/demo" : "/user") + pathname
    );
  };

  const { isOpen, handleSidebarToggle } = props;

  const handleLogoutClick = () => {
    logout();
  };

  const limitString = (str: String, len: Number) => {
    if (str.length > 19) {
      return str.slice(0, 19);
    }
    return str;
  };

  useEffect(() => {
    setSidebarImageLoaded(false);
  }, [user?.imageUrl]);

  return (
    <>
      {" "}
      <div className="menu-collapse" onClick={handleSidebarToggle}>
        <div className="flex-item bg-circle circle-btn-collapse border-0">
          <ArrowLeftIcon className="icon-white z-50" />
        </div>
      </div>
      <div className="sidebar flex flex-column overflow-visible h-full overflow-y-auto  ">
        <div className="flex-item w-full ">
          <div className="flex-column sidebartop">
            <a className="logo" href="/en">
              <Image
                className="logo-img "
                priority={true}
                src={Logo}
                alt="libelit logo"
              />
            </a>
            <div className="sidebarmenu-top pos-rel w-full ">
              <ul className="sidebar-menu-list">
                <Link href={`${isDemoRoute ? "/demo" : "/user"}/dashboard`}>
                  <li
                    className={
                      isActive("/dashboard")
                        ? "menu-item menu-active icon-black font-semibold "
                        : "menu-item menu-inactive icon-gray font-semibold "
                    }
                  >
                    {/* <div className=""><Image className="" src={Home} alt="home icon" style={{fill: 'red', stroke: 'red'}}></Image></div> */}
                    <div className="">
                      <HomeIcon width="24" height="24" />
                    </div>
                    <div className="text-lg text-semiBold">Home</div>
                  </li>
                </Link>
                <Link href={`${isDemoRoute ? "/demo" : "/user"}/wallet`}>
                  <li
                    className={
                      isActive("/wallet")
                        ? " menu-active icon-black menu-item"
                        : " menu-inactive icon-gray  menu-item"
                    }
                  >
                    {/* <div className=""><Image className="" src={WalletLogo} alt="wallet icon"></Image></div> */}
                    <div className="">
                      <WalletLogo width="24" height="24" />
                    </div>
                    <div className="text-lg text-semiBold">Wallet</div>
                  </li>
                </Link>
                <Link
                  href={`${
                    isDemoRoute ? "/demo" : "/user"
                  }/marketplace/new-projects`}
                >
                  <li
                    className={
                      isActive("/marketplace/new-projects")
                        ? " menu-active icon-black menu-item"
                        : " menu-inactive icon-gray  menu-item"
                    }
                  >
                    {/* <div className=""><Image className="" src={MarketplaceLogo} alt="marketplace icon"></Image></div> */}
                    <div className="">
                      <MarketplaceLogo width="24" height="24" />
                    </div>
                    <div className="text-lg text-semiBold">Marketplace</div>
                  </li>
                </Link>
                <Link href={`${isDemoRoute ? "/demo" : "/user"}/portfolio`}>
                  <li
                    className={
                      isActive("/portfolio")
                        ? " menu-active icon-black menu-item"
                        : " menu-inactive icon-gray  menu-item"
                    }
                  >
                    {/* <div className=""><Image className="" src={PortfolioLogo} alt="home icon"></Image></div> */}
                    <div className="">
                      <PortfolioLogo width="24" height="24" />
                    </div>
                    <div className="text-lg text-semiBold">Portfolio</div>
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex-item w-100p">
          <div className="sidebarmenu-bottom">
            <ul className="sidebar-menu-list">
              <Link href="/en/faq" target="_blank">
                <li
                  className={
                    isActive("/know-how")
                      ? " menu-active icon-black menu-item"
                      : " menu-inactive icon-gray  menu-item"
                  }
                >
                  {/* <div className=""><Image className="" src={KnowHowLogo} alt="guide icon"></Image></div> */}
                  <div className="">
                    <KnowHowLogo />
                  </div>
                  <div className="text-lg text-semiBold">Know-how</div>
                </li>
              </Link>
              <Link href={`${isDemoRoute ? "/demo" : "/user"}/settings`}>
                <li
                  className={
                    isActive("/settings")
                      ? " menu-active icon-black menu-item"
                      : " menu-inactive icon-gray  menu-item"
                  }
                >
                  {/* <div className=""><Image className="" src={SettingLogo} alt="settings icon"></Image></div> */}
                  <div className="">
                    <SettingLogo style={{ stroke: "rgb(66, 66, 66)" }} />
                  </div>
                  <div className="text-lg text-semiBold">Settings</div>
                </li>
              </Link>
              <Link href="/" target="_blank">
                <li
                  className={
                    isActive("/landing")
                      ? " menu-active icon-black menu-item"
                      : " menu-inactive icon-gray  menu-item"
                  }
                >
                  {/* <div className=""><Image className="" src={LandingLogo} alt="landing icon"></Image></div> */}
                  <div className="">
                    <LandingLogo style={{ stroke: "rgb(66, 66, 66)" }} />
                  </div>
                  <div className="text-lg text-semiBold">Website</div>
                </li>
              </Link>
            </ul>
            <div className="footer-border"></div>
            <div
              className="footer-profile flex justify-between items-start gap-24"
              data-tooltip-id="sidebar-user"
            >
              <div className="flex  flex-center gap-12 items-center">
                {user && user.imageUrl ? (
                  <div className="flex-item bg-circle no-shrink border-0 !bg-white !border-white relative object-cover">
                    <Image
                      src={user.imageUrl}
                      width={100}
                      height={100}
                      className="w-full h-full rounded-[100%] object-cover"
                      alt="user-image"
                      onLoad={() => setSidebarImageLoaded(true)}
                    />

                    {!sidebarImageLoaded && (
                      <div className="!w-[40px] !h-[40px] rounded-full bg-white absolute top-0 left-0 loader-container">
                        <div className="!w-[24px] !h-[24px] border-2 loading " />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex-item bg-circle no-shrink border-0">
                    <UserIcon
                      style={{
                        width: "24px",
                        height: "24px",
                      }}
                      className="icon-white"
                    />
                  </div>
                )}

                <div className="flex-item ">
                  <div className="footer-profile-username text-lg text-semiBold">
                    {limitString(
                      user?.username ? user.username : "Username",
                      19
                    )}
                  </div>
                  <div className="footer-profile-designation">
                    {user && user.displayRole
                      ? user.displayRole
                      : "Qualification"}
                  </div>
                </div>
              </div>
              <div className="flex-item ">
                <Link
                  href="/user/login"
                  onClick={handleLogoutClick}
                  data-tooltip-id="sidebar-logout"
                >
                  <FooterLogo className="icon-black" />
                </Link>
              </div>
            </div>
            {isDemoRoute ? (
              <Tooltip anchorSelect="sidebar-user" title="Log in" place="top" />
            ) : (
              <Tooltip
                anchorSelect="sidebar-logout"
                title="Log out"
                place="top-start"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
