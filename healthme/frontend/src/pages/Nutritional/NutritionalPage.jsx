// src/pages/CustomNutritional/CustomNutritionalPage.jsx
import React, { useEffect, useState } from 'react';
import 'static/css/pages/Nutritional.css';

/** 영양소 진행바에 쓸 더미 데이터 */
const NUTRIENTS = [
  { name: '탄수화물', value: 55, color: 'blue' },
  { name: '단백질', value: 52, color: 'yellow' },
  { name: '지방', value: 78, color: 'green' },
  { name: '비타민', value: 43, color: 'purple' },
  { name: '아이오딘', value: 90, color: 'red' },
  { name: '철분', value: 47, color: 'teal' },
];

/** 추천 재료(상품) 더미 데이터 - 실제로는 API나 JSON으로 대체 */
const PRODUCTS = Array.from({ length: 4 }).map((_, i) => ({
  id: i,
  name: '생고등어 100g × 4개',
  price: 6980,
  discount: 3,
  img: 'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/e9079270-38bb-4d73-ad3a-51c632ac9610.jpg',
  nutrients: [
    '아미노산 16,942mg',
    '아르기닌 1,014mg',
    '비타민 D 7.19mg',
    '칼슘 13.04mg',
  ],
}));

export default function CustomNutritionalPage() {
  /* -------------------------  장바구니 상태  ------------------------- */
  const [cart, setCart] = useState([]);
  const toggleAll = (checked) =>
    setCart((prev) => prev.map((it) => ({ ...it, selected: checked })));

  const toggleOne = (idx) =>
    setCart((prev) =>
      prev.map((it, i) =>
        i === idx ? { ...it, selected: !it.selected } : it,
      ),
    );

  const addToCart = (product) => {
    setCart((prev) => {
      const hit = prev.find((p) => p.id === product.id);
      return hit
        ? prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p,
        )
        : [...prev, { ...product, qty: 1, selected: true }];
    });
  };

  const qty = (idx, diff) =>
    setCart((prev) =>
      prev.map((it, i) =>
        i === idx ? { ...it, qty: Math.max(1, it.qty + diff) } : it,
      ),
    );

  const deleteSelected = () =>
    setCart((prev) => prev.filter((it) => !it.selected));

  /* -------------------------  진행바 위치  --------------------------- */
  useEffect(() => {
    document
      .querySelectorAll('.nutrition-indicator')
      .forEach((ind) => (ind.style.left = ind.dataset.percent + '%'));
  }, []);

  /* -------------------------  계산용 파생값  ------------------------- */
  const selected = cart.filter((c) => c.selected);
  const totalPrice = selected.reduce((sum, v) => sum + v.price * v.qty, 0);

  return (
    <div className="container">
      {/* -------------------  사이드바  ------------------- */}
      <aside className="nutritional-sidebar">
        <div className="nutritional-contents-main">
          {/* 영양소 카드 */}
          <h3 className="nutrition-section-title">영양소 정보</h3>
          <div className="nutrition-card-container">
            <div className="nutrition-left">
              {NUTRIENTS.map(({ name, value, color }) => (
                <div
                  key={name}
                  className="nutrition-card-bar"
                  data-name={name}
                  data-value={`${value}%`}
                >
                  <div className="nutrition-bar-label">{name}</div>
                  <div className="nutrition-bar-container">
                    <div className={`nutrition-bar-inner ${color}`}>
                      <div
                        className={`nutrition-indicator ${color}`}
                        data-percent={value}
                      ></div>
                    </div>
                  </div>
                  <div className="nutrition-card-bar-label">
                    <li>부족</li>
                    <li>과다</li>
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* 장바구니 */}
          <section className="cart-section">
            <span>장바구니</span>
            <hr />
            <div className="cart-header">
              <div className="cart-header-left">
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  checked={cart.length > 0 && selected.length === cart.length}
                  onChange={(e) => toggleAll(e.target.checked)}
                />
                <label>
                  전체선택 ({selected.length}/{cart.length})
                </label>
              </div>
              <button onClick={deleteSelected}>선택삭제</button>
            </div>
            <hr />

            <ul className="cart-items">
              {cart.map((item, idx) => (
                <li key={item.id}>
                  <div className="cart-line">
                    <input
                      type="checkbox"
                      className="custom-checkbox"
                      checked={item.selected}
                      onChange={() => toggleOne(idx)}
                    />
                    <div className="cart-desc">
                      <div className="name">{item.name}</div>
                      <div className="price">
                        {item.price.toLocaleString()}원
                      </div>
                      <div className="qty-box">
                        <button onClick={() => qty(idx, -1)}>-</button>
                        <span>{item.qty}</span>
                        <button onClick={() => qty(idx, +1)}>+</button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart-footer">
              총 합계: <span>{totalPrice.toLocaleString()}원</span>
            </div>
            <div className="cart-footer-button">
              <button onClick={() => alert('장바구니 이동')}>장바구니 담기</button>
            </div>
          </section>
        </div>
      </aside>

      {/* -------------------  메인 콘텐츠  ------------------- */}
      <main className='nutritional_main'>
        <h1 className="nutritional-title">추천 재료</h1>

        <div className="nutritional-banner">
          <img
            className="nutritional-banner-img"
            src={process.env.PUBLIC_URL + '/img/main/Banner1.jpg'}
            alt="배너"
          />
        </div>

        {/* 정렬 메뉴 (href→button으로 변경) */}
        <ul className="nutritional_low_content">
          {['추천순', '신상품순', '판매량순', '낮은 가격순', '높은 가격순'].map(
            (txt, i) => (
              <React.Fragment key={txt}>
                <li>
                  <button
                    type="button"
                    className="sort-btn"
                    onClick={() => alert(`${txt} 정렬`)}
                  >
                    {txt}
                  </button>
                </li>
                {i < 4 && <li>|</li>}
              </React.Fragment>
            ),
          )}
        </ul>

        {/* 상품 목록 */}
        <ul className="nutritional_content">
          {PRODUCTS.map((p) => (
            <li key={p.id} className="nutritional_item_store">
              <div className="nutritional_item_img">
                <img src={p.img} alt={p.name} />
              </div>

              <div className="nutritional_item_add" onClick={() => addToCart(p)}>
                <i className="fas fa-cart-shopping" /> 담기
              </div>

              <div className="nutritional_item_name">{p.name}</div>

              <div className="item_Nutritional_ingredients">
                <ul>
                  {p.nutrients.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </div>

              <div className="nutritional_item_price">
                <span className="nutritional_discount">{p.discount}%</span>
                <span className="nutritional_price">
                  {p.price.toLocaleString()}원~
                </span>
              </div>
              <div className="nutritional_item_review">
                <i className="far fa-comment-dots" /> 999+
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
