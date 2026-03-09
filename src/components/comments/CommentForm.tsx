import React, { useEffect, useRef, useState } from "react";
import UserIcon from "public/icons/general/user.svg";

import Tooltip from "../UiComponents/Tooltip";

import Image from "next/image";
import planeIcon from "@icons/general/plane-white.svg?url";
import { useContainer } from "@/contexts/ContainerContext";

import router from "next/router";
import { useAlert } from "@/contexts/AlertContext";
import axiosClient from "@/app/axiosClient";
import deleteIcon from "@icons/general/delete-white.svg?url";

function CommentForm({
  isEditing,
  cancelEditing,
  initialComment,
  onSubmit,
  projectId,
  parentId,
}: any) {
  const { alert } = useAlert();

  const isDemo = router.pathname.startsWith("/demo");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comment, setComment] = useState(initialComment ?? "");
  const { user } = useContainer();

  const cancelEdit = () => {
    cancelEditing();
  };

  const submitComment = async () => {
    if (isEditing) {
      setIsSubmitting(true);
      await onSubmit(comment);
      setIsSubmitting(false);
      return;
    }
    if (isSubmitting || !comment.length) return;
    setIsSubmitting(true);

    try {
      let endpoint = `/comment/postComment?projectId=${projectId}`;
      if (parentId) {
        endpoint += `&parentId=${parentId}`;
      }
      const response = await axiosClient.post(endpoint, {
        comments: comment,
      });

      if (response.status == 200) {
        console.log(response);

        setComment("");

        alert("Comment successfully posted!", "success");
        onSubmit();
      }
    } catch (error) {
      console.log(error);
      alert("There was an error submitting your comment.", "error");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="h-[40px]">
      <div className="flex items-center gap-12  !w-full !max-w-full h-full">
        {/* profile picture */}
        <div className="item comment-profile-image flex-vertical-center bg-circle ">
          {user && user.imageUrl ? (
            <div className="flex-item bg-circle no-shrink border-0 !bg-white !border-white">
              <Image
                src={user.imageUrl}
                width={100}
                height={100}
                className="w-full h-full rounded-[100%]"
                alt="user-icon"
              />
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
        </div>
        <div
          tabIndex={0}
          className="group flex items-center gap-12 form-container !w-full !max-w-full h-full"
        >
          {/* text box */}
          <div className="form-field-each !w-full h-full ">
            <div
              className="item text-primary-400 !w-full h-full form-field-each"
              onClick={() =>
                isDemo && alert("You need to login to add a comment.", "error")
              }
            >
              <div className="!w-full  h-full !mb-0 flex items-center">
                <textarea
                  className="w-full text-md h-[20px] !border-0 !p-0 !overflow-auto focus:!border-none focus:!outline-none resize-none "
                  placeholder="Write your comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  disabled={isDemo || isSubmitting}
                ></textarea>
              </div>
            </div>
          </div>
          {/*  buttons container */}
          <div
            className={`hidden  gap-8 items-center ${
              !isDemo && "group-focus-within:flex"
            }`}
          >
            {/* cancel button */}
            {isEditing && (
              <div
                className={`rounded-full bg-primary-800 w-8 h-8 p-2  flex justify-center items-center  
          ${isSubmitting ? "cursor-defult" : "cursor-pointer"}`}
                onClick={cancelEdit}
              >
                {isSubmitting ? (
                  <div className="loading-small-white"></div>
                ) : (
                  <Image src={deleteIcon} width={13} height={13} alt="send" />
                )}
              </div>
            )}

            {/* submit button */}
            <div
              className={`rounded-full bg-primary-800 w-8 h-8 p-2  flex justify-center items-center  
          ${isSubmitting ? "cursor-defult" : "cursor-pointer"}`}
              onClick={submitComment}
            >
              {isSubmitting ? (
                <div className="loading-small-white"></div>
              ) : (
                <Image src={planeIcon} width={13} height={13} alt="send" />
              )}
            </div>
          </div>
        </div>
        {isDemo && (
          <Tooltip
            anchorSelect={`comment`}
            title={"You need to login to add a comment."}
            place="top"
          />
        )}
      </div>
    </div>
  );
}

export default CommentForm;
