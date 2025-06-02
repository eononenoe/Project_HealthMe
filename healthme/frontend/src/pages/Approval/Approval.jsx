import React, { useState } from "react";
import "static/css/pages/approval.css";
import axios from "axios";

export default function ApprovalPage() {
  // 배송지 버튼 상태
  const [isDefaultAddress, setIsDefaultAddress] = useState(true);

  // 배송지 입력값 상태
  const [recipient, setRecipient] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [phoneFirst, setPhoneFirst] = useState("010");
  const [phoneMiddle, setPhoneMiddle] = useState("");
  const [phoneLast, setPhoneLast] = useState("");
  const [emailId, setEmailId] = useState("");
  const [emailDomain, setEmailDomain] = useState("naver.com");

  // 결제 수단 상태
  const [paymentMethod, setPaymentMethod] = useState("card");

  // 주문 상품 정보 (현재는 하드코딩, 나중에 props나 Context로 변경 가능)
  const items = [
    {
      productName: "[YSB111] 유기농 채소믹스 600g (냉동)",
      quantity: 3,
      price: 8000,
      discountPrice: 6490,
    },
    {
      productName: "[JJH365] 한돈 부위별 대용량 가성비 7종",
      quantity: 3,
      price: 13000,
      discountPrice: 12990, // 실제 UI에서는 38,990원 표시되는데 할인가는 12990원으로 임의 설정했습니다.
    },
  ];

  // 총 결제 금액 계산 (할인가 기준)
  const totalAmount = items.reduce(
    (acc, item) => acc + item.discountPrice * item.quantity,
    0
  );

  const handleOrderSubmit = async () => {
    // 입력값 검증 (필수 입력값 간단히 체크)
    if (!recipient.trim()) return alert("받는 사람 이름을 입력하세요.");
    if (!zipcode.trim() || !address.trim())
      return alert("우편번호와 주소를 입력하세요.");
    if (!phoneMiddle.trim() || !phoneLast.trim())
      return alert("전화번호를 모두 입력하세요.");
    if (!emailId.trim()) return alert("이메일 아이디를 입력하세요.");

    // 주문 데이터 객체 생성
    const orderData = {
      delivery: isDefaultAddress
        ? "기본 배송지"
        : {
            recipient,
            zipcode,
            address,
            addressDetail,
            phone: `${phoneFirst}-${phoneMiddle}-${phoneLast}`,
            email: `${emailId}@${emailDomain}`,
          },
      items,
      paymentMethod,
      totalAmount,
    };

    try {
      const response = await axios.post("/api/orders", orderData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("주문 성공: " + response.data);
    } catch (error) {
      console.error("주문 실패", error);
      alert("주문 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <div id="header"></div>
      <main>
        <section className="approval-left">
          <h2>배송지</h2>
          <div className="approval-button-set">
            <button
              type="button"
              className={`approval-left-button ${
                isDefaultAddress ? "active" : ""
              }`}
              onClick={() => setIsDefaultAddress(true)}
            >
              기본 배송지
            </button>
            <button
              type="button"
              className={`approval-right-button ${
                !isDefaultAddress ? "active" : ""
              }`}
              onClick={() => setIsDefaultAddress(false)}
            >
              직접 입력
            </button>
          </div>

          <div className="approval-main">
            <div className="approval-rec">
              <h4>받는사람 *</h4>
              <input
                className="approval-input"
                id="recipient"
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                disabled={isDefaultAddress}
                placeholder={
                  isDefaultAddress ? "기본 배송지 사용 시 입력 불가" : ""
                }
              />
            </div>

            <div className="approval-address">
              <h4>주소 *</h4>
              <div className="approval-address-search-wrapper">
                <input
                  className="approval-input"
                  type="text"
                  placeholder="우편번호"
                  id="zipcode"
                  value={zipcode}
                  readOnly={isDefaultAddress}
                  onChange={(e) => setZipcode(e.target.value)}
                />
                <button
                  type="button"
                  id="find-address-btn"
                  disabled={isDefaultAddress}
                  onClick={() => {
                    // 예: 주소 검색 API 연결 가능
                    alert("주소 검색 기능은 구현 필요");
                  }}
                >
                  주소 검색
                </button>
              </div>
              <div className="approval-address-hold">
                <input
                  className="approval-input"
                  type="text"
                  placeholder="주소"
                  id="address"
                  value={address}
                  readOnly={isDefaultAddress}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <input
                className="approval-input"
                type="text"
                placeholder="상세주소"
                id="address-detail"
                value={addressDetail}
                disabled={isDefaultAddress}
                onChange={(e) => setAddressDetail(e.target.value)}
              />
            </div>

            <div className="approval-phone">
              <h4>휴대전화 *</h4>
              <select
                className="approval-phone-first"
                value={phoneFirst}
                disabled={isDefaultAddress}
                onChange={(e) => setPhoneFirst(e.target.value)}
              >
                <option value="010">010</option>
                <option value="011">011</option>
              </select>
              <div className="approval-phone-slash">
                <span> - </span>
              </div>
              <input
                className="approval-input"
                type="text"
                maxLength="4"
                pattern="[0-9]*"
                value={phoneMiddle}
                disabled={isDefaultAddress}
                onChange={(e) => setPhoneMiddle(e.target.value)}
              />
              <div className="approval-phone-slash">
                <span> - </span>
              </div>
              <input
                className="approval-input"
                type="text"
                maxLength="4"
                pattern="[0-9]*"
                value={phoneLast}
                disabled={isDefaultAddress}
                onChange={(e) => setPhoneLast(e.target.value)}
              />
            </div>

            <div className="approval-email">
              <h4>이메일 *</h4>
              <input
                className="approval-input"
                type="text"
                id="email-id"
                value={emailId}
                disabled={isDefaultAddress}
                onChange={(e) => setEmailId(e.target.value)}
              />{" "}
              <span>@</span>
              <select
                className="approval-select"
                value={emailDomain}
                disabled={isDefaultAddress}
                onChange={(e) => setEmailDomain(e.target.value)}
              >
                <option value="naver.com">naver.com</option>
                <option value="nate.com">nate.com</option>
                <option value="daum.net">daum.net</option>
              </select>
            </div>
          </div>

          <div className="approval-product-list">
            <div className="approval-product-1">
              <h2>주문 상품</h2>
            </div>

            {items.map((item, idx) => (
              <div className="approval-product-item" key={idx}>
                <img
                  src={
                    idx === 0
                      ? "https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/2806a17d-deba-4bc4-b6ec-d6dc0c96e575.jpg"
                      : "https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/4c36b050-06f9-4ce1-9597-27bf4c2563fb.jpg"
                  }
                  alt={item.productName}
                />
                <div className="approval-product-item-master">
                  <div className="approval-product-title">
                    {item.productName}
                  </div>
                  <div className="approval-product-count">
                    {item.quantity}개
                  </div>
                  <div className="approval-product-sale">
                    {item.price.toLocaleString()}원
                  </div>
                  <div className="approval-product-price">
                    {item.discountPrice.toLocaleString()}원
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="approval-payment-box">
            <div className="approval-payment-1">
              <h2>결제 수단</h2>
            </div>
            <div className="approval-payment-options">
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
          <div className="approval-price-box">
            <ul>
              <li>
                <span>상품 금액</span>
                <span>
                  {items
                    .reduce((acc, i) => acc + i.price * i.quantity, 0)
                    .toLocaleString()}
                  원
                </span>
              </li>
              <li>
                <span>할인 금액</span>
                <span className="approval-gray">
                  -
                  {items
                    .reduce(
                      (acc, i) =>
                        acc + (i.price - i.discountPrice) * i.quantity,
                      0
                    )
                    .toLocaleString()}
                  원
                </span>
              </li>
              <li>
                <span>적립금 사용</span>
                <span className="approval-gray">-1,010원</span>
              </li>
              <li>
                <span>배송비</span>
                <span>무료</span>
              </li>
              <li className="approval-price-total">
                <span>총 결제금액</span>
                <span>{totalAmount.toLocaleString()}원</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            className="approval-button"
            onClick={handleOrderSubmit}
          >
            주문하기
          </button>
        </section>
      </main>
    </>
  );
}
