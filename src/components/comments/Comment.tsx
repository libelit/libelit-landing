import React, { useEffect, useRef, useState } from "react";
import UserIcon from "public/icons/general/user.svg";

import { useContainer } from "@/contexts/ContainerContext";
import Image from "next/image";
import dotsVertical from "@icons/general/dots-vertical.svg?url";
import Button from "../UiComponents/Button/Button";
import CommentForm from "./CommentForm";
import editIcon from "@icons/general/edit-gray.svg?url";
import deleteIcon from "@icons/general/remove-gray.svg?url";
import axiosClient from "@/app/axiosClient";
import { useAlert } from "@/contexts/AlertContext";
import Modal from "../UiComponents/Modal";
import DeleteIcon from "/public/icons/general/delete-red.svg";
import CloseIcon from "/public/icons/general/x-close.svg";
import moment from "moment";

function Comment({
  comment,
  onSubmit,
  projectId,
  replyParentId,
  setReplyParentId,
  showButtons,
}: any) {
  const { user } = useContainer();
  const [showReplies, setShowReplies] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const { alert } = useAlert();

  const formatTimestamp = (timestamp: number) => {
    const timeZoneOffset = new Date().getTimezoneOffset();

    const postTime = moment(timestamp).utcOffset(timeZoneOffset * -1);
    const now = moment();

    const hoursDiff = now.diff(postTime, "hours");
    const daysDiff = now.diff(postTime, "days");

    if (hoursDiff < 24) {
      return `Today`;
    } else if (daysDiff < 3) {
      return `${daysDiff} ${daysDiff == 1 ? "day" : "days"} ago`;
    } else {
      return postTime.format("D MMMM, YYYY");
    }
  };

  const toggleMenu = () => {
    setShowMenu((showMenu) => !showMenu);
  };
  const handleReplyClick = (e: Event) => {
    if (replyParentId == comment.id) {
      setReplyParentId(null);
    } else {
      setReplyParentId(comment.id);
    }
  };
  const onEditSubmit = async (commentText: string) => {
    try {
      const response = await axiosClient.patch(
        `/comment/updateComment?commentId=${comment.id}`,
        {
          comments: commentText,
        }
      );
      if (response.status == 200) {
        alert("Comment successfully updated!", "success");
        onSubmit();
      }
    } catch (error) {
      console.log(error);
      alert("There was an error updating your comment.", "error");
    }

    setIsEditing(false);
  };

  const deleteComment = async () => {
    try {
      const response = await axiosClient.delete(
        `/comment/deleteComment?commentId=${deleteId}`
      );

      if (response.status == 200) {
        alert("Comment successfully deleted!", "success");
        onSubmit();
      }
    } catch (error) {
      console.log(error);
      alert("There was an error deleting your comment.", "error");
    }
  };
  const replyFormRef = useRef<any>();
  const replyButtonRef = useRef<any>();
  function handleClickOutside(event: Event) {
    if (
      replyFormRef.current &&
      !replyFormRef.current.contains(event.target) &&
      !replyButtonRef.current?.contains(event.target)
    ) {
      setReplyParentId(null);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [replyFormRef]);

  return (
    <>
      <Modal
        isOpen={isDeleteModalOpen}
        className="wallet-connect-modal !h-fit !w-[min(528px,90%)]"
      >
        <div className="flex-col gap-32">
          <div className="flex-space-between flex-center">
            <div className="icon-container">
              <DeleteIcon />
            </div>
          </div>
          <div>
            <div className="d-h3">Delete comment</div>
            <div className="mt-16 ">
              Are you sure you want to delete the comment?
            </div>
            <div className="flex gap-[8px]">
              <Button
                hierarchy="primary"
                size="lg"
                text="Delete comment"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  deleteComment();
                }}
                className=" text-lg   mt-32 p-12-26 w-100p "
                tooltipTitle="Delete comment"
                tooltipText=""
                dataTooltipId="delete comment"
              />
              <Button
                hierarchy="secondary"
                size="lg"
                text="Cancel"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                }}
                className="text-lg   mt-32 p-12-26 w-100p "
                tooltipTitle="Cancel"
                tooltipText=""
                dataTooltipId="Cancel"
              />
            </div>
          </div>
        </div>
      </Modal>
      {isEditing ? (
        <div>
          <CommentForm
            isEditing={isEditing}
            cancelEditing={() => setIsEditing(false)}
            initialComment={comment.comments}
            onSubmit={onEditSubmit}
            projectId={projectId}
            parentId={comment.id}
          />
          <div className="divider-grey !mt-4"></div>
        </div>
      ) : (
        <>
          {" "}
          {/* comment container */}
          <div className="flex flex-col gap-8">
            {/* comment details */}

            <div className="flex items-start gap-12  min-h-[40px] ">
              {/* profile picture */}
              <div className="item comment-profile-image flex-vertical-center bg-circle ">
                {comment?.imageUrl ? (
                  <div className="flex-item bg-circle no-shrink border-0 !bg-white !border-white">
                    <Image
                      src={comment.imageUrl}
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

              <div tabIndex={0} className="w-full">
                {/* top section  */}
                <div className="flex gap-8 items-center justify-between w-full">
                  <div className="flex gap-8 items-center">
                    <div className="text-sm text-primary-700 text-bold">
                      {comment.username}
                    </div>

                    <div className="text-sm bg-primary-400 rounded-full w-1 h-1"></div>
                    <div className="text-sm text-primary-400">
                      {formatTimestamp(comment.createdAt)}
                    </div>
                  </div>
                  {showButtons && user && comment.username == user.username && (
                    <div className="relative " tabIndex={0}>
                      <Image
                        src={dotsVertical}
                        width={16}
                        height={16}
                        alt="options"
                        className="!h-[16px] cursor-pointer"
                        onClick={toggleMenu}
                      />
                      <div
                        className={`${
                          showMenu ? "block" : "hidden"
                        } absolute top-8 right-0 w-[144px] border border-primary-100 rounded-[10px] bg-white shadow-lg`}
                      >
                        <div
                          className="px-4 py-[10px] flex gap-3 text-primary-600 cursor-pointer"
                          onClick={() => {
                            toggleMenu();
                            setIsEditing(true);
                          }}
                        >
                          <div className="">
                            <Image
                              src={editIcon}
                              width={18}
                              height={18}
                              alt="edit"
                            />
                          </div>
                          <div className="">Edit</div>
                        </div>

                        <div
                          className="px-4 py-[10px] flex gap-3 text-primary-600 cursor-pointer"
                          onClick={() => {
                            toggleMenu();
                            setDeleteId(comment.id);
                            setIsDeleteModalOpen(true);
                          }}
                        >
                          <div className="">
                            <Image
                              src={deleteIcon}
                              width={18}
                              height={18}
                              alt="delete"
                            />
                          </div>
                          <div className="">Remove</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {/* comment text */}
                <div className="text-md text-primary-700">
                  {comment.comments}
                </div>
              </div>
            </div>
            {/* comment actions  */}
            {showButtons && (
              <div className="pl-[40px] flex flex-col gap-8">
                {/* action icons */}
                <div>
                  <div className=" flex  items-center">
                    {/* <Button
                hierarchy="tertiaryGray"
                size="sm"
                text="1"
                icon="left"
                iconName="thumbs-up"
                className="w-[60px] rounded-[50px]"
              />

              <Button
                hierarchy="tertiaryGray"
                size="sm"
                text="1"
                icon="left"
                iconName="thumbs-down"
                className="w-[60px] rounded-[50px]"
              /> */}

                    <Button
                      id={`replyButton-${comment.id}`}
                      hierarchy="tertiaryGray"
                      size="sm"
                      text="Reply"
                      className="w-[60px] rounded-[50px]"
                      onClick={handleReplyClick}
                      disabled={!user}
                      data-tooltip-id="reply-button"
                      forwardRef={replyButtonRef}
                    />
                  </div>
                  {/* reply count button */}
                  {comment.commentReply.length ? (
                    <Button
                      hierarchy="tertiaryAccent"
                      size="sm"
                      text={
                        comment.commentReply.length == 1
                          ? "1 answer"
                          : `${comment.commentReply.length} answers`
                      }
                      className=" rounded-[50px]"
                      onClick={() =>
                        setShowReplies((showReplies) => !showReplies)
                      }
                    />
                  ) : (
                    ""
                  )}
                </div>

                {/* reply comment box */}
                {comment.id == replyParentId ? (
                  <div className="" ref={replyFormRef}>
                    <CommentForm
                      onSubmit={onSubmit}
                      projectId={projectId}
                      parentId={comment.id}
                      isReply={true}
                      hide={() => setReplyParentId(null)}
                    />
                    <div className="divider-grey !mt-2"></div>
                  </div>
                ) : (
                  ""
                )}
                {showReplies
                  ? comment.commentReply
                      .sort((c1: any, c2: any) => c2.createdAt - c1.createdAt)
                      .map((reply: any) => (
                        <Comment
                          key={reply.id}
                          setReplyParentId={setReplyParentId}
                          replyParentId={replyParentId}
                          comment={reply}
                          projectId={projectId}
                          onSubmit={onSubmit}
                        />
                      ))
                  : ""}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Comment;
