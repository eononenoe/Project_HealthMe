import React from "react";
import { Link } from "react-router-dom";

export default function ServiceCenter() {
  return (
    <div className="sidebar">
      <h3>회원 정보</h3>
      <ul>
        <li>
          <Link to="/mypage/user_edit">회원 정보 수정</Link>
        </li>
      </ul>

      <h3>구매관리</h3>
      <ul>
        <li>
          <Link to="/mypage/address_edit">배송 주소 수정</Link>
        </li>
        <li>
          <Link to="/mypage/purchase_history">구매 내역</Link>
        </li>
      </ul>

      <h3>서비스</h3>
      <ul>
        <li>
          <Link to="/announce">고객센터</Link>
        </li>
        {/* <li>
          <Link to="/mypage/inquiry_history">상품문의</Link>
        </li> */}
      </ul>
    </div>
  );
}
