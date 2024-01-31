// import React from 'react'
import "./MainMonitorEmotion.scss";
const MainMonitorEmotion = () => {
  return (
    <section className="monitor-emotion-section">
      <div className="monitor-section"></div>
      <div className="Emotion-section">
        <div className="explore-relationship">
          1.多様なカテゴリの悩みを見て回る
        </div>
        <div className="emotion top">
          <div>😮‍💨 悩み相談</div>
          <div>💔 恋人関係</div>
          <div>💍 結婚生活</div>
        </div>
        <div className="emotion mid">
          <div>🏢 上司関係</div>
          <div>👭 友達相談</div>
          <div>👨‍👩‍👧‍👦 家族悩み</div>
          <div>🔥 バーンアウト</div>
        </div>
        <div className="emotion bottom">
          <div>🌧️ 憂鬱な気分</div>
          <div>甲乙関係</div>
          <div>人間関係悩み</div>
        </div>
        <div className="custom-text">
          <div className="custom-text-section">2.掲示文に共感/慰労を伝える</div>
          <div className="custom-text-emotion">👍🖐️🤬🥲</div>
        </div>
      </div>
    </section>
  );
};

export default MainMonitorEmotion;
