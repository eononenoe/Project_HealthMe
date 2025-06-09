import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

// mypage css 공통 적용
import "static/css/common/common.css";
import "static/css/pages/Mypage.css";

export default function MypageLayout() {
  return (
    <>
      <div className="container">
        {/* 사이드바로 쓰는 컴포넌트 */}
        <Sidebar />

        {/* 오른쪽 메인 콘텐츠 */}
        <div className="main">
          <Outlet />
        </div>
      </div>
    </>
  );
}
