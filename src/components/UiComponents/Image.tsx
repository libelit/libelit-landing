import { useMemo, useState } from "react";
import NextImage from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function Image({ src, height, width, className, alt, skeletonClassName }: any) {
  const [isLoaded, setIsLoaded] = useState(false);

  // const renderImage = useMemo(
  //   () =>
  //     src && (
  //       <Image
  //         src={src}
  //         height={height}
  //         width={width}
  //         alt={alt}
  //         onLoad={() => {
  //           !isLoaded && setIsLoaded(true);
  //         }}
  //         className={` ${className} ${isLoaded ? "block" : "hidden"}`}
  //       />
  //     ),
  //   [src]
  // );

  return (
    <>
      {!isLoaded && <Skeleton className={` ${skeletonClassName}`} />}
      {src && (
        <NextImage
          src={src}
          height={height}
          width={width}
          alt={alt}
          onLoadingComplete={(e) => {
            setIsLoaded(true);
          }}
          className={` ${className} ${!isLoaded && "!w-0 !h-0"} `}
          unoptimized
          loading="lazy"
        />
      )}
    </>
  );
}

export default Image;
