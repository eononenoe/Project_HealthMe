import React from "react";
import { Link } from "react-router-dom";
import "static/css/pages/complete.css";

export default function Complete() {
  return (
    <div className="order-complete-container">
      <h1>주문이 완료되었습니다!</h1>
      <p>주문해 주셔서 감사합니다.</p>
      <p>주문 내역은 마이페이지에서 확인하실 수 있습니다.</p>
      <Link to="/" className="go-home-button">
        홈으로 가기
      </Link>
    </div>
  );
}
