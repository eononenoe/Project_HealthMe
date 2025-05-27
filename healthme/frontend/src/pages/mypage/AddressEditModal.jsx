import React from "react";

export default function AddressEditModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          ×
        </button>
        <h2>배송지 수정</h2>
        <div className="badge">기본 배송지</div>
        <form>
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
              value="010-7842-4532"
              readOnly
            />
          </div>

          <div className="button-group">
            <button type="submit" className="submit-btn">
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
