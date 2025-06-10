import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'static/css/pages/Nutritional.css';
import { useNavigate } from "react-router-dom";

const formatNutrient = (label, value, unit) => {
  if (!value) return null;
  const numericValue = parseFloat(value);
  if (isNaN(numericValue)) return null;

  let displayValue = numericValue;
  let displayUnit = unit;

  if (unit === 'mg' && numericValue >= 1000) {
    displayValue = (numericValue / 1000).toFixed(1);
    displayUnit = 'g';
  }

  return { label, value: displayValue, unit: displayUnit };
};

// CardBar
const CardBar = ({ name, percent, onClick }) => {
  const getColorClass = (percent) => {
    if (percent <= 20) return 'red';
    if (percent <= 40) return 'orange';
    if (percent <= 60) return 'yellow';
    if (percent <= 80) return 'green';
    return 'blue';
  };

  const colorClass = getColorClass(percent);
  return (
    <div className="nutritional_card-bar" onClick={onClick}>
      <div className="nutritional_bar-label">
        {name} <span className="nutritional_bar-percent">{percent}%</span>
      </div>
      <div className="nutritional_bar-container">
        <div
          className={`nutritional_bar-inner ${colorClass}`}
          style={{ width: `${percent}%` }}
        />
        <div
          className={`nutritional_indicator ${colorClass}`}
          style={{ left: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default function CustomNutritionalPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [expandedItems, setExpandedItems] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loginUser = localStorage.getItem("loginUser");

    if (!loginUser) {
      alert("이 페이지는 로그인 후 이용 가능합니다.");
      navigate("/login");
    }

    axios.get('http://localhost:8090/healthme/products/details', {
      withCredentials: true,
    })
      .then((res) => {
        console.log("응답 데이터:", res.data); // 이 줄 추가
        if (!Array.isArray(res.data)) {
          console.error("응답 형식 오류: 배열이 아님");
          return;
        }

        const mappedProducts = res.data.map((item, idx) => {
          const productId = item.productId ?? `temp-${idx}`;
          const nutrientsRaw = [
            formatNutrient('단백질', item.protein, 'g'),
            formatNutrient('철분', item.iron, 'mg'),
            formatNutrient('칼슘', item.calcium, 'mg'),
            formatNutrient('비타민 D', item.vitamin_d, 'µg'),
            formatNutrient('식이섬유', item.dietary_fiber, 'g'),
            formatNutrient('마그네슘', item.magnesium, 'mg'),
            formatNutrient('칼륨', item.potassium, 'mg'),
            formatNutrient('비오틴', item.biotin, 'µg'),
            formatNutrient('아연', item.zinc, 'mg'),
            formatNutrient('아르기닌', item.arginine, 'mg'),
          ].filter(Boolean);

          return {
            id: String(productId),
            name: item.name,
            price: item.salprice,
            originalPrice: item.price,
            discount: Math.round((1 - item.salprice / item.price) * 100),
            img: item.image_url,
            nutrientsLeft: nutrientsRaw.slice(0, 5),
            nutrientsRight: nutrientsRaw.slice(5),
            sales_count: item.sales_count,
          };
        });

        setProducts(mappedProducts);
      })
      .catch((error) => {
        console.error("API 요청 실패:", error);
      });
  }, []);

  const toggleExpand = (productId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [String(productId)]: !prev[String(productId)],
    }));
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      return existing
        ? prev.map((p) => p.id === product.id ? { ...p, qty: p.qty + 1 } : p)
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

  const sortProducts = (order) => {
    let sorted = [];
    if (order === 'asc' || order === 'desc') {
      sorted = [...products].sort((a, b) =>
        order === 'asc' ? a.price - b.price : b.price - a.price
      );
    } else if (order === 'sales') {
      sorted = [...products].sort((a, b) => b.sales_count - a.sales_count);
    } else if (order === 'discount') {
      sorted = [...products].sort((a, b) => b.discount - a.discount);
    }
    setProducts(sorted);
  };

  const NUTRIENTS = [
    { name: '탄수화물', value: 22 },
    { name: '단백질', value: 52 },
    { name: '지방', value: 78 },
    { name: '비타민', value: 11 },
    { name: '아이오딘', value: 90 },
    { name: '비오틴', value: 47 },
    { name: '비타민D', value: 47 },
    { name: '지방', value: 47 },
    { name: '식이섬유', value: 47 },
    { name: '아연', value: 47 },
  ];

  return (
    <div className="nutritional-container">
      {/* ---------------- 왼쪽 사이드바 ---------------- */}
      <aside className="nutritional-sidebar">
        <div className="nutritional-contents-main">
          <h3 className="nutrition-section-title">영양소 정보</h3>
          {NUTRIENTS.map((n, i) => (
            <CardBar key={i} name={n.name} percent={n.value} />
          ))}
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
          <ul className="nutritional-cart-items">
            {cart.map((item, idx) => (
              <li key={`cart-${item.id}-${idx}`}>
                <div className="nutritional-cart-line">
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    checked={item.selected}
                    onChange={() => toggleOne(idx)}
                  />
                  <div className="nutritional-cart-desc">
                    <div className="nutritional-cart-item-name">{item.name}</div>
                    <div className="nutritional-cart-item-price">
                      {item.price.toLocaleString()}원
                    </div>
                    <div className="nutritional-cart-item-quantity">
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
            총 합계 : <span>{totalPrice.toLocaleString()}원</span>
          </div>
          <div className="cart-footer-button">
            <button onClick={() => alert('장바구니 이동')}>장바구니 담기</button>
          </div>
        </section>
      </aside>

      {/* ---------------- 메인 콘텐츠 ---------------- */}
      <main className="nutritional_main">
        <div className="nutritional-banner">
          <img
            className="nutritional-banner-img"
            src={process.env.PUBLIC_URL + '/img/main/Banner2.jpg'}
            alt="배너"
          />
        </div>

        <ul className="nutritional_low_content">
          {[
            { label: '판매량순', type: 'sales' },
            { label: '할인율순', type: 'discount' },
            { label: '낮은 가격순', type: 'asc' },
            { label: '높은 가격순', type: 'desc' },
          ].flatMap(({ label, type }, i, arr) => {
            const items = [
              <li key={`sort-${label}`}>
                <button className="sort-btn" onClick={() => sortProducts(type)}>
                  {label}
                </button>
              </li>,
            ];
            if (i < arr.length - 1) {
              items.push(<li key={`divider-${i}`}>|</li>);
            }
            return items;
          })}
        </ul>

        <ul className="nutritional_content">
          {products.map((p, idx) => (
            <li key={`product-${p.id}-${idx}`} className="nutritional_item_store">
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
                      {p.nutrientsLeft.map((n, i) => (
                        <li key={`left-${p.id}-${i}`}>
                          <span>{n.label}</span>
                          <span>{n.value} {n.unit}</span>
                        </li>
                      ))}
                    </ul>
                    <ul className="nutrient-column">
                      {p.nutrientsRight.map((n, i) => (
                        <li key={`right-${p.id}-${i}`}>
                          <span>{n.label}</span>
                          <span>{n.value} {n.unit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="nutritional_item_price">
                <span className="nutritional_discount">{p.discount}%</span>
                <span className="nutritional_price">{p.price.toLocaleString()}원~</span>
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
