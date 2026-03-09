import React from "react";
import circleIcon from "@icons/shapes/circle.svg?url";
import Image from "next/image";
import styles from "./styles.module.scss";

interface Phase {
  heading: string;
  desc: string;
}
function Phases({ phases }: { phases: Phase[] }) {
  return (
    <>
      {phases.map((phase, i) => (
        <div className="flex gap-4 md:gap-8" key={i}>
          <div className="flex flex-col gap-1  shrink-0 ">
            <div className="p-3 relative">
              <Image src={circleIcon} width={24} height={24} alt="circle" />
            </div>
            <div
              className={`m-auto border-accent-500 border h-full ${styles.phaseLine}`}
            ></div>
          </div>

          <div className="pt-2.5 pb-2 flex flex-col gap-2.5 text-black">
            <div className="text-lg font-bold">{phase.heading}</div>
            <div className="text-base font-normal">
              {phase.desc.split("\\n").map((phase, i) => (
                <React.Fragment key={i}>
                  {phase} <br />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Phases;
