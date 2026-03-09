import styles from "./page.module.scss";
import Image from "next/image";
import dynamic from "next/dynamic";
import HomeButton from "../components/homePage/HomeButton";
import libelitLogo from "../../public/logo/libelit-logo.svg?url";
import collapesedMenu from "../../public/icons/general/menu-collapsed.svg?url";
import brightLogo from "../../public/logo/brighter-logo.svg?url";
import homeBanner from "../../public/images/home-banner.png";
import planeIcon from "../../public/icons/general/plane.svg?url";
import shieldIcon from "../../public/icons/finance/shield.svg?url";
import FeatureCard from "@/components/UiComponents/featureCard";
import cryptoIcon from "../../public/icons/finance/crypto.svg?url";
import impactIcon from "../../public/icons/finance/impact.svg?url";
import houseImage from "../../public/images/house.png";
import sunshineIcon from "../../public/icons/general/sunshine.svg?url";
import ellipseIcon from "../../public/icons/homeicons/ellipse.svg?url";
import rectangleIcon from "../../public/icons/homeicons/rectangle.svg?url";
import arrowIcon from "../../public/icons/homeicons/arrow.svg?url";
import homeFooterImage from "../../public/images/home-footer.png";
import SubscribeButton from "@/components/homePage/SubscribeButton";
import twitterLogo from "../../public/images/socials/twitter.png";
import linkedInLogo from "../../public/images/socials/linkedin.png";
import facebookLogo from "../../public/images/socials/facebook.png";
import { useEffect } from "react";

export default function Home() {
  return (
    <>
      <div className="page-container">
        {/* section-header */}
        <div className="page-header">
          <div className="logo" id="hp-logo">
            <Image className="logo-img" src={libelitLogo} alt="libelit logo" />
          </div>
          <div className="menu menu-lg">
            <HomeButton />
          </div>
          <div className="menu menu-sm">
            <Image
              className="menu-handle"
              src={collapesedMenu}
              alt="collapsed menu"
            />
          </div>
        </div>
        {/* #section-header */}

        {/* section-body */}
        <div className="page-body">
          <div className="page-body-top lg-pos-rel">
            <div className="page-header-text lg-pos-abs">
              <div className="page-header-text--heading d-h1 text-xl">
                Unlock &nbsp;
                <div className="pos-rel inline-block">
                  <Image
                    className="pos-abs bright-pos"
                    src={brightLogo}
                    alt="Logo of bright sun"
                  />
                  Brighter &nbsp;
                </div>
                future of real estate investing
              </div>
              <div className="page-header-text--body text-xl text-content ">
                Welcome to Libelit - Merging innovation, good architecture and
                sustainability in real estate!
              </div>
              {/* section buttons */}
              <div className="grid-container lg-flex login-btn">
                <HomeButton />
              </div>
              {/* section #buttons */}
            </div>
            <div className="lg-grid-container">
              <div className="lg-grid-item"></div>
              <div className="lg-grid-item">
                <div className="home-dual-image">
                  <div className="pos-rel">
                    <div className="curved-border">
                      <div className="curved-img-container full-img">
                        <Image
                          className="home-banner"
                          src={homeBanner}
                          alt="home banner"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* #section-body */}
        </div>

        {/* section mission */}
        <div className="home-description-container">
          <div className="home-description-main">
            <div className="home-description-title text-center text-lg text-semiBold">
              Our mission
            </div>
            <div className="home-description-heading text-center d-h2">
              World of new principles
            </div>
            <div className="home-description-text text-xl text-regular text-center">
              Gone are the days when property investment was the domain of the
              well-heeled. Step into the new era of real estate investment with
              Libelit, where we're revolutionizing the traditional landscape.
            </div>
          </div>
        </div>
        {/* #section mission */}

        {/* section feature */}
        <div className="features">
          <div className="grid-container">
            <div className="grid-item mt-32">
              <FeatureCard
                icon={planeIcon}
                iconAlt="Icon Plane"
                title="Seize Your Share!"
                description="Our platform empowers you to grab your share in prime real estate through fractional ownership. 
                                You no longer need deep pockets to dive into the real estate market. "
              />
            </div>
            <div className="grid-item mt-32">
              <FeatureCard
                icon={shieldIcon}
                iconAlt="Transparent and Secure"
                title="Transparent & Secure"
                description="Security and transparency are our cornerstones. 
                                Enjoy peace of mind knowing that your assets are safely encrypted and every transaction is 
                                clear as day. "
              />
            </div>
            <div className="grid-item mt-32">
              <FeatureCard
                icon={cryptoIcon}
                iconAlt="Web3 Powered"
                title="Web3 Powered"
                description="We’re ahead of the curve, bridging real estate and Web3. 
                                Simplify and amplify your investments by integrating the financial potential of blockchain."
              />
            </div>
            <div className="grid-item mt-32">
              <FeatureCard
                icon={impactIcon}
                iconAlt="Impactful Investing"
                title="Impactful Investing"
                description="Make your investments count for more than just profit. Libelit is committed 
                                to an environmentally conscious approach. Be a part of something bigger and contribute to a greener tomorrow."
              />
            </div>
          </div>
        </div>
        {/* #section feature */}

        {/* section ad */}
        <div className="section-ad grid-container">
          <div className="grid-item pos-rel">
            <div className="image-container full-img">
              <Image src={houseImage} alt="Join today" />
            </div>

            <div className="pos-abs join-overlay overlay flex-col">
              <div className="flex-item-container p-24 flex-col feature-text-flex">
                <div className="flex-col-item">
                  <Image src={sunshineIcon} alt="Join us icon" />
                </div>
                <div className="flex-col-item feature-text">
                  Your <br />
                  Property.
                </div>
                <div className="flex-col-item feature-text">
                  Your <br />
                  Currency.
                </div>
                <div className="flex-col-item feature-text">
                  Your <br />
                  Future.
                </div>
              </div>
            </div>
          </div>
          <div className="section-ad-container grid-item">
            <div className="ad-content">
              <div className="section-ad--title ad-text">
                Join us at Libelit
              </div>
              <div className="section-ad--text text-xl text-regular color-primary-600">
                Where we’re breaking down barriers and opening doors to the
                future of real estate investment.
              </div>
              <div className="grid-container lg-flex ad-btns login-btn">
                <HomeButton />
              </div>
            </div>
          </div>
        </div>
        {/* #section ad */}

        {/* section other projects */}
        <div className="other-projects-section">
          <div className="other-proj-container">
            <div className="grid-container more">
              <div className="grid-item">
                <div className="other-proj-subtitle text-lg accent-500 text-semiBold">
                  What's more
                </div>
                <div className="other-proj-title d-h2">
                  Do you think it's cool?
                </div>
                <div className="other-proj-info color-primary-600 text-regular text-xl">
                  Check out our other projects
                </div>
              </div>
              <div className="other-proj-icons grid-item">
                <div className="project-item flex flex-center justify-content-start">
                  <div className="project-icon">
                    <Image src={ellipseIcon} alt="Project Icon" />
                  </div>
                  <div className="project-title d-h4">Halflanders</div>
                  <div className="info-arrow">
                    <Image src={arrowIcon} alt="Project Icon" />
                  </div>
                </div>
                <div className="project-item flex flex-center justify-content-start">
                  <div className="project-icon">
                    <Image src={rectangleIcon} alt="Project Icon" />
                  </div>
                  <div className="project-title d-h4">
                    Immersed Architecture
                  </div>
                  <div className="info-arrow">
                    <Image src={arrowIcon} alt="Project Icon" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* #section other projects */}

          <div className="sm-container footer-image">
            <div className="full-img text-center">
              <Image src={homeFooterImage} alt="Home Footer" />
            </div>
          </div>
        </div>

        {/* section newsletter */}
        <div className="section-letter">
          <div className="section-letter-content">
            <div className="letter-title d-h2 text-center">
              Also join our newsletter
            </div>
            <div className="letter-subtitle text-xl text-regular text-center color-primary-600">
              Be the first to know about project's news and insights.
            </div>
            <div className="newsletter-form">
              <div className="input-form-email">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                />
                <div className="input-info text-md primary-400">
                  We care about your data in our privacy policy.
                </div>
              </div>
              <SubscribeButton className="btn home-btn text-lg btn-contained sm-mt-12 newsletter-btn" />
            </div>
          </div>
        </div>
        {/* #section newsletter */}

        {/* section footer */}
        <div className="section-footer">
          <div className="footer-logo">
            <Image src={libelitLogo} alt="logo" />
          </div>

          <div className="grid-container">
            <div className="grid-item">
              <div className="footer-menu">
                <ul className="flex">
                  <li className="text-lg flex-grow-1 text-semiBold">
                    About us
                  </li>
                  <li className="text-lg flex-grow-1 text-semiBold">
                    Projects
                  </li>
                  <li className="text-lg flex-grow-1 text-semiBold">FAQ</li>
                </ul>
              </div>
            </div>
            <div className="grid-item">
              <div className="footer-logos">
                <ul className="flex">
                  <li className="social-icon">
                    <Image src={twitterLogo} alt="Twitter Logo" />
                  </li>
                  <li className="social-icon">
                    <Image src={linkedInLogo} alt="Linkedin Logo" />
                  </li>
                  <li className="social-icon">
                    <Image src={facebookLogo} alt="Facebook Logo" />
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="divider"></div>
          <div className="grid-container">
            <div className="grid-item copyright-info text-lg text-regular">
              @ 2023 Libelit. All rights reserved
            </div>
            <div className="grid-item footer-extra-menu">
              <ul className="flex">
                <li className="text-lg flex-grow-1">Terms</li>
                <li className="text-lg flex-grow-1">Privacy</li>
                <li className="text-lg flex-grow-1">Cookies</li>
              </ul>
            </div>
          </div>
        </div>
        {/* #section footer */}
      </div>
    </>
  );
}
