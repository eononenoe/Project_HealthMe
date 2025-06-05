import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "static/css/pages/shopping-cart.css";

function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();
  const totalPrice = cartItems
    .filter((item) => item.checked)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const userId = "testuser"; // 실제 로그인 사용자로 교체 필요

  const api = axios.create({
    // baseURL: "http://localhost:8080/api",
    withCredentials: true,
  });

  // 장바구니 불러오기
  const loadCart = async () => {
    try {
      const res = await api.get(`/cart/${userId}`); // ✅ 여기서 선언

      console.log("장바구니 응답:", res.data); // 여기부터는 정상 사용 가능

      const items = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.data)
        ? res.data.data
        : [];

      const withChecked = items.map((item) => ({ ...item, checked: false }));
      setCartItems(withChecked);
    } catch (error) {
      console.error("장바구니 불러오기 오류:", error);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleQuantityChange = async (id, qty) => {
    await api.put(`/cart/${id}/quantity`, null, {
      params: { quantity: qty },
    });
    loadCart();
  };

  const handleDelete = async (id) => {
    await api.delete(`/cart/${id}`);
    loadCart();
  };

  const toggleSelectAll = () => {
    const newValue = !selectAll;
    setCartItems((prev) =>
      prev.map((item) => ({ ...item, checked: newValue }))
    );
    setSelectAll(newValue);
  };

  const toggleItemChecked = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartItemId === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const deleteSelected = async () => {
    const selectedItems = cartItems.filter((item) => item.checked);
    for (const item of selectedItems) {
      await api.delete(`/cart/${item.cartItemId}`);
    }
    loadCart();
  };

  const handlePaymentClick = () => {
    const selectedItems = cartItems.filter((item) => item.checked);

    if (selectedItems.length === 0) {
      alert("결제할 상품을 선택해주세요.");
      return;
    }

    navigate("/approval", {
      state: {
        items: selectedItems,
        totalPrice: totalPrice,
      },
    });
  };

  return (
    <main>
      <div className="cart-cart-container">
        <section className="cart-cart-section">
          <h2>장바구니</h2>

          <div className="cart-cart-all">
            <label className="cart-custom-checkbox">
              <input
                type="checkbox"
                id="select-all"
                checked={selectAll}
                onChange={toggleSelectAll}
              />
              <span className="cart-checkmark material-symbols-outlined">
                check
              </span>
            </label>
            <span className="cart-all-select">전체 선택</span>
            <span>
              <button className="cart-choice-delete" onClick={deleteSelected}>
                선택 삭제
              </button>
            </span>
          </div>

          {cartItems.map((item) => (
            <div className="cart-cart-item" key={item.cartItemId}>
              <label className="cart-custom-checkbox">
                <input
                  type="checkbox"
                  className="cart-item-checkbox"
                  checked={item.checked}
                  onChange={() => toggleItemChecked(item.cartItemId)}
                />
                <span className="cart-checkmark material-symbols-outlined">
                  check
                </span>
              </label>
              <img
                src={`https://picsum.photos/100?random=${item.productId}`}
                alt="product"
              />
              <div className="cart-item-info">
                <p className="cart-name">상품 ID: {item.productId}</p>
                <p className="cart-sub">수량: {item.quantity}</p>
                <p className="cart-price">가격: -원</p>
                <div className="cart-quantity">
                  <button
                    className="cart-qty-btn cart-decrease"
                    onClick={() =>
                      handleQuantityChange(item.cartItemId, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="cart-qty-number">{item.quantity}</span>
                  <button
                    className="cart-qty-btn cart-increase"
                    onClick={() =>
                      handleQuantityChange(item.cartItemId, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="cart-delete"
                onClick={() => handleDelete(item.cartItemId)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          ))}

          <div className="cart-npay-banner">
            <strong>네이버페이 결제 시</strong>
            <p>최대 7천원 혜택</p>
            <div className="cart-npay-icon">N</div>
          </div>
        </section>

        <aside className="cart-checkout-info">
          <div className="cart-login-box">
            <span className="material-symbols-outlined">person</span>
            <p>
              로그인을 하시면 지금 보고있는 제품을
              <br />
              나중에도 확인하실 수 있습니다.
            </p>
            <button>
              <a href="/login">로그인하기</a>
            </button>
          </div>

          <div className="cart-payment-summary">
            <h3>결제정보</h3>
            <p style={{ color: "black" }}>
              * 최종 할인혜택은 주문서에서 적용됩니다.
            </p>
            <p style={{ color: "red" }}>
              * 최종결제금액에 따라 증정품이 변경될 수 있습니다.
            </p>
            <ul>
              <li className="cart-product-item-hline">
                주문금액
                <div className="cart-product-item-gray">
                  <span>-원</span>
                </div>
              </li>
              <li className="cart-product-item-gray">
                ┗ 제품할인 <span>0원</span>
              </li>
              <li className="cart-product-item-uline">
                배송비
                <div className="cart-product-item-gray">
                  <span>무료</span>
                </div>
              </li>
            </ul>
            <strong>
              결제예정금액
              <div className="cart-product-item-red">
                <span>-원</span>
              </div>
            </strong>
          </div>

          <button className="cart-shop-btn" onClick={handlePaymentClick}>
            결제 하기
          </button>
        </aside>
      </div>
    </main>
  );
}

export default ShoppingCart;
