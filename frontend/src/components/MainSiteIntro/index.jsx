// import React from 'react'
import "../../styles/MainSiteIntro.scss";
const MainSiteIntro = () => {
  return (
    <section className="intro-section">
      <div className="card-container">
        <h2>匿名で打ち明ける</h2>
        <p>
          誰にも言えなかった悩みを 傾聴して慰めてくれるリスナーに 安心して
          <br />
          トン！ 打ち明けましょう
        </p>
      </div>
      <div className="card-container">
        <h2>聞き手になって聞く</h2>
        <p>慰めと共感が必要な人に、友達もしくはメンターになってください</p>
      </div>
      <div className="card-container">
        <h2>コミュニケーション</h2>
        <p>似たような経験を持つ人々の話を見ながら共感しながら疎通しましょう</p>
      </div>
    </section>
  );
};

export default MainSiteIntro;
