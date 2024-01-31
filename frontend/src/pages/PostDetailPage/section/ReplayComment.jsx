// import React from 'react'

import { useState } from "react";

const ReplayComment = () => {
  const [replayCommentValue, setReplayCommentValue] = useState("");
  const onHandleReplayComment = (e) => {
    setReplayCommentValue(e.currentTarget.value);
  };

  const replayOnSubmit = (e) => {
    e.preventDefault();

    // const body = {
    //   content: replayCommentValue,
    //   writer: userData.id,
    //   postId: postId,
    //   // responseTo:
    // };
  };
  return (
    <div>
      <form className="comment-box" onSubmit={replayOnSubmit}>
        <div className="comment-input">
          <input
            type="text"
            className="comment-input"
            placeholder="대댓글을 입력해주세요"
            value={replayCommentValue}
            onChange={onHandleReplayComment}
          />
        </div>
        <div className="comment-button">
          <button className="comment-button">등록</button>
        </div>
      </form>
    </div>
  );
};

export default ReplayComment;
