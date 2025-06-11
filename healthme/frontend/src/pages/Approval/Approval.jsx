import React, { useState, useEffect } from "react";
import "static/css/pages/approval.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function ApprovalPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // URL state에서 주문 상품 목록을 가져옵니다.
  console.log("State : ", state);
  const items = state?.items || [];

  // 배송지 선택 (기본 배송지 vs 직접 입력) 상태
  const [isDefaultAddress, setIsDefaultAddress] = useState(true);

  // 배송지 정보 상태 변수
  const [recipient, setRecipient] = useState(""); // 받는 사람 이름
  const [zip, setZip] = useState(""); // 우편번호 (backend: zip)
  const [address, setAddress] = useState(""); // 도로명 주소
  const [addressDetail, setAddressDetail] = useState(""); // 상세 주소
  const [phoneFirst, setPhoneFirst] = useState("010"); // 전화번호 앞자리
  const [phoneMiddle, setPhoneMiddle] = useState(""); // 전화번호 중간자리
  const [phoneLast, setPhoneLast] = useState(""); // 전화번호 끝자리

  // 상품들의 총 결제 금액을 계산합니다.
  // const totalAmount = items.reduce(
  //   (acc, item) => acc + (item.salprice || 0) * item.quantity,
  //   0
  // );
  const totalAmount = 100;

  const loginUser = localStorage.getItem("loginUser"); // 로컬 스토리지에서 로그인 사용자 정보를 가져옵니다.

  // 기본 배송지 정보를 불러오는 useEffect 훅
  useEffect(() => {
    const fetchDefaultAddress = async () => {
      if (!isDefaultAddress) return; // '직접 입력'이 선택된 경우 기본 배송지를 불러오지 않습니다.

      try {
        // 백엔드에서 사용자 기본 배송지 정보를 요청합니다.
        const res = await axios.get("/approval/default-address", {
          withCredentials: true, // 쿠키 등의 인증 정보를 함께 전송합니다.
        });
        const data = res.data;
        console.log("기본 배송지 데이터:", res.data);

        // 불러온 기본 배송지 정보로 상태를 업데이트합니다.
        setRecipient(data.recipient || ""); // 받는 사람
        setZip(data.zonecode || ""); // 우편번호 (백엔드 `zonecode` -> 프론트엔드 `zip` 상태)
        setAddress(data.address || ""); // 주소
        setAddressDetail(data.addressDetail || ""); // 상세 주소

        // 전화번호를 분리하여 각 상태 변수에 저장합니다.
        if (data.tel) {
          // 백엔드 Address 엔티티의 tel 필드를 사용한다고 가정
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
  }, [isDefaultAddress, loginUser]); // isDefaultAddress 또는 loginUser 변경 시 실행됩니다.

  // '직접 입력' 선택 시 주소 필드를 초기화하는 함수
  const clearAddressFields = () => {
    setZip("");
    setAddress("");
    setAddressDetail("");
    setPhoneFirst("010");
    setPhoneMiddle("");
    setPhoneLast("");
  };

  // 주문하기 버튼 클릭 시 실행되는 함수
  const handleOrderSubmit = async () => {
    // 필수 필드 유효성 검사
    if (!recipient.trim()) return alert("받는 사람 이름을 입력하세요.");
    if (!zip.trim() || !address.trim())
      return alert("우편번호와 주소를 입력하세요.");
    if (!phoneMiddle.trim() || !phoneLast.trim())
      return alert("전화번호를 모두 입력하세요.");

    // 전화번호를 백엔드 DTO 형식에 맞게 조합합니다. (recipientPhone)
    const combinedRecipientPhone = `${phoneFirst}-${phoneMiddle}-${phoneLast}`;

    // 새 배송지 정보 객체를 생성합니다. (백엔드 AddressUpdate DTO에 맞춤)
    const newAddress = {
      recipient,
      zip, // 'zipcode' 대신 'zip' 사용
      address,
      addressDetail,
      recipientPhone: combinedRecipientPhone, // 'phone' 대신 'recipientPhone' 사용
    };

    // 백엔드로 보낼 주문 데이터 객체를 생성합니다.
    const orderData = {
      // isDefaultAddress가 true면 address를 null로 보내 기본 배송지 사용을 알립니다.
      // false면 newAddress 객체를 보내 새로운 주소를 사용함을 알립니다.
      address: isDefaultAddress ? null : newAddress,
      items: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        // 백엔드 DTO에 맞게 productName, price, discountPrice도 포함 (필요시)
        productName: item.productName,
        price: item.price,
        discountPrice: item.salprice,
      })),
      totalPrice: totalAmount,
      paymentMethod: "card",
    };

    try {
      // '직접 입력' 모드일 경우에만 새 배송지 정보를 서버에 저장합니다.
      // 백엔드 `ApprovalService`에서 `requestDto.getAddress()`가 null이 아니면 주소를 저장하므로,
      // `/mypage/newAddr` 호출은 필요 없을 수도 있습니다. (백엔드 로직에 따라 결정)
      // 현재 백엔드 ApprovalService는 requestDto.getAddress()가 null이 아니면 새 주소를 저장하므로,
      // 이 `/mypage/newAddr` 호출은 중복될 수 있습니다. 필요 없다면 이 부분을 제거하세요.
      if (!isDefaultAddress) {
        await axios.post("/mypage/newAddr", newAddress, {
          headers: { "Content-Type": "application/json" },
        });
      }

      // PortOne 결제 처리
      if (window.IMP) {
        const IMP = window.IMP;
        IMP.init("imp32678348"); // 아임포트 초기화 (가맹점 식별코드)

        // 결제 요청 파라미터를 설정합니다.
        IMP.request_pay(
          {
            pg: "nice_v2", // 결제 서비스 제공자 (PG사)
            pay_method: "card", // 결제 방식 (카드 결제)
            merchant_uid: `order_${new Date().getTime()}`, // 고유 주문 ID
            name: items.map((i) => i.productName).join(", "), // 주문 상품 이름
            amount: orderData.totalPrice, // 결제 금액
            buyer_name: orderData.address?.recipient || recipient, // 구매자 이름 (새 주소 또는 기본 주소에서 가져옴)
            buyer_tel:
              orderData.address?.recipientPhone || combinedRecipientPhone, // 구매자 전화번호 (새 주소 또는 기본 주소에서 가져옴)
            buyer_addr: orderData.address?.address || address, // 구매자 주소 (새 주소 또는 기본 주소에서 가져옴)
            buyer_postcode: orderData.address?.zip || zip, // 구매자 우편번호 (새 주소 또는 기본 주소에서 가져옴)
          },
          async function (rsp) {
            // 결제 콜백 함수
            console.log("rsp : ", rsp);
            // 결제 실패 시 (error_code가 존재하면 실패)
            if (rsp.error_code) {
              alert(
                `결제에 실패했습니다: ${rsp.error_msg || "알 수 없는 오류"}`
              );
            } else {
              // 결제 성공 시 (error_code가 없고 imp_uid가 존재하면 성공)
              if (!rsp.imp_uid) {
                // rsp.imp_uid가 존재하면 이 if문 실행 안된다.
                // 없으면 실행된다.
                alert(
                  "결제 처리 중 필수 정보(imp_uid)를 받지 못했습니다. 다시 시도해 주세요."
                );
                return;
              }

              alert("결제 및 주문이 성공적으로 완료되었습니다.");
              navigate("/complete"); // 즉시 주문 완료 페이지로 이동

              try {
                // 백엔드 `/healthme/purchase` 엔드포인트로 결제 및 주문 정보를 전송합니다.
                await axios.post("/healthme/purchase", {
                  ...orderData,
                  imp_uid: rsp.imp_uid,
                  merchant_uid: rsp.merchant_uid,
                });
              } catch (error) {
                // 백엔드 주문 등록 실패 시
                console.error("백엔드 주문 등록 실패:", error);
                let errorMessage = "주문 등록에 실패했습니다.";
                if (error.response && error.response.data) {
                  errorMessage = error.response.data;
                }
                alert(`결제는 성공했지만, ${errorMessage}`);
              }
            }
          }
        );
      } else {
        // IMP 객체가 로드되지 않았을 경우 (스크립트 로딩 실패 등)
        console.error("IMP 객체가 정의되지 않았습니다.");
        alert("결제 서비스 모듈이 로드되지 않아 결제를 진행할 수 없습니다.");
      }
    } catch (error) {
      // 주문 처리 중 예상치 못한 오류 발생 시
      console.error("주문 처리 중 오류 발생:", error);
      alert("주문 처리 중 오류가 발생했습니다. 다시 시도해 주세요.");
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
            className={`approval-left-button ${
              isDefaultAddress ? "active" : ""
            }`}
            onClick={() => setIsDefaultAddress(true)}
          >
            기본 배송지
          </button>
          {/* 직접 입력 선택 버튼 */}
          <button
            type="button"
            className={`approval-right-button ${
              !isDefaultAddress ? "active" : ""
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
                  할인가: {(item.discountPrice || 0).toLocaleString()}원
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 결제 정보 요약 섹션 */}
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
                      acc + ((i.price || 0) - (i.salprice || 0)) * i.quantity,
                    0
                  )
                  .toLocaleString()}{" "}
                원
              </span>
            </li>
            <li>
              <span>총 결제금액</span>
              <span>{totalAmount} 원</span>
            </li>
          </ul>
        </div>

        {/* 주문하기 버튼 */}
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
