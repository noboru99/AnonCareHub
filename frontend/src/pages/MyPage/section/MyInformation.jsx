// import React from 'rect'
//내 작품 마이페이지 디자인 끝내고 정보도 들고 오고
//쪽지는 열람 하는 방식으로 할까?
import { useSelector } from "react-redux";
import "./style/MyInformation.scss";
import { useState } from "react";
const MyInformation = () => {
  const userData = useSelector((state) => state.user?.userData);
  const messageBox = userData?.messageBox || [];
  const [openMessage, setOpenMessage] = useState(false);

  const handleOpenMessage = () => {
    setOpenMessage(!openMessage);
  };

  if (!userData) return null;
  return (
    <section className="my-information">
      <div className="information-section">
        <div className="information-email">{userData.email}</div>
        <div className="information-name">{userData.name}</div>
        <div className="information-age">{userData.age}</div>
        <div className="information-gender">
          {userData.isMale ? "男" : "女"}
        </div>
      </div>
      <div className="letter-box">
        <div className="message-text">messageBox</div>
        {messageBox ? (
          messageBox.map((item, index) => (
            <div
              className="letter-list"
              key={index}
              onClick={handleOpenMessage}
            >
              <div className="letter-sender">差出者: {item.sender.name}</div>
              <div className="letter-category">{item.postTitle}</div>
              <div>{new Date(item.date).toLocaleString()}</div>
              {openMessage && (
                <div className="message-modal-box">
                  <div className="letter-content">
                    内容: {item.messageContent}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>メッセージがありません</p>
        )}
      </div>
    </section>
  );
};

export default MyInformation;
