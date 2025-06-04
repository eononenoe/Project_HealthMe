import React, { useEffect, useState } from "react";
import AddressEditModal from "./AddressEditModal";
import axios from "axios";
import NewAddress from "./NewAddress";

export default function AddressEditPage() {
  const [open, setOpen] = useState(false);
  const [addrAdd, setAddrAdd] = useState(false);
  const [addr_userDB, setAddr_userDB] = useState([]);

  const [updateaddress, setUpdateaddress] = useState(null); // 수정페이지에 전달한 하나의 주소

  // 배송지 수정
  const handleUpdate = (e, addr) => {
    e.preventDefault(); // a태그의 원래 속성을 막기 위해서
    setUpdateaddress(addr);
    setOpen(true);
  };

  const loginUser = JSON.parse(localStorage.getItem("loginUser"));

  // 최신 DB를 가져온다.
  const getAddress = async () => {
    // console.log("loginUser", loginUser);
    const addr_user = await axios.get(`/mypage/getaddrinfo`, {
      withCredentials: true,
    });
    console.log("Addr_user", addr_user);
    setAddr_userDB(addr_user.data);
  };
  useEffect(() => {
    getAddress();
  }, []);

  const addnewAddr = () => {
    setAddrAdd(true);
  };

  const deafult_address = addr_userDB.filter((addr) => addr._default); //기본배송지를 배열로 반환
  const add_addr = addr_userDB.filter((addr) => !addr._default); // 추가배송지를 배열롤 반환
  return (
    <>
      <div className="user-box">
        <div className="user-top">
          <div>🌱 강강강</div>
          <form action="javascript:void(0)" method="post">
            <button type="submit" className="logout-button">
              로그아웃
            </button>
          </form>
        </div>
        <div className="delivery-status-summary">
          📦 현재 배송 상태: <span className="badge">2 / 3건 배송 완료</span>
        </div>
        <div className="delivery-detail-button">
          <button onClick={() => {}}>배송 상세보기</button>
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
                    {deafult_address[0].addressDetail} &nbsp;&nbsp;
                  </span>

                  <span className="address-username">
                    {deafult_address[0].recipient}
                  </span>
                </div>
              </div>

              {/* 실제로는 Link or 버튼 + onClick(openWindow)로 처리 */}
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
          <div className="address-box">
            <div className="address-header">
              <span className="badge">추가 배송지</span>
            </div>

            <div className="address-content">
              <div className="address-info">
                <div className="address-text">{addr.address}</div>
                <div className="address-sub">
                  <span className="address-addressDetail">
                    {addr.addressDetail} &nbsp;&nbsp;
                  </span>

                  <span className="address-username">{addr.recipient}</span>
                </div>
              </div>

              {/* 실제로는 Link or 버튼 + onClick(openWindow)로 처리 */}
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

      {/* 수정 */}
      <AddressEditModal
        open={open}
        onClose={() => setOpen(false)}
        updateaddress={updateaddress}
        getAddress={getAddress}
      ></AddressEditModal>

      {/* 새 배송지 추가 */}
      <NewAddress
        addrAdd={addrAdd}
        onClose={() => setAddrAdd(false)}
        updateaddress={updateaddress}
      ></NewAddress>
    </>
  );
}
