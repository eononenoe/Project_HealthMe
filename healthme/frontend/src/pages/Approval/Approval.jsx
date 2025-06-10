import React, { useState, useEffect } from "react";
import "static/css/pages/approval.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function ApprovalPage() {
  const { state } = useLocation(); // 이전 페이지로부터 state를 가져옴
  const navigate = useNavigate();

  const items = state?.items || []; // 장바구니 상품들
  const [isDefaultAddress, setIsDefaultAddress] = useState(true); // 기본 주소 사용 여부
  const [recipient, setRecipient] = useState(""); // 받는 사람
  const [zipcode, setZipcode] = useState(""); // 우편번호
  const [address, setAddress] = useState(""); // 주소
  const [addressDetail, setAddressDetail] = useState(""); // 상세 주소
  const [phoneFirst, setPhoneFirst] = useState("010"); // 전화번호 앞자리
  const [phoneMiddle, setPhoneMiddle] = useState(""); // 전화번호 중간자리
  const [phoneLast, setPhoneLast] = useState(""); // 전화번호 끝자리
  const [emailId, setEmailId] = useState(""); // 이메일 ID
  const [emailDomain, setEmailDomain] = useState("naver.com"); // 이메일 도메인
  const [paymentMethod, setPaymentMethod] = useState("card"); // 결제 방식

  // 총 결제 금액 계산
  const totalAmount = items.reduce(
    (acc, item) => acc + (item.discountPrice || 0) * item.quantity,
    0
  );

  const loginUser = localStorage.getItem("loginUser");
  // 기본 배송지 불러오기
  useEffect(() => {
    if (isDefaultAddress) {
      if (loginUser) {
        const user = JSON.parse(loginUser); // localStorage에서 가져온 loginUser JSON 데이터
        setEmailId(user.userid); // 이메일 ID를 localStorage에서 가져온 값으로 설정
      }
      axios
        .get("/approval/default-address", {
          withCredentials: true,
        })
        .then((res) => {
          const data = res.data;
          console.log("기본 배송지 데이터 : ", data);
          setRecipient(data.recipient || "");
          setZipcode(data.zonecode || "");
          setAddress(data.address || "");
          setAddressDetail(data.addressDetail || "");

          if (data.tel) {
            const [first, middle, last] = data.tel.split("-");
            setPhoneFirst(first || "010");
            setPhoneMiddle(middle || "");
            setPhoneLast(last || "");
          }

          if (data.email) {
            const [id, domain] = data.email.split("@");
            setEmailId(id || "");
            setEmailDomain(domain || "naver.com");
          }
        })
        .catch((err) => {
          console.error("기본 배송지 불러오기 실패", err);
        });
    }
  }, [isDefaultAddress, loginUser]);

  // 주문 제출 처리
  const handleOrderSubmit = async () => {
    if (!recipient.trim()) return alert("받는 사람 이름을 입력하세요.");
    if (!zipcode.trim() || !address.trim())
      return alert("우편번호와 주소를 입력하세요.");
    if (!phoneMiddle.trim() || !phoneLast.trim())
      return alert("전화번호를 모두 입력하세요.");
    if (!emailId.trim()) return alert("이메일 아이디를 입력하세요.");

    const email = `${emailId.substring(0, 5)}@${emailDomain}`; // 이메일 주소 합치기

    const orderData = {
      address: isDefaultAddress
        ? null
        : {
            recipient,
            zipcode,
            address,
            addressDetail,
            phone: `${phoneFirst}-${phoneMiddle}-${phoneLast}`,
            email: email, // 합쳐진 이메일 사용
          },
      items: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      paymentMethod,
      totalPrice: totalAmount,
    };

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
        await axios.post("http://localhost:8090/healthme/purchase", orderData, {
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

  // 아임포트 결제 요청
  const requestPayment = (orderData) => {
    const IMP = window.IMP;
    IMP.init("imp70552258");

    IMP.request_pay(
      {
        pg: "html5_inicis",
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
            await axios.post("http://localhost:8090/healthme/purchase", {
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
            <input
              className="approval-input"
              type="text"
              placeholder="우편번호"
              value={zipcode}
              readOnly={isDefaultAddress}
              onChange={(e) => setZipcode(e.target.value)}
            />
            <button
              disabled={isDefaultAddress}
              onClick={() =>
                new window.daum.Postcode({
                  oncomplete: (data) => {
                    setZipcode(data.zonecode);
                    setAddress(data.roadAddress);
                  },
                }).open()
              }
            >
              주소 검색
            </button>
            <input
              className="approval-input"
              type="text"
              placeholder="주소"
              value={address}
              readOnly={isDefaultAddress}
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

          <div className="approval-phone">
            <h4>휴대전화 *</h4>
            <select
              value={phoneFirst}
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

          <div className="approval-email">
            <h4>이메일 *</h4>
            <input
              className="approval-input"
              type="text"
              value={emailId}
              disabled={isDefaultAddress}
              onChange={(e) => setEmailId(e.target.value)}
            />
            <span>@</span>
            <select
              value={emailDomain}
              disabled={isDefaultAddress}
              onChange={(e) => setEmailDomain(e.target.value)}
            >
              <option value="naver.com">naver.com</option>
              <option value="gmail.com">gmail.com</option>
              <option value="daum.net">daum.net</option>
            </select>
          </div>
        </div>

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
                  할인가: {(item.discountPrice || 0).toLocaleString()}원
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
                  .reduce((acc, i) => acc + (i.price || 0) * i.quantity, 0)
                  .toLocaleString()}{" "}
                원
              </span>
            </li>
            <li>
              <span>할인 금액</span>
              <span className="approval-gray">
                -{" "}
                {items
                  .reduce(
                    (acc, i) =>
                      acc +
                      ((i.price || 0) - (i.discountPrice || 0)) * i.quantity,
                    0
                  )
                  .toLocaleString()}{" "}
                원
              </span>
            </li>
            <li>
              <span>총 결제금액</span>
              <span>{totalAmount.toLocaleString()} 원</span>
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
