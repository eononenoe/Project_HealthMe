import React, { useState } from "react";
import "static/css/pages/approval.css"; // CSS 따로 관리

export default function ApprovalPage() {
  // 배송지 버튼 상태
  const [isDefaultAddress, setIsDefaultAddress] = useState(true);
  // 결제 수단 상태
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <>
      <div id="header"></div>
      <main>
        <section className="approval-left">
          <h2>배송지</h2>
          <div className="button-set">
            <button
              type="button"
              className={`left-button ${isDefaultAddress ? "active" : ""}`}
              onClick={() => setIsDefaultAddress(true)}
            >
              기본 배송지
            </button>
            <button
              type="button"
              className={`right-button ${!isDefaultAddress ? "active" : ""}`}
              onClick={() => setIsDefaultAddress(false)}
            >
              직접 입력
            </button>
          </div>
          <div className="approval-main">
            <div className="rec">
              <h4>받는사람 *</h4>
              <input className="approval-input" id="recipient" type="text" />
            </div>
            <div className="address">
              <h4>주소 *</h4>
              <div className="address-search-wrapper">
                <input
                  className="approval-input"
                  type="text"
                  placeholder="우편번호"
                  id="zipcode"
                  readOnly
                />
                <button type="button" id="find-address-btn">
                  주소 검색
                </button>
              </div>
              <div className="address-hold">
                <input
                  className="approval-input"
                  type="text"
                  placeholder="주소"
                  id="address"
                  readOnly
                />
              </div>
              <input
                className="approval-input"
                type="text"
                placeholder="상세주소"
                id="address-detail"
              />
            </div>
            <div className="phone">
              <h4>휴대전화 *</h4>
              <input className="approval-input" type="text" placeholder="010" />
              <div className="phone-slash">
                <span> - </span>
              </div>
              <input className="approval-input" type="text" />
              <div className="phone-slash">
                <span> - </span>
              </div>
              <input className="approval-input" type="text" />
            </div>
            <div className="email">
              <h4>이메일 *</h4>
              <input
                className="approval-input"
                type="text"
                id="email-id"
              />{" "}
              <span>@</span>
              <input className="approval-input" type="text" id="email-domain" />
            </div>
          </div>

          <div className="product-list">
            <div className="product-1">
              <h2>주문 상품</h2>
            </div>

            <div className="product-item">
              <img
                src="https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/2806a17d-deba-4bc4-b6ec-d6dc0c96e575.jpg"
                alt="채소믹스"
              />
              <div className="product-item-master">
                <div className="product-title">
                  [YSB111] 유기농 채소믹스 600g (냉동)
                </div>
                <div className="product-count">3개</div>
                <div className="product-sale">8,000원</div>
                <div className="product-price">6,490원</div>
              </div>
            </div>

            <div className="product-item">
              <img
                src="https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/4c36b050-06f9-4ce1-9597-27bf4c2563fb.jpg"
                alt="한우"
              />
              <div className="product-item-master">
                <div className="product-title">
                  [JJH365] 한돈 부위별 대용량 가성비 7종
                </div>
                <div className="product-count">3개</div>
                <div className="product-sale">13,000원</div>
                <div className="product-price">38,990원</div>
              </div>
            </div>
          </div>

          <div className="payment-box">
            <div className="payment-1">
              <h2>결제 수단</h2>
            </div>
            <div className="payment-options">
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                />
                카드결제
              </label>
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  checked={paymentMethod === "bank"}
                  onChange={() => setPaymentMethod("bank")}
                />
                무통장입금
              </label>
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="naverpay"
                  checked={paymentMethod === "naverpay"}
                  onChange={() => setPaymentMethod("naverpay")}
                />
                네이버페이
              </label>
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="kakaopay"
                  checked={paymentMethod === "kakaopay"}
                  onChange={() => setPaymentMethod("kakaopay")}
                />
                카카오페이
              </label>
            </div>
          </div>
        </section>

        <section className="approval-right">
          <div className="price-box">
            <ul>
              <li>
                <span>상품 금액</span>
                <span>45,480원</span>
              </li>
              <li>
                <span>할인 금액</span>
                <span className="gray">-8,390원</span>
              </li>
              <li>
                <span>적립금 사용</span>
                <span className="gray">-1,010원</span>
              </li>
              <li>
                <span>배송비</span>
                <span className="gray">무료배송</span>
              </li>
              <li className="total">
                <span>총 결제 금액</span>
                <span>36,080원</span>
              </li>
            </ul>
          </div>

          <div className="benefit-box">
            <p>
              <strong>
                <div className="benefit-1">
                  <span>적립 혜택</span>
                </div>
              </strong>
            </p>
            <div className="benefit-2">
              <p>LV.4 등급 - 2% 적립: 270원</p>
              <p>구매 추가 적립: 10원</p>
              <p>특가 적립: 최대 3,500원</p>
            </div>
            <hr />
            <p>
              <strong>
                이번 주문으로 받을 혜택:
                <span className="benefit-3">13,180원</span>
              </strong>
            </p>
          </div>

          <button className="purchase-btn">36,080원 결제하기</button>
        </section>
      </main>
      <div id="footer"></div>
    </>
  );
}
