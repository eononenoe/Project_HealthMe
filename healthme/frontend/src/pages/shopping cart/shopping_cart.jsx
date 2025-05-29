import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "static/css/pages/shopping-cart.css";

const CartItem = ({ imgSrc, alt, name, subPrice, price }) => {
  const [qty, setQty] = useState(4);
  const [checked, setChecked] = useState(false);

  const decreaseQty = () => {
    if (qty > 1) setQty(qty - 1);
  };

  const increaseQty = () => {
    setQty(qty + 1);
  };

  return (
    <div className="cart-item">
      <label className="custom-checkbox">
        <input
          type="checkbox"
          className="item-checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        <span className="checkmark material-symbols-outlined">check</span>
      </label>
      <img src={imgSrc} alt={alt} />
      <div className="item-info">
        <p className="name">{name}</p>
        <p className="sub">{subPrice}</p>
        <p className="price">{price}</p>
        <div className="quantity">
          <button className="qty-btn decrease" onClick={decreaseQty}>
            -
          </button>
          <span className="qty-number">{qty}</span>
          <button className="qty-btn increase" onClick={increaseQty}>
            +
          </button>
        </div>
      </div>
      <button className="delete">
        <span className="material-symbols-outlined">close</span>
      </button>
    </div>
  );
};

function ShoppingCart() {
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  const handlePaymentClick = () => {
    navigate("/approval");
  };

  return (
    <>
      <main>
        <div className="cart-container">
          <section className="cart-section">
            <h2>장바구니</h2>
            <div className="cart-all">
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  id="select-all"
                  checked={selectAll}
                  onChange={toggleSelectAll}
                />
                <span className="checkmark material-symbols-outlined">
                  check
                </span>
              </label>
              <span className="all-select">전체 선택</span>
              <span>
                <button className="choice-delete">선택 삭제</button>
              </span>
            </div>

            <CartItem
              imgSrc="https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/2806a17d-deba-4bc4-b6ec-d6dc0c96e575.jpg"
              alt="채소믹스"
              name="[YSB111] 유기농 채소믹스 600g (냉동)"
              subPrice="4,000원"
              price="6,490원"
            />
            <CartItem
              imgSrc="https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/4c36b050-06f9-4ce1-9597-27bf4c2563fb.jpg"
              alt="한우"
              name="[JJH365] 한돈 부위별 대용량 가성비 7종"
              subPrice="28,000원"
              price="38,990원"
            />

            <div className="npay-banner">
              <strong>네이버페이 결제 시</strong>
              <p>최대 7천원 혜택</p>
              <div className="npay-icon">N</div>
            </div>
          </section>

          <aside className="checkout-info">
            <div className="login-box">
              <span className="material-symbols-outlined">person</span>
              <p>
                로그인을 하시면 지금 보고있는 제품을
                <br />
                나중에도 확인하실 수 있습니다.
              </p>
              <button>로그인하기</button>
            </div>

            <div className="payment-summary">
              <h3>결제정보</h3>
              <p style={{ color: "black" }}>
                * 최종 할인혜택은 주문서에서 적용됩니다.
              </p>
              <p style={{ color: "red" }}>
                * 최종결제금액에 따라 증정품이 변경될 수 있습니다.
              </p>
              <ul>
                <li className="product-item-hline">
                  주문금액
                  <div className="product-item-gray">
                    <span>45,480원</span>
                  </div>
                </li>
                <li className="product-item-gray">
                  ┗ 제품할인 <span>0원</span>
                </li>
                <li className="product-item-uline">
                  배송비
                  <div className="product-item-gray">
                    <span>무료</span>
                  </div>
                </li>
              </ul>
              <strong>
                결제예정금액
                <div className="product-item-red">
                  <span>45,480원</span>
                </div>
              </strong>
            </div>

            <button className="shop-btn" onClick={handlePaymentClick}>
              결제 하기
            </button>
          </aside>
        </div>
      </main>
    </>
  );
}

export default ShoppingCart;
