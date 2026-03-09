"use client";

import React, { useEffect, useRef, useState } from "react";

function Animate({
  type,
  className,
  reverse,
  children,
  disableHide,
}: {
  type:
    | "pull-up-first"
    | "pull-up-second"
    | "pull-up-third"
    | "fade-in-first"
    | "fade-in-second"
    | "fade-in-third";
  className?: string;
  reverse?: boolean;
  children: any;
  disableHide?: boolean;
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [animatedOnce, setAnimatedOnce] = useState(false);

  const scrollDirection = useRef<any>();
  const visibleCount = useRef<any>();
  useEffect(() => {
    scrollDirection.current = "down";
    visibleCount.current = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        console.log(entries);
        entries.forEach((entry) => {
          if (entries[0].isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    window.addEventListener("wheel", (event) => {
      if (event.deltaY > 0) {
        scrollDirection.current = "down";
      } else if (event.deltaY < 0) {
        scrollDirection.current = "up";
      }
    });

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      setIsLoaded(true);
    } else {
      visibleCount.current++;
      if (visibleCount.current >= 2) setAnimatedOnce(true);
    }
    console.log(isVisible);
  }, [isVisible]);

  return (
    <div className="w-full h-full " ref={ref}>
      <div
        className={`${!isLoaded && "opacity-0"} ${className} ${
          isVisible && !(animatedOnce && disableHide)
            ? scrollDirection.current == "down"
              ? type
              : reverse
              ? type + "-reverse"
              : "opacity-100"
            : "opacity-0"
        } ${isLoaded && animatedOnce && disableHide ? "opacity-100" : ""} `}
      >
        {children}
      </div>
    </div>
  );
}

export default Animate;
