// import React from 'react'
import { IoSend } from "react-icons/io5";
import PropTypes from "prop-types";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axios";
const CommentForm = ({ getComment }) => {
  const { postId } = useParams();
  const userData = useSelector((state) => state.user?.userData);
  const [commentValue, setCommentValue] = useState("");
  const handleComment = (e) => {
    setCommentValue(e.currentTarget.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const body = {
      content: commentValue,
      writer: userData.id,
      postId: postId,
    };
    setCommentValue("");
    await axiosInstance.post("/comment/saveComment", body);
    getComment({ postId: body.postId }); // 정확한 구조로 수정
  };
  return (
    <div>
      <form className="comment-box" onSubmit={onSubmit}>
        <div className="comment-input">
          <input
            type="text"
            className="comment-input"
            placeholder="コメントを入力してください。"
            value={commentValue}
            onChange={handleComment}
          />
        </div>
        <div className="comment-button">
          <button className="comment-button">
            <IoSend />
          </button>
        </div>
      </form>
    </div>
  );
};
CommentForm.propTypes = {
  getComment: PropTypes.func.isRequired,
};
export default CommentForm;
