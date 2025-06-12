import React, { useState, useEffect } from "react";
import "static/css/pages/approval.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function ApprovalPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const items = state?.items || [];

  const [isDefaultAddress, setIsDefaultAddress] = useState(true);
  const [recipient, setRecipient] = useState("");
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [phoneFirst, setPhoneFirst] = useState("010");
  const [phoneMiddle, setPhoneMiddle] = useState("");
  const [phoneLast, setPhoneLast] = useState("");

  // 로컬 스토리지에서 로그인한 사용자 정보 불러오기
  const loginUser = JSON.parse(localStorage.getItem("loginUser"));

  // 사용자 등급 추출 (grade가 없으면 기본값은 '새싹')
  const userGrade = loginUser?.grade || "새싹";

  // 등급별 할인율 정의
  const gradeDiscountRates = {
    새싹: 0.03, // 3%
    열정: 0.06, // 6%
    우수: 0.09, // 9%
    명예: 0.12, // 12%
  };

  // 현재 사용자의 등급에 해당하는 할인율 가져오기 (기본값은 0)
  const gradeDiscountRate = gradeDiscountRates[userGrade] || 0;

  // 정가 총합 계산: price * quantity
  const originalTotalPrice = items.reduce(
    (acc, i) => acc + (i.price || 0) * i.quantity,
    0
  );

  // 할인가 총합 계산: salprice * quantity
  const saleTotalPrice = items.reduce(
    (acc, i) => acc + (i.salprice || 0) * i.quantity,
    0
  );

  // 상품 자체 할인 금액 계산
  const productDiscount = originalTotalPrice - saleTotalPrice;

  // 등급 할인 금액 계산: saleTotalPrice * 할인율
  const totalGradeDiscount = Math.floor(saleTotalPrice * gradeDiscountRate);

  // 최종 결제 금액 계산: 할인가 총합 - 등급 할인
  const totalAmount = saleTotalPrice - totalGradeDiscount;

  // 총 할인 금액 (상품 자체 할인 + 등급 할인)
  const totalOverallDiscount = productDiscount + totalGradeDiscount;

  // 최종 할인율 계산 (원래 가격 대비 총 할인 금액)
  const discountPercentage =
    originalTotalPrice > 0
      ? Math.floor((totalOverallDiscount / originalTotalPrice) * 100)
      : 0;


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
      address: isDefaultAddress ? null : newAddress,
      items: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        productName: item.productName,
        price: item.price,
        discountPrice: item.salprice,
      })),
      totalPrice: totalAmount,
      paymentMethod: "card",
    };
    try {
      if (!isDefaultAddress) {
        await axios.post("/mypage/newAddr", newAddress, {
          headers: { "Content-Type": "application/json" },
        });
      }
      if (window.IMP) {
        const IMP = window.IMP;
        IMP.init("imp32678348");
        IMP.request_pay(
          {
            pg: "nice_v2",
            pay_method: "card",
            merchant_uid: `order_${new Date().getTime()}`,
            name: items.map((i) => i.productName).join(", "),
            amount: orderData.totalPrice,
            buyer_name: orderData.address?.recipient || recipient,
            buyer_tel:
              orderData.address?.recipientPhone || combinedRecipientPhone,
            buyer_addr: orderData.address?.address || address,
            buyer_postcode: orderData.address?.zip || zip,
          },
          async function (rsp) {
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
                await axios.post("/healthme/purchase", {
                  ...orderData,
                  imp_uid: rsp.imp_uid,
                  merchant_uid: rsp.merchant_uid,
                });
              } catch (error) {
                console.error("백엔드 주문 실패:", error);
              }
            }
          }
        );
      }
    } catch (error) {
      console.error("주문 처리 오류:", error);
    }
  };

  return (
    <main className="approval-page-main">
      <section className="approval-left">
        <h2>배송지</h2>
        <div className="approval-button-set">
          {/* 기본 배송지 선택 버튼 */}
          <button
            type="button"
            className={`approval-left-button ${isDefaultAddress ? "active" : ""
              }`}
            onClick={() => setIsDefaultAddress(true)}
          >
            기본 배송지
          </button>
          {/* 직접 입력 선택 버튼 */}
          <button
            type="button"
            className={`approval-right-button ${!isDefaultAddress ? "active" : ""
              }`}
            onClick={() => {
              setIsDefaultAddress(false);
              clearAddressFields(); // 직접 입력 선택 시 필드 초기화
            }}
          >
            직접 입력
          </button>
        </div>

        <div className="approval-main">
          <div className="approval-rec">
            <h4>받는사람 *</h4>
            <input
              className="approval-input"
              type="text"
              value={recipient}
              disabled={true} // 받는 사람은 현재 로그인한 사용자로 고정되거나 기본 배송지에서 가져오므로 수정 불가
              placeholder="받는 사람"
            />
          </div>

          <div className="approval-address">
            <h4>주소 *</h4>
            {/* 우편번호 입력 필드 */}
            <input
              className="approval-input"
              type="text"
              placeholder="우편번호"
              value={zip} // 'zipcode' 대신 'zip' 사용
              disabled={true} // 주소 검색을 통해서만 입력되므로 비활성화
              readOnly={isDefaultAddress} // 기본 배송지 선택 시 읽기 전용
              onChange={(e) => setZip(e.target.value)} // 'zipcode' 대신 'zip' 상태 업데이트
            />
            {/* 주소 검색 버튼 */}
            <button
              disabled={isDefaultAddress} // 기본 배송지 선택 시 비활성화
              onClick={() =>
                new window.daum.Postcode({
                  oncomplete: (data) => {
                    setZip(data.zonecode); // 'zipcode' 대신 'zip' 상태 업데이트
                    setAddress(data.roadAddress);
                  },
                }).open()
              }
            >
              주소 검색
            </button>
            {/* 주소 입력 필드 */}
            <input
              className="approval-input"
              type="text"
              placeholder="주소"
              value={address}
              disabled={true} // 주소 검색을 통해서만 입력되므로 비활성화
              onChange={(e) => setAddress(e.target.value)}
            />
            {/* 상세 주소 입력 필드 */}
            <input
              className="approval-input"
              type="text"
              placeholder="상세주소"
              value={addressDetail}
              disabled={isDefaultAddress} // 기본 배송지 선택 시 비활성화
              onChange={(e) => setAddressDetail(e.target.value)}
            />
          </div>

          <div className="approval-phone">
            <h4>휴대전화 *</h4>
            {/* 전화번호 앞자리 선택 */}
            <select
              value={phoneFirst}
              disabled={isDefaultAddress} // 기본 배송지 선택 시 비활성화
              onChange={(e) => setPhoneFirst(e.target.value)}
            >
              <option value="010">010</option>
              <option value="011">011</option>
            </select>
            {/* 전화번호 중간자리 입력 */}
            <input
              className="approval-input"
              type="text"
              maxLength="4"
              value={phoneMiddle}
              disabled={isDefaultAddress} // 기본 배송지 선택 시 비활성화
              onChange={(e) => setPhoneMiddle(e.target.value)}
            />
            {/* 전화번호 끝자리 입력 */}
            <input
              className="approval-input"
              type="text"
              maxLength="4"
              value={phoneLast}
              disabled={isDefaultAddress} // 기본 배송지 선택 시 비활성화
              onChange={(e) => setPhoneLast(e.target.value)}
            />
          </div>
        </div>

        {/* 주문 상품 목록 섹션 */}
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
              <span>
                등급 할인
              </span>
              <span className="approval-gray">
                -{totalGradeDiscount.toLocaleString()} 원
              </span>
            </li>
            <li>
              <span>배송비</span>
              <span className="approval-gray">
                무료배송
              </span>
            </li>
            <li className="approval-total-price">
              <span>총 결제금액</span>
              <div className="approval-total-price-right">
                <span className="approval-total-price-red">{discountPercentage}%</span>
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
