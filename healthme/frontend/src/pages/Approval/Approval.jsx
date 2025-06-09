import React, { useState } from "react";
import "static/css/pages/approval.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ApprovalPage() {
  const navigate = useNavigate();

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
      discountPrice: 50,
    },
    {
      productName: "[JJH365] 한돈 부위별 대용량 가성비 7종",
      quantity: 3,
      price: 13000,
      discountPrice: 50, // 실제 UI에서는 38,990원 표시되는데 할인가는 12990원으로 임의 설정했습니다.
    },
  ];

  // 총 결제 금액 계산 (할인가 기준)
  const totalAmount = items.reduce(
    (acc, item) => acc + item.discountPrice * item.quantity,
    0
  );

  const handleOrderSubmit = async () => {
    // 입력값 검증
    if (!recipient.trim()) return alert("받는 사람 이름을 입력하세요.");
    if (!zipcode.trim() || !address.trim())
      return alert("우편번호와 주소를 입력하세요.");
    if (!phoneMiddle.trim() || !phoneLast.trim())
      return alert("전화번호를 모두 입력하세요.");
    if (!emailId.trim()) return alert("이메일 아이디를 입력하세요.");

    // 주문 데이터 구성
    const orderData = {
      address: isDefaultAddress
        ? null
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
      totalPrice: totalAmount, // 필드명 맞춤
    };

    // 결제 방식 안내
    if (
      paymentMethod === "card" ||
      paymentMethod === "kakaopay" ||
      paymentMethod === "naverpay"
    ) {
      requestPayment(orderData);
      return;
    }

    if (paymentMethod === "bank") {
      try {
        const response = await axios.post("/orders", orderData, {
          headers: { "Content-Type": "application/json" },
        });
        alert("무통장 입금 주문 완료");
        navigate("/complete");
      } catch (error) {
        console.error("주문 실패", error);
        alert("주문 중 오류가 발생했습니다.");
      }
    }
  };

  const requestPayment = (orderData) => {
    const IMP = window.IMP;
    IMP.init("imp70552258"); // 아임포트 가맹점 코드로 변경

    IMP.request_pay(
      {
        pg: "html5_inicis", // 테스트 환경에서 허용되는 유일한 PG사
        pay_method: "card",
        merchant_uid: `order_${new Date().getTime()}`,
        name: items.map((i) => i.productName).join(", "),
        amount: orderData.totalPrice,
        buyer_email: orderData.address?.email,
        buyer_name: orderData.address?.recipient,
        buyer_tel: orderData.address?.phone,
        buyer_addr: orderData.address?.address,
        buyer_postcode: orderData.address?.zipcode,
      },
      async function (rsp) {
        if (rsp.success) {
          try {
            await axios.post("/orders", {
              ...orderData,
              imp_uid: rsp.imp_uid,
              merchant_uid: rsp.merchant_uid,
            });
            alert("결제 및 주문 성공");
            navigate("/complete");
          } catch (error) {
            alert("결제는 성공했지만 주문 등록 실패");
            console.error(error);
          }
        } else {
          alert("결제 실패: " + rsp.error_msg);
        }
      }
    );
  };

  return (
    <>
      <div id="header"></div>
      <main className="approval-main">
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
                    if (isDefaultAddress) return;

                    new window.daum.Postcode({
                      oncomplete: function (data) {
                        setZipcode(data.zonecode); // 우편번호
                        setAddress(data.roadAddress); // 도로명 주소
                      },
                    }).open();
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

          <div className="approval-benefit-box">
            <div className="approval-benefit-title">적립 혜택</div>
            <div className="approval-benefit-row">
              <div className="approval-benefit-highlight">
                LV.4 브론즈 · 2% 적립
              </div>
              <div>270원</div>
            </div>
            <div className="approval-benefit-row">
              <div>구매 추가 적립</div>
              <div className="approval-benefit-sub">10원</div>
            </div>
            <div className="approval-benefit-row">
              <div>후기 적립금</div>
              <div className="approval-benefit-warning">최대 3,500원</div>
            </div>

            <div className="approval-benefit-divider"></div>

            <div className="approval-benefit-row">
              <div className="benefit-today-title">이번 주문으로 받을 혜택</div>
              <div className="benefit-today-amount">3,780원</div>
            </div>
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
