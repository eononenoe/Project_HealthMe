import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "static/css/pages/shopping-cart.css";
import { useCart } from "static/js/CartContext.js";

function ShoppingCart() {
  const [isGuest, setIsGuest] = useState(false);
  const { cartItems, setCartItems, loading, setLoading } = useCart();
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: "http://localhost:8090",
    withCredentials: true,
  });

  const totalPrice = cartItems
    .filter((item) => item.checked)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 장바구니 불러오기 (회원용)
  const loadCart = async () => {
    try {
      const res = await api.get("/cart");
      const items = Array.isArray(res.data) ? res.data : [];

      const enriched = await Promise.all(
        items.map(async (item) => {
          const { data } = await axios.get(
            `http://localhost:8090/healthme/products/details/${item.productId}`
          );
          return {
            ...item,
            name: data.name,
            price: data.price,
            salprice: data.salprice,
            imageUrl: data.image_url,
            amount: data.amount,
            quantity: item.quantity ?? 1,
          };
        })
      );

      setCartItems(enriched.map((item) => ({ ...item, checked: false })));
    } catch (error) {
      console.error("장바구니 불러오기 오류:", error);
    }
  };

  useEffect(() => {
    const initializeCart = async () => {
      setLoading(true);
      const loginUser = localStorage.getItem("loginUser");

      if (!loginUser) {
        setIsGuest(true);
        const guestId = localStorage.getItem("guestId");
        const guestCartKey = `guestCart_${guestId}`;
        const guestCart = JSON.parse(localStorage.getItem(guestCartKey) || "[]");
        await enrichCartItems(guestCart);
      } else {
        setIsGuest(false);
        localStorage.removeItem("guestId");
        Object.keys(localStorage)
          .filter((key) => key.startsWith("guestCart_"))
          .forEach((key) => localStorage.removeItem(key));

        await loadCart();
      }
      setLoading(false);
    };

    initializeCart();
  }, []);

  const enrichCartItems = async (items) => {
    const enriched = await Promise.all(
      items.map(async (item) => {
        try {
          const { data } = await axios.get(
            `http://localhost:8090/healthme/products/details/${item.productId}`
          );
          return {
            ...item,
            name: data.name,
            price: data.price,
            salprice: data.salprice,
            imageUrl: data.image_url,
            amount: data.amount,
            quantity: item.quantity ?? 1,
          };
        } catch (e) {
          console.warn("상품 정보 로딩 실패:", item.productId, e);
          return item;
        }
      })
    );

    setCartItems(enriched.map((item) => ({ ...item, checked: false })));
  };

  // 삭제 버튼 클릭
  const handleDelete = async (productId) => {
    if (!productId) return;

    const updated = cartItems.filter((item) => item.productId !== productId);
    setCartItems(updated);

    try {
      if (isGuest) {
        const guestId = localStorage.getItem("guestId");
        const guestCartKey = `guestCart_${guestId}`;
        localStorage.setItem(guestCartKey, JSON.stringify(updated));
      } else {
        await api.delete(`/healthme/cart/delete/${productId}`);
      }
    } catch (error) {
      console.error("삭제 실패:", error);
    }
  };

  const deleteSelected = async () => {
    const selectedItems = cartItems.filter((item) => item.checked);
    const updated = cartItems.filter((item) => !item.checked);
    setCartItems(updated);

    try {
      if (isGuest) {
        const guestId = localStorage.getItem("guestId");
        const guestCartKey = `guestCart_${guestId}`;
        localStorage.setItem(guestCartKey, JSON.stringify(updated));
      } else {
        for (const item of selectedItems) {
          await api.delete(`/healthme/cart/delete/${item.productId}`);
        }
      }
    } catch (error) {
      console.error("삭제 실패:", error);
    }
  };

  const handleQuantityChange = async (id, qty) => {
    const quantity = Math.max(1, qty);

    if (isGuest) {
      const guestId = localStorage.getItem("guestId");
      const guestCartKey = `guestCart_${guestId}`;

      const updated = cartItems.map((item) =>
        item.productId === id ? { ...item, quantity } : item
      );

      localStorage.setItem(guestCartKey, JSON.stringify(updated));
      setCartItems(updated);
    } else {
      await api.put(`/cart/item/${id}/quantity`, null, {
        params: { quantity },
      });
      loadCart();
    }
  };

  const toggleSelectAll = () => {
    const newValue = !selectAll;
    setCartItems((prev) => prev.map((item) => ({ ...item, checked: newValue })));
    setSelectAll(newValue);
  };

  const toggleItemChecked = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartItemId === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handlePaymentClick = () => {
    if (isGuest) {
      alert("로그인이 필요합니다. 먼저 로그인 또는 회원가입을 해주세요.");
      navigate("/login");
      return;
    }

    const selectedItems = cartItems.filter((item) => item.checked);
    if (selectedItems.length === 0) {
      alert("결제할 상품을 선택해주세요.");
      return;
    }

    const loginUser = JSON.parse(localStorage.getItem("loginUser"));

    navigate("/approval", {
      state: {
        items: selectedItems,
        totalPrice,
        userId: loginUser?.id,
      },
    });
  };

  return (
    <main className="shopping-main">
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
            <span className="cart-custom-checkbox-all ">전체 선택</span>
            <span>
              <button className="cart-choice-delete" onClick={deleteSelected}>
                선택 삭제
              </button>
            </span>
          </div>

          {cartItems.map((item, index) => (
            <div
              className="cart-cart-item"
              key={item.cartItemId || `guest-${item.productId}`||`fallback-${index}`}
            >
              <label className="cart-custom-checkbox">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => toggleItemChecked(item.cartItemId)}
                />
                <span className="cart-checkmark material-symbols-outlined">
                  check
                </span>
              </label>
              <img src={item.imageUrl} alt={item.name} />
              <div className="cart-item-info">
                <p className="cart-name">{item.name}</p>
                <p className="cart-price">{item.price?.toLocaleString()}원</p>
                <p className="cart-sub">{item.salprice?.toLocaleString()}원</p>
                <p className="cart-count">
                  남은 재고량:{" "}
                  {item.amount - item.quantity >= 0
                    ? item.amount - item.quantity
                    : 0}
                  개
                </p>
                <div className="cart-quantity">
                  <button
                    className="cart-qty-btn cart-decrease"
                    onClick={() =>
                      handleQuantityChange(
                        isGuest ? item.productId : item.cartItemId,
                        item.quantity - 1
                      )
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="cart-qty-number">{item.quantity}</span>
                  <button
                    className="cart-qty-btn cart-increase"
                    onClick={() => {
                      const maxQty = item.amount;
                      if (item.quantity >= maxQty) {
                        alert(`재고량 ${maxQty}개를 초과할 수 없습니다.`);
                        return;
                      }
                      handleQuantityChange(
                        isGuest ? item.productId : item.cartItemId,
                        item.quantity + 1
                      );
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                className="cart-delete"
                onClick={() => handleDelete(item.productId)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          ))}
          <div className="cart-npay-banner">
            <ul className="cart-npay-banner-one">
              <strong>네이버페이 결제 시</strong>
              <p>최대 7천원 혜택</p>
            </ul>
            <ul className="cart-npay-banner-two">
              <div className="cart-npay-icon">N</div>
              <span>pay</span>
            </ul>
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
                  <span>{totalPrice.toLocaleString()}원</span>
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
                <span>{totalPrice.toLocaleString()}원</span>
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
