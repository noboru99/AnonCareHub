// import React from "react";
// 개인정보(쪽지함) 지가쓴글 북마크한글 채팅방
// 첫 왼쪽에는 이름 이메일 나이 성별 오른쪽에는 쪽지함
import "../../styles/MyPage.scss";
import { useEffect, useState } from "react";
import MyInformation from "./section/MyInformation";
import MyPostHistory from "./section/MyPostHistory";
import MyBookMark from "./section/MyBookMark";
import MyChat from "./section/MyChat";

import { ImProfile } from "react-icons/im";
import { FaHistory } from "react-icons/fa";
import { BsBookmarkStarFill } from "react-icons/bs";
import { RiChatSmile3Fill } from "react-icons/ri";
// import { useParams } from "react-router-dom";
// import axiosInstance from "../../utils/axios";
//쪽지함 유저정보에 쪽지함 데이터 넣어야함
const MyPage = () => {
  const [selectedValue, setSelectedValue] = useState("information");
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleButtonClick = (e) => {
    setSelectedValue(e);
  };

  useEffect(() => {
    switch (selectedValue) {
      case "information":
        return setSelectedComponent(<MyInformation className="emotion" />);
      case "postHistory":
        return setSelectedComponent(<MyPostHistory />);
      case "bookmarks":
        return setSelectedComponent(<MyBookMark />);
      case "chatRoom":
        return setSelectedComponent(<MyChat />);
    }
  }, [selectedValue]);

  // const { userId } = useParams();
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   async function fetchPost() {
  //     try {
  //       const response = await axiosInstance.get(`/users/${userId}`);
  //       setUser(response);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   fetchPost();
  // }, []);
  // if (!user) return null;
  return (
    <section className="MyPage">
      <div className="title">MyPage{}</div>
      <div className="nav-bar">
        <div>
          <span>
            <ImProfile />
          </span>
          <button onClick={() => handleButtonClick("information")}>
            個人情報
          </button>
        </div>
        <div>
          <span>
            <FaHistory />
          </span>
          <button onClick={() => handleButtonClick("postHistory")}>
            投稿履歴
          </button>
        </div>
        <div>
          <span>
            <BsBookmarkStarFill />
          </span>
          <button onClick={() => handleButtonClick("bookmarks")}>
            BookMark
          </button>
        </div>
        <div>
          <span>
            <RiChatSmile3Fill />
          </span>
          <button onClick={() => handleButtonClick("chatRoom")}>Chat</button>
        </div>
      </div>
      <div>{selectedComponent}</div>
    </section>
  );
};

export default MyPage;
