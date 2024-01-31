// import React from 'react'
import { useEffect, useState } from "react";
import "./Comment.scss";
import axiosInstance from "../../../utils/axios";

// import ReplayComment from "./ReplayComment";
import SingleComment from "./SingleComment";
import CommentForm from "./CommentForm";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Comment = () => {
  const { postId } = useParams();
  const userData = useSelector((state) => state.user?.userData);
  const [comments, setComments] = useState([]);
  // const openReplayComment = () => {
  //   setReplayCommentBtn(!replayCommentBtn);
  // };
  // const [replayCommentBtn, setReplayCommentBtn] = useState(false);

  useEffect(() => {
    const body = {
      writer: userData.id,
      postId: postId,
    };
    getComment(body);
  }, []);

  const getComment = async (params) => {
    try {
      const response = await axiosInstance.get("/comment/getComment", {
        params: params,
      });
      console.log("response", response);

      setComments(response.data.commentData);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section className="comment-section">
      <div className="comment-length"> コメント数 {comments.length}</div>

      <div>
        <SingleComment comments={comments} />
      </div>

      {/* <div>
        <button className="replayButton" onClick={openReplayComment}>
          답글달기
        </button>{" "}
      </div> */}
      {/* 답글부분 */}
      {/* {replayCommentBtn && (
        <ReplayComment postId={postId} userData={userData} />
      )} */}
      {/* 답글부분 */}
      <div>
        <CommentForm getComment={getComment} />
      </div>
    </section>
  );
};

export default Comment;
