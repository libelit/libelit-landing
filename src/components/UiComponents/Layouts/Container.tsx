"use client";
import React, {
  useState,
  ReactNode,
  useEffect,
  useRef,
  useContext,
} from "react";
import Sidebar from "./Sidebar";
import Navigation from "./Navigation";
import { isAuthenticated, logout } from "@/utility/auth";
import { useRouter } from "next/router";
import { useContainer } from "@/contexts/ContainerContext";

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<any>(null);
  const router = useRouter();
  const handleSidebarToggle = () => {
    setIsOpen(!isOpen);
  };

  const logoutIfNotAuthenticated = async () => {
    const isUserAuthenticated = await isAuthenticated();
    const isDemoRoute =
      router.pathname === "/demo" || router.pathname.startsWith("/demo/");
    const isUserRoute =
      router.pathname === "/user" || router.pathname.startsWith("/user/");
    if (isUserRoute && !isUserAuthenticated) {
      logout();
      router.push("/user/login");
    } else if (isDemoRoute && isUserAuthenticated) {
      router.push("/access-denied");
    }
  };

  const handleOutsideClick = (e: any) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    let isSmall = window.innerWidth <= 1280;

    if (isSmall) {
      setIsOpen(false);
    }
  }, [router.pathname]);

  useEffect(() => {
    let isSmall = window.innerWidth <= 1280;

    if (isSmall) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    logoutIfNotAuthenticated();

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="main-container">
      <div
        className={`grid-container page-wrapper ${
          isOpen ? "page-wrapper-2col" : "page-wrapper-1col"
        }`}
      >
        <div
          className={`grid-item ${
            isOpen ? "side-bar-open" : "side-bar-close"
          }  lg:!hidden`}
          ref={sidebarRef}
        >
          <Sidebar isOpen={isOpen} handleSidebarToggle={handleSidebarToggle} />
        </div>

        <div className="grid-item side-bar-open !hidden lg:!flex">
          <Sidebar isOpen={true} handleSidebarToggle={handleSidebarToggle} />
        </div>

        <div className="grid-item content-section">
          <div className="main-container-content">
            <div className="page-navigation">
              <Navigation
                isOpen={isOpen}
                handleSidebarToggle={handleSidebarToggle}
              />
            </div>
            <div className="page-content">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
