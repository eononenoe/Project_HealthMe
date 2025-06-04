import React, { useEffect } from "react";

export default function OrderHistoryPage() {
  // const
  // useEffect(
  //   getbuycart()

  // )
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

      <div className="order-list">
        {/* 주문 1 */}
        <div className="order-box">
          <div className="order-date">2025. 3. 10 주문</div>
          <div className="order-content">
            <div className="order-info">
              <div className="order-status">
                배송완료 · <span className="green">3/10(월)</span> 도착
              </div>
              <div className="product-title">
                <img
                  src="/img/carrot.jpg"
                  alt="상품 이미지"
                  className="product-img"
                />
                <div className="product-detail">
                  <p className="title">
                    코딩 테스트 합격자 되기: 자바 편, 골든래빗, 김희성
                  </p>
                  <p className="price">37,800원 · 1개</p>
                </div>
              </div>
            </div>
            <div className="order-buttons">
              <button className="btn-outline">교환, 반품 신청</button>
            </div>
          </div>
        </div>

        {/* 주문 2 */}
        <div className="order-box">
          <div className="order-date">2025. 2. 22 주문</div>
          <div className="order-content">
            <div className="order-info">
              <div className="order-status">
                배송완료 · <span className="green">2/22(토)</span> 도착
              </div>
              <div className="product-title">
                <img
                  src="/img/carrot.jpg"
                  alt="상품 이미지"
                  className="product-img"
                />
                <div className="product-detail">
                  <p className="title">
                    구스페리 에어팟 프로/프로2 실리콘 이어팁 4P, 화이트
                  </p>
                  <p className="price">4,799원 · 1개</p>
                </div>
              </div>
            </div>
            <div className="order-buttons">
              <button className="btn-outline">교환, 반품 신청</button>
            </div>
          </div>
        </div>

        {/* 주문 3 */}
        <div className="order-box">
          <div className="order-date">2025. 3. 10 주문</div>
          <div className="order-content">
            <div className="order-info">
              <div className="order-status">
                배송완료 · <span className="green">3/10(월)</span> 도착
              </div>
              <div className="product-title">
                <img
                  src="/img/당근.png"
                  alt="상품 이미지"
                  className="product-img"
                />
                <div className="product-detail">
                  <p className="title">자바 이것이 답이다: 강희성</p>
                  <p className="price">58,000원 · 1개</p>
                </div>
              </div>
            </div>
            <div className="order-buttons">
              <button className="btn-outline">교환, 반품 신청</button>
            </div>
          </div>
        </div>
      </div>

      {/* 모달 구조만 남겨둠 (동작 없음) */}
      <div id="deliveryModal" className="modal">
        <div className="modal-content">
          <h4>배송 상세정보</h4>

          {/* 상품 1 */}
          <div className="delivery-group">
            <div className="delivery-detail">
              <strong>상품명:</strong> 코딩 테스트 합격자 되기: 자바 편<br />
              <strong>배송사:</strong> CJ대한통운
              <br />
              <strong>운송장번호:</strong> 398123498134
              <br />
              <strong>배송 상태:</strong> 배송 완료
            </div>
            <ul className="delivery-status-list">
              <li>
                <strong>주문 접수:</strong> 2025-03-05 10:22
              </li>
              <li>
                <strong>상품 준비 중:</strong> 2025-03-06 14:10
              </li>
              <li>
                <strong>배송 중:</strong> 2025-03-08 09:33
              </li>
              <li>
                <strong>배송 완료:</strong> 2025-03-10 17:55
              </li>
            </ul>
          </div>

          {/* 상품 2 */}
          <div className="delivery-group">
            <div className="delivery-detail">
              <strong>상품명:</strong> 구스페리 에어팟 프로 이어팁 4P
              <br />
              <strong>배송사:</strong> 롯데택배
              <br />
              <strong>운송장번호:</strong> 987654321012
              <br />
              <strong>배송 상태:</strong> 배송 중
            </div>
            <ul className="delivery-status-list">
              <li>
                <strong>주문 접수:</strong> 2025-02-19 11:00
              </li>
              <li>
                <strong>상품 준비 중:</strong> 2025-02-20 15:20
              </li>
              <li>
                <strong>배송 중:</strong> 2025-02-21 09:00
              </li>
              <li>
                <strong>배송 완료:</strong> -
              </li>
            </ul>
          </div>

          {/* 상품 3 */}
          <div className="delivery-group">
            <div className="delivery-detail">
              <strong>상품명:</strong> 자바 이것이 답이다: 강희성
              <br />
              <strong>배송사:</strong> 롯데택배
              <br />
              <strong>운송장번호:</strong> 88162345128
              <br />
              <strong>배송 상태:</strong> 배송 중
            </div>
            <ul className="delivery-status-list">
              <li>
                <strong>주문 접수:</strong> 2025-02-18 04:00
              </li>
              <li>
                <strong>상품 준비 중:</strong> 2025-02-20 07:47
              </li>
              <li>
                <strong>배송 중:</strong> 2025-02-24 15:27
              </li>
              <li>
                <strong>배송 완료:</strong> -
              </li>
            </ul>
          </div>

          <button onClick={() => {}}>닫기</button>
        </div>
      </div>
    </>
  );
}
