// import React from 'react'
//먼저 유저부분에다가 쪽지함 배열을 하나 만들기v
//보낼 때는 보내는 유저정보 내용v
//받을 곳은 보내는 이가 아닌 현재의 포스터를쓴 포스터 아이디 글쓴이의 유저 쪽지함으로v
//받으면 바로 추가 하기v
import { IoSend } from "react-icons/io5";
import { AiFillMessage } from "react-icons/ai";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { senderMessage } from "../../../store/thunkFunctions";
import "../section/DirectMessage.scss";
const DirectMessageForm = ({ post }) => {
  const [modal, setModal] = useState(false);
  const userData = useSelector((state) => state.user?.userData);
  const [messageValue, setMessageValue] = useState("");
  const dispatch = useDispatch();
  const message = () => {
    setModal(!modal);
  };

  console.log(post.title);
  const handleToMessage = async (event) => {
    event.preventDefault();

    // const body = {
    //   senderUser: userData,
    //   messageValue,
    //   receiverUser: post.writer._id,
    //   postId: post._id,
    // };

    dispatch(
      senderMessage({
        senderUser: userData,
        messageValue,
        receiverUser: post.writer._id,
        postId: post._id,
        postTitle: post.title,
      })
    );

    setMessageValue("");
  };
  const MessageChange = (event) => {
    const { value } = event.target;

    setMessageValue(value);
  };
  return (
    <div className="direct-section">
      <button onClick={message} className="modal-open-button">
        <AiFillMessage />
        個人メッセージを送る
      </button>
      {modal && (
        <form className="messageModal" onSubmit={handleToMessage}>
          <input
            name="messageContent"
            id="content"
            onChange={MessageChange}
            value={messageValue}
          />
          <button className="toMessage">
            <IoSend />
          </button>
        </form>
      )}
    </div>
  );
};
DirectMessageForm.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    writer: PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }),
    title: PropTypes.string.isRequired,
  }),
};
export default DirectMessageForm;
