import CaretLeft from "../../../public/icons/arrows/caret-left.svg";
import CaretRight from "../../../public/icons/arrows/caret-right.svg";
import teamAvatarImage from "../../../public/images/avatar-1.png";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface memberProp {
  deleted: Boolean;
  description: String;
  name: String;
  projectId: Number;
  role: String;
  teamMembersId: Number;
  memberImageOriginalSizeUrl?: string;
}
export default function ProjectTeam({
  teamMembers,
  resale,
}: {
  teamMembers: memberProp[];
  resale: boolean;
}) {
  const [memberIndex, setMemberIndex] = useState(0);
  const memberData = teamMembers[memberIndex];

  const prevMember = () => {
    setMemberIndex((memberIndex - 1 + teamMembers.length) % teamMembers.length);
  };

  const nextMember = () => {
    setMemberIndex((memberIndex + 1) % teamMembers.length);
  };

  return (
    <div className="section-project-team curved-section p" id="project-team">
      <div className="section-title d-h4">Project team</div>

      {teamMembers.length ? (
        <div className={`project-details-card mt-12 ${resale && "!px-0"}`}>
          <div className="project-details-content">
            <div className="project-team-avatar object-cover">
              <Image
                src={memberData?.memberImageOriginalSizeUrl ?? teamAvatarImage}
                alt="Avatar"
                width="176"
                height="176"
                className="object-cover"
              />
            </div>

            <div className="d-h4 color-primary-900  project-team-name">
              {memberData.name} | {memberData.role}
            </div>
            <div className="color-primary-700 item text-lg project-team-bio min-w-[300px] text-wrap">
              {memberData.description}
            </div>
          </div>
          <div className="mt-40 flex-center gap-70">
            <CaretLeft onClick={prevMember} className="handcursor" />
            <CaretRight onClick={nextMember} className="handcursor" />
          </div>
        </div>
      ) : (
        <div className="project-details-card mt-12">
          <div className="color-primary-700 h-100 flex-center ">
            This project has no team members.
          </div>
        </div>
      )}
    </div>
  );
}
