"use client";
import React, {
  MouseEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ArrowLeftIcon from "/public/icons/arrows/caret-left-white.svg";
import ArrowRightIcon from "/public/icons/arrows/caret-right-white.svg";
import FullscreenIcon from "/public/icons/general/fullscreen.svg";
import ReactImageGallery from "react-image-gallery";
import ImageGalleryPagination from "./ImageGalleryPagination";
import { ReactImageGalleryProps } from "react-image-gallery";
import CustomImage from "@/components/UiComponents/Image";

const ImageGallery = ({
  items,
  imageClassName,
  skeletonClassName,
  showNav = true,
  showPlayButton = false,
  showBullets = false,
  showFullscreenButton = true,
  onChangeIndex,
  setCurrentItem,
}: any) => {
  let galleryRef: React.MutableRefObject<any> = useRef(null);

  const currentIndex = () => galleryRef.current?.getCurrentIndex();

  const slideToIndex = (index: any) => galleryRef.current?.slideToIndex(index);

  const toggleFullscreen = () => galleryRef?.current?.toggleFullScreen();

  const [isFullScreen, setIsFullScreen] = useState(false);

  const slideToPreviousIndex = () => {
    const nextIndex = currentIndex() - 1;
    slideToIndex(nextIndex);
    console.log(items[nextIndex]?.month, items[nextIndex]?.year);
    onChangeIndex && onChangeIndex(nextIndex);
    setCurrentItem &&
      setCurrentItem(items?.[(nextIndex + items.length) % items.length]);
  };

  const slideToNextIndex = () => {
    const nextIndex = currentIndex() + 1;
    slideToIndex(nextIndex);
    console.log(items[nextIndex]?.month, items[nextIndex]?.year);
    onChangeIndex && onChangeIndex(nextIndex);
    setCurrentItem && setCurrentItem(items?.[nextIndex % items.length]);
  };

  const imageGalleryLeftNav = (
    onClick: React.MouseEventHandler<HTMLElement>,
    disabled: boolean
  ) => (
    <div
      className="image-gallery-navs-custom image-gallery-nav-left"
      onClick={async (e) => {
        await setRenderItems(items);
        slideToPreviousIndex();
      }}
    >
      <ArrowLeftIcon />
    </div>
  );

  const [renderItems, setRenderItems] = useState<any>([]);

  useEffect(() => {
    setRenderItems(items.slice(0, Math.min(2, items.length)));
    setCurrentItem && setCurrentItem(items?.[0]);
  }, [items]);

  const imageGalleryRightNav = (
    onClick: React.MouseEventHandler<HTMLElement>,
    disabled: boolean
  ) => (
    <div
      className="image-gallery-navs-custom image-gallery-nav-right"
      onClick={async (e) => {
        await setRenderItems(items);
        slideToNextIndex();
      }}
    >
      <ArrowRightIcon />
    </div>
  );

  const renderCustomControls = () => {
    return (
      <div className="image-gallery-footer">
        {/* <div className="image-gallery-footer-title">Picture title</div> */}
        <div className="image-gallery-controls">
          <ImageGalleryPagination
            items={items}
            activeIndex={currentIndex()}
            slideToIndex={slideToIndex}
          />

          {/* <div className="image-gallery-fullscreen-icon">
                            <FullscreenIcon
                                className="fullscreen-icon"
                                onClick={toggleFullscreen}
                            />
                        </div> */}
        </div>
      </div>
    );
  };

  const handleImageClick = () => {
    if (galleryRef.current) {
      galleryRef.current.fullScreen();
    }
  };

  const handleScreenChange = (isFullScreen: boolean) => {
    setIsFullScreen(isFullScreen);
    console.log(isFullScreen);
  };
  return (
    <ReactImageGallery
      ref={galleryRef}
      items={renderItems?.map((item: any) => ({ ...item, loading: "lazy" }))}
      showNav={showNav}
      showPlayButton={showPlayButton}
      showBullets={showBullets}
      showFullscreenButton={showFullscreenButton}
      onClick={handleImageClick}
      onScreenChange={handleScreenChange}
      //   renderCustomControls={renderCustomControls}
      renderItem={(item) => (
        <CustomImage
          src={item.original}
          height="100"
          width="100"
          alt="Project image"
          skeletonClassName={`${skeletonClassName} ${
            isFullScreen && "!h-screen"
          }`}
          className={imageClassName}
        />
      )}
      renderLeftNav={imageGalleryLeftNav}
      renderRightNav={imageGalleryRightNav}
      lazyLoad={true}
    />
  );
};

export default ImageGallery;
