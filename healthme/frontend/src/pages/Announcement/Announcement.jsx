import React, { useEffect, useState } from "react";
import axios from "axios";
// AnnouncementPage.jsx

// ✨ 이렇게 고쳐야 CSS가 실제로 적용됨
import "static/css/common/common.css";
import "static/css/pages/Announcement.css";

// AnnouncementPage.jsx
export default function AnnouncementPage() {
  return (
    <div className="announce-wrap">
      {" "}
      {/* 기존 .container → .announce-wrap */}
      <h1>고객센터</h1>
      <div className="announce-nav">
        {" "}
        {/* nav 계열도 접두어 추가 */}
        <a href="#">
          <div className="nav_btn">전체</div>
        </a>
        <a href="#">
          <div className="nav_btn">공지사항</div>
        </a>
        <a href="#">
          <div className="nav_btn">자주하는 질문</div>
        </a>
        <a href="#">
          <div className="nav_btn">1:1 문의</div>
        </a>
      </div>
      <div className="announce-sum">총 10개</div>
      {[...Array(9)].map((_, i) => (
        <div className="announce-list" key={i}>
          <div className="num">1</div>
          <div className="title">
            <span className="event_mark">이벤트공지</span>
            <span className="winner_mark">당첨자발표</span>
            <a href="#">3월 이벤트 당첨자 발표</a>
          </div>
          <div className="date">25.04.21</div>
        </div>
      ))}
    </div>
  );
}
