import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'static/css/pages/Nutritional.css';

export default function CustomNutritionalPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [expandedItems, setExpandedItems] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log("토큰 확인:", token);
    axios
      .get("http://localhost:8090/healthme/products/details", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("원본 응답 데이터:", res.data);

        if (!Array.isArray(res.data)) {
          console.error("응답 형식 오류: 배열이 아님");
          return;
        }

        const mappedProducts = res.data.map((item) => {
          const nutrientsRaw = [
            formatNutrient('단백질', item.protein),
            formatNutrient('철분', item.iron),
            formatNutrient('칼슘', item.calcium),
            formatNutrient('비타민D', item.vitamin_d),
            formatNutrient('식이섬유', item.dietary_fiber),
            formatNutrient('마그네슘', item.magnesium),
            formatNutrient('칼륨', item.potassium),
            formatNutrient('비오틴', item.biotin),
            formatNutrient('아연', item.zinc),
            formatNutrient('아르기닌', item.arginine),
          ].filter(Boolean);

          const left = nutrientsRaw.slice(0, 5);
          const right = nutrientsRaw.slice(5, 10);

          return {
            id: item.productId,
            name: item.name,
            price: item.salprice,
            originalPrice: item.price,
            discount: Math.round((1 - item.salprice / item.price) * 100),
            img: item.imageUrl,
            nutrientsLeft: left,
            nutrientsRight: right,
            sales_count: item.sales_count
          };
        });

        setProducts(mappedProducts);
      })
      .catch((error) => {
        console.error("API 요청 실패:", error);
      });
  }, []);

  const formatNutrient = (label, value) => {
    if (!value) return null;

    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) return `${label} ${value}`;

    if (value.toLowerCase().includes('mg') && numericValue >= 1000) {
      return `${label} ${(numericValue / 1000).toFixed(1)}g`;
    }

    return `${label} ${value}`;
  };
  const sortProducts = (order) => {
    let sorted = [];

    if (order === 'asc' || order === 'desc') {
      sorted = [...products].sort((a, b) => {
        const priceA = a.price ?? a.originalPrice;
        const priceB = b.price ?? b.originalPrice;
        return order === 'asc' ? priceA - priceB : priceB - priceA;
      });
    } else if (order === 'sales') {
      sorted = [...products].sort((a, b) => {
        return (b.sales_count || 0) - (a.sales_count || 0); // 내림차순
      });
    }

    setProducts(sorted);
  };

  const toggleExpand = (productId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      return existing
        ? prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        )
        : [...prev, { ...product, qty: 1, selected: true }];
    });
  };

  const toggleAll = (checked) =>
    setCart((prev) => prev.map((it) => ({ ...it, selected: checked })));

  const toggleOne = (idx) =>
    setCart((prev) =>
      prev.map((it, i) => (i === idx ? { ...it, selected: !it.selected } : it))
    );

  const qty = (idx, diff) =>
    setCart((prev) =>
      prev.map((it, i) =>
        i === idx ? { ...it, qty: Math.max(1, it.qty + diff) } : it
      )
    );

  const deleteSelected = () =>
    setCart((prev) => prev.filter((it) => !it.selected));

  const selected = cart.filter((c) => c.selected);
  const totalPrice = selected.reduce((sum, v) => sum + v.price * v.qty, 0);

  useEffect(() => {
    document
      .querySelectorAll('.nutrition-indicator')
      .forEach((ind) => (ind.style.left = ind.dataset.percent + '%'));
  }, []);

  const NUTRIENTS = [
    { name: '탄수화물', value: 55, color: 'blue' },
    { name: '단백질', value: 52, color: 'yellow' },
    { name: '지방', value: 78, color: 'green' },
    { name: '비타민', value: 43, color: 'purple' },
    { name: '아이오딘', value: 90, color: 'red' },
    { name: '철분', value: 47, color: 'teal' },
  ];

  return (
    <div className="nutritional-container">
      {/* -------------------  왼쪽 사이드바 ------------------- */}
      <aside className="nutritional-sidebar">
        <div className="nutritional-contents-main">
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
              <button onClick={() => alert('장바구니 이동')}>
                장바구니 담기
              </button>
            </div>
          </section>
        </div>
      </aside>

      {/* -------------------  메인 콘텐츠 ------------------- */}
      <main className="nutritional_main">
        <div className="nutritional-banner">
          <img
            className="nutritional-banner-img"
            src={process.env.PUBLIC_URL + '/img/main/Banner1.jpg'}
            alt="배너"
          />
        </div>
        <ul className="nutritional_low_content">
          {[
            { label: '판매량순', type: 'sales' },
            { label: '낮은 가격순', type: 'asc' },
            { label: '높은 가격순', type: 'desc' }
          ].map(({ label, type }, i) => (
            <React.Fragment key={label}>
              <li>
                <button
                  type="button"
                  className="sort-btn"
                  onClick={() => sortProducts(type)}
                >
                  {label}
                </button>
              </li>
              {i < 2 && <li>|</li>}
            </React.Fragment>
          ))}
        </ul>
        <ul className="nutritional_content">
          {products.map((p) => (
            <li key={p.id} className="nutritional_item_store">
              <div className="nutritional_item_img">
                <img src={p.img} alt={p.name} />
              </div>

              <div className="nutritional_item_add" onClick={() => addToCart(p)}>
                <i className="fas fa-cart-shopping" /> 담기
              </div>

              <div className="nutritional_item_name">{p.name}</div>

              <div className="item_Nutritional_ingredients">
                <button
                  className="nutrition-more-button"
                  onClick={() => toggleExpand(p.id)}
                >
                  <span>{expandedItems[p.id] ? '접기' : '영양정보 더보기'}</span>
                  <span className="material-symbols-outlined">
                    {expandedItems[p.id] ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {expandedItems[p.id] && (
                  <div className="nutrient-columns">
                    <ul className="nutrient-column">
                      {p.nutrientsLeft.map((n, index) => (
                        <li key={index}>{n}</li>
                      ))}
                    </ul>
                    <ul className="nutrient-column">
                      {p.nutrientsRight.map((n, index) => (
                        <li key={index}>{n}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="nutritional_item_price">
                <span className="nutritional_discount">{p.discount}%</span>
                <span className="nutritional_price">
                  {p.price.toLocaleString()}원~
                </span>
              </div>
              <div className="nutritional_item_review">
                <i className="fa-regular fa-comment-dots"></i>
                <span>{p.sales_count.toLocaleString()}+</span>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
