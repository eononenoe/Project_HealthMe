import React from "react";
//import "../../static/css/pages/Mypage_Inside_Edit.css";

export default function AddressEditModal() {
  return (
    <div className="modal">
      <div className="container">
        <h2>배송지 수정</h2>
        <div className="badge">기본 배송지</div>

        <form action="/shipping/update" method="post">
          <div className="input-group">
            <label htmlFor="address">주소</label>
            <input
              type="text"
              id="address"
              name="address"
              value="서울 서초구 강남대로 411"
              readOnly
            />
          </div>

          <div className="input-group">
            <label htmlFor="detail-address">상세주소 입력</label>
            <input
              type="text"
              id="detail-address"
              name="detailAddress"
              placeholder="상세주소 입력 (예: 2303호)"
            />
          </div>

          <div className="input-group">
            <label htmlFor="recipient">받으실 분</label>
            <input
              type="text"
              id="recipient"
              name="recipient"
              placeholder="받으시는 분"
              value="강강강"
              readOnly
            />
          </div>

          <div className="input-group">
            <label htmlFor="phone">휴대폰 번호</label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="휴대폰 번호"
              value="010-7842-4532"
              readOnly
            />
          </div>

          <div className="button-group">
            <button type="submit">저장</button>
          </div>
        </form>
      </div>
    </div>
  );
}
