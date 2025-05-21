import React from "react";
import { useSearchParams } from "react-router-dom";
//import "../../static/css/pages/address_add_form.css";

export default function AddressAddForm() {
  const [searchParams] = useSearchParams();
  const roadAddress = searchParams.get("roadAddress") || "";

  return (
    <div className="container">
      <h2>새 배송지 입력</h2>
      <form action="/shipping/add" method="post">
        <div className="input-group">
          <label>도로명 주소</label>
          <input
            type="text"
            id="roadAddress"
            name="roadAddress"
            value={roadAddress}
            readOnly
          />
        </div>

        <div className="input-group">
          <label>상세 주소</label>
          <input
            type="text"
            name="detailAddress"
            placeholder="상세주소 입력 (예: 2303호)"
          />
        </div>

        <div className="input-group">
          <label>받으실 분</label>
          <input type="text" name="recipient" placeholder="받으시는 분 이름" />
        </div>

        <div className="input-group">
          <label>휴대폰 번호</label>
          <input type="text" name="phone" placeholder="휴대폰 번호" />
        </div>

        <div className="default-checkbox">
          <label htmlFor="defaultAddress">
            <input type="checkbox" name="defaultAddress" />
            기본 배송지로 저장
          </label>
        </div>

        <div className="button-group">
          <button type="submit">저장</button>
        </div>
      </form>
    </div>
  );
}
