import React, { useEffect, useState } from "react";
import axios from "axios";

/* ------------------------------------------------------------------
   1. 상수 & 헬퍼
   ------------------------------------------------------------------ */
const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:8090";

/** 상대경로 → 절대 URL, 없으면 플레이스홀더 */
const toImageSrc = (url) => {
  if (!url) return "/img/noimage.png";
  return url.startsWith("http") ? url : `${API_BASE}${url}`;
};

/** 금액 → 등급 이모지(숫자 구분자 대신 정수) */
const calcLevel = (amount) => {
  if (amount >= 1000000) return "👑";
  if (amount >= 500000) return "🏆";
  if (amount >= 100000) return "🔥";
  return "🌱";
};

/** 13자리 임시 운송장번호 */
const generateTrackingNumber = () =>
  String(Math.floor(Math.random() * 10000000000000)).padStart(13, "0");

export default function OrderHistoryPage() {
  /* ----------------------------------------------------------------
     2. 상태값
     ---------------------------------------------------------------- */
  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [levelEmoji, setLevelEmoji] = useState(null);

  /* 로컬 로그인 정보 */
  const loginUser = JSON.parse(localStorage.getItem("loginUser"));

  /* ----------------------------------------------------------------
     3. API 호출
     ---------------------------------------------------------------- */
  const fetchUserInfo = async () => {
    if (!loginUser) return;
    const res = await axios.get("/mypage/getuserinfo", {
      params: { id: loginUser.id },
      withCredentials: true,
    });
    const amount = res.data.totalPurchaseAmount || 0;
    setLevelEmoji(calcLevel(amount));
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get("/mypage/getbuy", { withCredentials: true });
      console.log("mypage/getbuy", res.data);
      setOrders(res.data);
    } catch (err) {
      console.error("구매 내역 가져오기 실패", err);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ----------------------------------------------------------------
     4. JSX
     ---------------------------------------------------------------- */
  return (
    <>
      {/* ------ 사용자 정보 ------ */}
      <div className="user-box">
        <div className="user-top">
          <div>
            {levelEmoji} {loginUser.username}
          </div>
        </div>

        <div className="delivery-status-summary">
          📦 현재 배송 상태:&nbsp;
          <span className="badge">
            {orders.filter((o) => o.status === "배송완료").length} /{" "}
            {orders.length}건 배송 완료
          </span>
        </div>

        <div className="delivery-detail-button">
          <button onClick={() => setSelectedOrders(orders)}>
            배송 상세보기
          </button>
        </div>
      </div>

      {/* ------ 주문 목록 ------ */}
      <div className="order-list">
        {orders.map((order) => (
          <div className="order-box" key={order.orderId}>
            <div className="order-date">
              {order.orderDate?.slice(0, 10)} 주문
            </div>
            <div className="order-status">
              {order.status === "배송완료" ? "배송완료" : "배송중"} ·&nbsp;
              <span className="green">
                {new Date(order.orderDate).toLocaleDateString()}
              </span>{" "}
              도착
            </div>

            {order.items.map((item) => (
              <div className="product-title" key={item.productId}>
                <img
                  src={toImageSrc(item.productImageUrl)}
                  alt={item.productName || "상품 이미지"}
                  className="product-img"
                />
                <div className="product-detail">
                  <p className="title">{item.productName || "상품명 없음"}</p>
                  <p className="price">
                    {(item.unitPrice || 0).toLocaleString()}원 · {item.quantity}
                    개
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* ------ 배송 상세 모달 ------ */}
      {selectedOrders.length > 0 && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h4>배송 상세정보</h4>

            {selectedOrders.map((order, oidx) => (
              <div
                className="delivery-group"
                key={oidx}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "15px",
                  marginBottom: "20px",
                  backgroundColor: "#fff",
                }}
              >
                <div className="delivery-detail">
                  <strong>주문일:</strong>{" "}
                  {new Date(order.orderDate).toLocaleDateString()}
                  <br />
                  <strong>배송 상태:</strong>{" "}
                  {order.status === "배송완료" ? "배송 완료" : "배송 중"}
                </div>

                {order.items.map((item, iidx) => (
                  <ul
                    className="delivery-status-list"
                    key={iidx}
                    style={{
                      marginBottom: "15px",
                      borderTop: "1px dashed #ccc",
                      paddingTop: "10px",
                    }}
                  >
                    <li>
                      <strong>상품명:</strong>{" "}
                      {item.productName || "상품명 없음"}
                    </li>
                    <li>
                      <strong>수량:</strong> {item.quantity}
                    </li>
                    <li>
                      <strong>단가:</strong>{" "}
                      {(item.unitPrice || 0).toLocaleString()}원
                    </li>
                    <li>
                      <strong>합계:</strong>{" "}
                      {(item.itemTotal || 0).toLocaleString()}원
                    </li>
                    <li>
                      <strong>배송사:</strong> CJ대한통운
                    </li>
                    <li>
                      <strong>운송장번호:</strong>{" "}
                      {item.trackingNumber || generateTrackingNumber()}
                    </li>
                    <li>
                      <strong>주문일시:</strong>{" "}
                      {new Date(order.orderDate).toLocaleString()}
                    </li>
                    <li>
                      <strong>배송 상태:</strong>{" "}
                      {order.status === "배송완료" ? "완료됨" : "배송 중..."}
                    </li>
                  </ul>
                ))}
              </div>
            ))}

            <button onClick={() => setSelectedOrders([])}>닫기</button>
          </div>
        </div>
      )}
    </>
  );
}
