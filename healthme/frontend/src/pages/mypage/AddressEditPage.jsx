import React, { useEffect, useState } from "react";
import AddressEditModal from "./AddressEditModal";
import NewAddress from "./NewAddress";
import axios from "axios";

export default function AddressEditPage() {
  const [open, setOpen] = useState(false);
  const [addrAdd, setAddrAdd] = useState(false);
  const [addr_userDB, setAddr_userDB] = useState([]);
  const [updateaddress, setUpdateaddress] = useState(null); // 수정페이지에 전달한 하나의 주소
  const [showDeliveryDetail, setShowDeliveryDetail] = useState(false); // 배송 상세보기 모달 상태
  const [deliveryOrders, setDeliveryOrders] = useState([]); // 배송상세보기 눌렀을때 데이터 남는 곳

  const loginUser = JSON.parse(localStorage.getItem("loginUser"));

  const handleUpdate = (e, addr) => {
    e.preventDefault();
    setUpdateaddress(addr);
    setOpen(true);
  };

  const getAddress = async () => {
    // 배송 주소 가져오는 api
    const addr_user = await axios.get(`/mypage/getaddrinfo`, {
      withCredentials: true,
    });
    console.log("Addr_user", addr_user);
    setAddr_userDB(addr_user.data);
  };

  const fetchDeliveryOrders = async () => {
    // 배송지 가져오는 api
    try {
      const res = await axios.get("/mypage/getbuy", {
        withCredentials: true,
      });
      console.log("addressdeliveryOrders : ", res);
      setDeliveryOrders(res.data);
    } catch (err) {
      console.error("배송 상세 내역 로딩 실패", err);
    }
  };

  const generateTrackingNumber = () => {
    // 운송장 번호 랜덤 생성
    const randomNum = Math.floor(Math.random() * 1_000_000_000_0000);
    return String(randomNum).padStart(13, "0");
  };

  useEffect(() => {
    fetchDeliveryOrders();
    getAddress();
  }, []);

  const addnewAddr = () => {
    setAddrAdd(true);
  };

  const deafult_address = addr_userDB.filter((addr) => addr._default);
  const add_addr = addr_userDB.filter((addr) => !addr._default);

  return (
    <>
      <div className="user-box">
        <div className="user-top">
          <div>🌱 강강강</div>
          <form action="javascript:void(0)" method="post">
            {/* <button type="submit" className="logout-button">
              로그아웃
            </button> */}
          </form>
        </div>
        <div className="delivery-status-summary">
          📦 현재 배송 상태:{" "}
          <span className="badge">
            {deliveryOrders.filter((i) => i.status === "배송완료").length} /{" "}
            {deliveryOrders.length}건 배송 완료
          </span>
        </div>
        <div className="delivery-detail-button">
          <button onClick={() => setShowDeliveryDetail(true)}>
            배송 상세보기
          </button>
        </div>
      </div>

      <div className="form-box">
        <div className="address-header">
          <h2>배송지 수정</h2>
          <div className="description">
            배송지에 따라 상품정보 및 배송유형이 달라질 수 있습니다.
          </div>
        </div>

        {deafult_address.length > 0 && (
          <div className="address-box">
            <div className="address-header">
              <span className="badge">기본배송지</span>
            </div>
            <div className="address-content">
              <div className="address-info">
                <div className="address-text">{deafult_address[0].address}</div>
                <div className="address-sub">
                  <span className="address-addressDetail">
                    {deafult_address[0].addressDetail}&nbsp;&nbsp;
                  </span>
                  <span className="address-username">
                    {deafult_address[0].recipient}
                  </span>
                </div>
              </div>
              <a
                onClick={(e) => handleUpdate(e, deafult_address[0])}
                className="address-adjustment"
              >
                수정
              </a>
            </div>
          </div>
        )}

        {add_addr.map((addr) => (
          <div className="address-box" key={addr.address_id}>
            <div className="address-header">
              <span className="badge">추가 배송지</span>
            </div>
            <div className="address-content">
              <div className="address-info">
                <div className="address-text">{addr.address}</div>
                <div className="address-sub">
                  <span className="address-addressDetail">
                    {addr.addressDetail}&nbsp;&nbsp;
                  </span>
                  <span className="address-username">{addr.recipient}</span>
                </div>
              </div>
              <a
                onClick={(e) => handleUpdate(e, addr)}
                className="address-adjustment"
              >
                수정
              </a>
            </div>
          </div>
        ))}

        <div className="new_Address_add">
          <button onClick={addnewAddr}>새 배송지 추가</button>
        </div>
      </div>

      {/* 배송지 수정 모달 */}
      <AddressEditModal
        open={open}
        onClose={() => setOpen(false)}
        updateaddress={updateaddress}
        getAddress={getAddress}
      />

      {/* 새 배송지 추가 모달 */}
      <NewAddress
        addrAdd={addrAdd}
        onClose={() => setAddrAdd(false)}
        updateaddress={updateaddress}
      />

      {/* 배송 상세 모달 */}
      {showDeliveryDetail && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h4>배송 상세정보</h4>

            {deliveryOrders.map((order, oidx) => (
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

            <button onClick={() => setShowDeliveryDetail(false)}>닫기</button>
            {/* deliveryOrders.length > 0 && () 이렇게 조건을 달았기 때문에 [] 빈 배열로 해야 length가 0이 되면서 닫긴다. */}
          </div>
        </div>
      )}
    </>
  );
}
