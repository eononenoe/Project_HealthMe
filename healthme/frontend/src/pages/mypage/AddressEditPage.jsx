import React, { useState } from "react";
import AddressEditModal from "./AddressEditModal";

export default function AddressEditPage() {
  const [open, setOpen] = useState(false);
  const handleUpdate = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <>
      <div className="user-box">
        <div className="user-top">
          <div>🌱 강강강</div>
          <form action="javascript:void(0)" method="post">
            <button type="submit" className="logout-button">
              로그아웃
            </button>
          </form>
        </div>
        <div className="delivery-status-summary">
          📦 현재 배송 상태: <span className="badge">2 / 3건 배송 완료</span>
        </div>
        <div className="delivery-detail-button">
          <button onClick={() => {}}>배송 상세보기</button>
        </div>
      </div>

      <div className="form-box">
        <div className="address-header">
          <h2>배송지 수정</h2>
          <div className="description">
            배송지에 따라 상품정보 및 배송유형이 달라질 수 있습니다.
          </div>
        </div>

        <div className="address-box">
          <div className="address-header">
            <span className="badge">기본배송지</span>
          </div>

          <div className="address-content">
            <div className="address-info">
              <div className="address-text">
                서울 서초구 강남대로 411 2301호
              </div>
              <div className="address-sub">강강강 010-7842-4532</div>
            </div>

            {/* 실제로는 Link or 버튼 + onClick(openWindow)로 처리 */}
            <a onClick={handleUpdate} className="address-adjustment">
              수정
            </a>
          </div>
        </div>

        <div className="new_Address_add">
          <button
            onClick={() => {
              window.open(
                "/pages/mypage/address_Add.html",
                "_blank",
                "width=530,height=600"
              );
            }}
          >
            새 배송지 추가
          </button>
        </div>
      </div>

      <AddressEditModal
        open={open}
        onClose={() => setOpen(false)}
      ></AddressEditModal>
    </>
  );
}
