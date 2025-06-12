import React, { useState, useEffect } from "react";
import "static/css/pages/approval.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function ApprovalPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const items = state?.items || [];

  // 배송지 상태
  const [isDefaultAddress, setIsDefaultAddress] = useState(true);
  const [recipient, setRecipient] = useState("");
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [phoneFirst, setPhoneFirst] = useState("010");
  const [phoneMiddle, setPhoneMiddle] = useState("");
  const [phoneLast, setPhoneLast] = useState("");

  // 사용자/등급·할인 계산
  const loginUser = JSON.parse(localStorage.getItem("loginUser"));
  const userGrade = loginUser?.grade || "새싹";

  const gradeDiscountRates = { 새싹: 0.03, 열정: 0.06, 우수: 0.09, 명예: 0.12 };
  const gradeDiscountRate = gradeDiscountRates[userGrade] || 0;

  const originalTotalPrice = items.reduce(
    (acc, i) => acc + (i.price || 0) * i.quantity,
    0
  );
  const saleTotalPrice = items.reduce(
    (acc, i) => acc + (i.salprice || 0) * i.quantity,
    0
  );

  const productDiscount = originalTotalPrice - saleTotalPrice;
  const totalGradeDiscount = Math.floor(saleTotalPrice * gradeDiscountRate);
  const totalAmount = saleTotalPrice - totalGradeDiscount;

  const totalOverallDiscount = productDiscount + totalGradeDiscount;
  const discountPercentage =
    originalTotalPrice > 0
      ? Math.floor((totalOverallDiscount / originalTotalPrice) * 100)
      : 0;

  // 기본 주소 불러오기
  useEffect(() => {
    const fetchDefaultAddress = async () => {
      if (!isDefaultAddress) return;
      try {
        const res = await axios.get("/approval/default-address", {
          withCredentials: true,
        });
        const data = res.data;
        setRecipient(data.recipient || "");
        setZip(data.zonecode || "");
        setAddress(data.address || "");
        setAddressDetail(data.addressDetail || "");
        if (data.tel) {
          const [first, middle, last] = data.tel.split("-");
          setPhoneFirst(first || "010");
          setPhoneMiddle(middle || "");
          setPhoneLast(last || "");
        }
      } catch (err) {
        console.error("기본 배송지 불러오기 실패:", err);
      }
    };
    fetchDefaultAddress();
  }, [isDefaultAddress, loginUser]);

  const clearAddressFields = () => {
    setZip("");
    setAddress("");
    setAddressDetail("");
    setPhoneFirst("010");
    setPhoneMiddle("");
    setPhoneLast("");
  };

  // 주문 처리
  const handleOrderSubmit = async () => {
    if (
      !recipient.trim() ||
      !zip.trim() ||
      !address.trim() ||
      !phoneMiddle.trim() ||
      !phoneLast.trim()
    ) {
      return alert("모든 필수 정보를 입력해 주세요.");
    }

    const combinedRecipientPhone = `${phoneFirst}-${phoneMiddle}-${phoneLast}`;

    const newAddress = {
      recipient,
      zip,
      address,
      addressDetail,
      recipientPhone: combinedRecipientPhone,
    };

    const orderData = {
      address: isDefaultAddress ? null : newAddress, // 기본 배송지 사용 시 null
      items: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        productName: item.productName,
        price: item.price,
        discountPrice: item.salprice,
        productImageUrl: item.imageUrl,
      })),
      totalPrice: totalAmount,
      paymentMethod: "card",
    };

    try {
      if (window.IMP) {
        const { IMP } = window;
        IMP.init("imp32678348");
        IMP.request_pay(
          {
            pg: "nice_v2",
            pay_method: "card",
            merchant_uid: `order_${Date.now()}`,
            name: items.map((i) => i.productName).join(", "),
            amount: orderData.totalPrice,
            buyer_name: orderData.address?.recipient || recipient,
            buyer_tel:
              orderData.address?.recipientPhone || combinedRecipientPhone,
            buyer_addr: orderData.address?.address || address,
            buyer_postcode: orderData.address?.zip || zip,
          },
          async (rsp) => {
            if (rsp.error_code) {
              alert(`결제 실패: ${rsp.error_msg || "알 수 없는 오류"}`);
            } else {
              if (!rsp.imp_uid) {
                alert("결제 처리 중 오류 발생 (imp_uid 누락)");
                return;
              }
              alert("결제가 완료되었습니다.");
              navigate("/complete");

              try {
                // 주소를 먼저 저장하지 않고, 여기서 바로 주문만 저장
                await axios.post("/healthme/purchase", {
                  ...orderData,
                  imp_uid: rsp.imp_uid,
                  merchant_uid: rsp.merchant_uid,
                });
              } catch (backendErr) {
                console.error("백엔드 주문 실패:", backendErr);
              }
            }
          }
        );
      }
    } catch (err) {
      console.error("주문 처리 오류:", err);
    }
  };

  return (
    <main className="approval-page-main">
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
            onClick={() => {
              setIsDefaultAddress(false);
              clearAddressFields();
            }}
          >
            직접 입력
          </button>
        </div>

        <div className="approval-main">
          {/* 받는 사람 */}
          <div className="approval-rec">
            <h4>받는사람 *</h4>
            <input
              className="approval-input"
              type="text"
              value={recipient}
              disabled={true}
              placeholder="받는 사람"
            />
          </div>

          {/* 주소 */}
          <div className="approval-address">
            <h4>주소 *</h4>
            <div className="approval-post-container">
              <input
                className="approval-input"
                type="text"
                placeholder="우편번호"
                value={zip}
                disabled={true}
                readOnly={isDefaultAddress}
                onChange={(e) => setZip(e.target.value)}
              />
              <button
                className="approval-post-input"
                disabled={isDefaultAddress}
                onClick={() =>
                  new window.daum.Postcode({
                    oncomplete: (data) => {
                      setZip(data.zonecode);
                      setAddress(data.roadAddress);
                    },
                  }).open()
                }
              >
                주소 검색
              </button>
            </div>
            <input
              className="approval-input"
              type="text"
              placeholder="주소"
              value={address}
              disabled={true}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              className="approval-input"
              type="text"
              placeholder="상세주소"
              value={addressDetail}
              disabled={isDefaultAddress}
              onChange={(e) => setAddressDetail(e.target.value)}
            />
          </div>

          {/* 휴대전화 */}
          <div className="approval-phone">
            <h4>휴대전화 *</h4>
            <div className="phone-tel-container">
              <select
                value={phoneFirst}
                className="approval-input-tel1"
                disabled={isDefaultAddress}
                onChange={(e) => setPhoneFirst(e.target.value)}
              >
                <option value="010">010</option>
                <option value="011">011</option>
              </select>
              <input
                className="approval-input"
                type="text"
                maxLength="4"
                value={phoneMiddle}
                disabled={isDefaultAddress}
                onChange={(e) => setPhoneMiddle(e.target.value)}
              />
              <input
                className="approval-input"
                type="text"
                maxLength="4"
                value={phoneLast}
                disabled={isDefaultAddress}
                onChange={(e) => setPhoneLast(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* 주문 상품 목록 */}
        <div className="approval-product-list">
          <h2>주문 상품</h2>
          {items.map((item, idx) => (
            <div className="approval-product-item" key={idx}>
              <img src={item.imageUrl} alt={item.productName} />
              <div className="approval-product-info">
                <div>{item.productName}</div>
                <div>{item.quantity}개</div>
                <div>정가: {(item.price || 0).toLocaleString()}원</div>
                <div>
                  할인가: {(item.price - item.salprice || 0).toLocaleString()}원
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
              <span>{originalTotalPrice.toLocaleString()} 원</span>
            </li>
            <li>
              <span>할인 금액</span>
              <span className="approval-gray">
                -{productDiscount.toLocaleString()} 원
              </span>
            </li>
            <li>
              <span>등급 할인</span>
              <span className="approval-gray">
                -{totalGradeDiscount.toLocaleString()} 원
              </span>
            </li>
            <li>
              <span>배송비</span>
              <span className="approval-gray">무료배송</span>
            </li>
            <li className="approval-total-price">
              <span>총 결제금액</span>
              <div className="approval-total-price-right">
                <span className="approval-total-price-red">
                  {discountPercentage}%
                </span>
                <span>{totalAmount.toLocaleString()}원</span>
              </div>
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
  );
}
