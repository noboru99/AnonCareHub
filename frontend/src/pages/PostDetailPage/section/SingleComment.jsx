// import React from 'react'

// import { useState } from "react";
import PropTypes from "prop-types";
const SingleComment = ({ comments }) => {
  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    // 필요한 날짜 형식에 맞게 포맷팅
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date
      .getDate()
      .toString()
      .padStart(
        2,
        "0"
      )} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    return formattedDate;
  };
  return (
    <div>
      {comments.length ? (
        comments.map((comment) => (
          <div key={comment._id}>
            <div className="comment">
              <div className="comment-profile">
                <span>{comment.writer.name}</span>
                <span>{comment.writer.age}代</span>
                <span>{comment.writer.isMale ? "男" : "女"}</span>
              </div>
              <div className="comment-content">{comment.content}</div>
              <div className="comment-date">
                {formatCreatedAt(comment.createdAt)}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>コメントがありません</div>
      )}
    </div>
  );
};

SingleComment.propTypes = {
  comments: PropTypes.array.isRequired,
};
export default SingleComment;
