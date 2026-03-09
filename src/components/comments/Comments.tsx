import React, { useEffect, useState } from "react";

import ArrowDownIcon from "../../../public/icons/arrows/arrow-down.svg";
import ArrowUpIcon from "@icons/arrows/Icon-3.svg";
import arrowUpIcon from "@icons/arrows/Icon-3.svg?url";

import { useAlert } from "@/contexts/AlertContext";
import { useContainer } from "@/contexts/ContainerContext";

import axiosClient from "@/app/axiosClient";

import CommentForm from "./CommentForm";

import Comment from "./Comment";

function Comments({ projectId }: any) {
  const { alert } = useAlert();
  const { user } = useContainer();
  const [isCommentsExpanded, setIsCommentsExpanded] = useState(false);

  const [comments, setComments] = useState<any>();

  const [isLoading, setIsLoading] = useState(true);

  const [replyParentId, setReplyParentId] = useState(null);

  const fetchComments = async () => {
    try {
      const response = await axiosClient.get(
        `comment/getProjectComments?projectId=${projectId}`
      );
      if (response.status == 200) {
        setComments(response.data.filter((c: any) => !c.isDeleted));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);
  return (
    <div className="section-comment p-0">
      <div className="comment-title text-lg text-semiBold">
        <div className="flex">
          <div>Comments: {comments?.length || 0} </div>
          <div className="item flex-left comment-expand p-3">
            {isCommentsExpanded && (
              <ArrowUpIcon
                className="svg-icon-disabled cursor-pointer "
                onClick={() => setIsCommentsExpanded(false)}
              />
            )}
          </div>
        </div>
      </div>

      <div className="comment-list mt-17 max-h-[400px] ">
        {isCommentsExpanded && (
          <div data-tooltip-id="comment">
            {/* comment form */}
            <CommentForm onSubmit={fetchComments} projectId={projectId} />
          </div>
        )}

        <>
          {isCommentsExpanded && <div className="divider-grey !mt-4"></div>}
          {/* comments list */}
          <div className="max-h-[344px] overflow-y-auto flex flex-col gap-16 ">
            {comments
              ?.slice(0, isCommentsExpanded ? comments.length : 1)
              .map((comment: any) => (
                <div className="flex gap-16" key={comment.id}>
                  <div className="flex-grow grow-1">
                    <Comment
                      key={comment.id}
                      comment={comment}
                      setReplyParentId={setReplyParentId}
                      replyParentId={replyParentId}
                      projectId={projectId}
                      onSubmit={async () => {
                        await fetchComments();
                        setReplyParentId(null);
                      }}
                      showButtons={isCommentsExpanded}
                    />
                  </div>
                  {!isCommentsExpanded && (
                    <div className="pr-[12px]">
                      <ArrowDownIcon
                        className="svg-icon-disabled cursor-pointer "
                        onClick={() => setIsCommentsExpanded(true)}
                      />
                    </div>
                  )}
                </div>
              ))}
          </div>
        </>
      </div>
    </div>
  );
}

export default Comments;
