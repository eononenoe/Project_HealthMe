import React, { useEffect, useState } from "react";
import axios from "axios";

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [levelEmoji, setLevelEmoji] = useState(null);

  const loginUser = JSON.parse(localStorage.getItem("loginUser"));

  const calcLevel = (amount) => {
    if (amount >= 1_000_000) return "👑";
    if (amount >= 500_000) return "🏆";
    if (amount >= 100_000) return "🔥";
    return "🌱";
  };

  const fetchUserInfo = async () => {
    if (loginUser) {
      const res = await axios.get("/mypage/getuserinfo", {
        params: { id: loginUser.id },
        withCredentials: true,
      });
      const amount = res.data.totalPurchaseAmount ?? 0;
      setLevelEmoji(calcLevel(amount));
    }
  };

  const getbuy = async () => {
    try {
      const res = await axios.get("/mypage/getbuy", { withCredentials: true });
      setOrders(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("구매 내역 가져오기 실패", err);
    }
  };

  const generateTrackingNumber = () => {
    const randomNum = Math.floor(Math.random() * 1_000_000_000_0000);
    return String(randomNum).padStart(13, "0");
  };

  useEffect(() => {
    getbuy();
    fetchUserInfo();
  }, []);

  return (
    <>
      <div className="user-box">
        <div className="user-top">
          <div>
            {levelEmoji} {loginUser.username}
          </div>
          <form action="javascript:void(0)" method="post">
            {/* <button type="submit" className="logout-button">
              로그아웃
            </button> */}
          </form>
        </div>
        <div className="delivery-status-summary">
          📦 현재 배송 상태:{" "}
          <span className="badge">
            {orders.filter((i) => i.status === "배송완료").length} /{" "}
            {orders.length}건 배송 완료
          </span>
        </div>
        <div className="delivery-detail-button">
          <button onClick={() => setSelectedOrders(orders)}>
            배송 상세보기
          </button>
        </div>
      </div>

      <div className="order-list">
        {orders.map((order) => (
          <div className="order-box" key={order.orderId}>
            <div className="order-date">
              {order.orderDate?.slice(0, 10)} 주문
            </div>
            <div className="order-status">
              {order.status === "배송완료" ? "배송완료" : "배송중"} ·{" "}
              <span className="green">
                {new Date(order.orderDate).toLocaleDateString()}
              </span>{" "}
              도착
            </div>

            {order.items.map((item) => (
              <div className="product-title" key={item.productId}>
                <img
                  src={item.productImageurl ?? "사진 없음."}
                  alt="상품 이미지"
                  className="product-img"
                />
                <div className="product-detail">
                  <p className="title">{item.productName ?? "상품명 없음"}</p>
                  <p className="price">
                    {item.unitPrice}원 · {item.quantity}개
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

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
                      {item.productName ?? "상품명 없음"}
                    </li>
                    <li>
                      <strong>수량:</strong> {item.quantity}
                    </li>
                    <li>
                      <strong>단가:</strong> {item.unitPrice.toLocaleString()}원
                    </li>
                    <li>
                      <strong>합계:</strong> {item.itemTotal?.toLocaleString()}
                      원
                    </li>
                    <li>
                      <strong>배송사:</strong> CJ대한통운
                    </li>
                    <li>
                      <strong>운송장번호:</strong>{" "}
                      {item.trackingNumber ?? generateTrackingNumber()}
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
