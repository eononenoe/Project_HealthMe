import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'static/css/pages/Purchase.css';

const PurchasePage = () => {
  const [products, setProducts] = useState([]);

useEffect(() => {
  axios.get("http://localhost:8090/healthme/products/details", {
    withCredentials: true,
  })
    .then(response => {
      console.log("데이터:", response.data);
      setProducts(response.data); 
    })
    .catch(error => {
      console.error("에러 발생:", error);
    });

  const buttonsGroup = document.querySelectorAll('.options');
  buttonsGroup.forEach((group) => {
    const buttons = group.querySelectorAll('.circle');
    const question = group.previousElementSibling;

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        buttons.forEach((b) => b.classList.remove('selected'));
        button.classList.add('selected');
        group.classList.add('faded');
        if (question && question.classList.contains('question')) {
          question.classList.add('faded');
        }
      });
    });
  });
}, []);


  const filterCategory = (category) => {
    const items = document.querySelectorAll('.purchase-item_store');
    items.forEach((item) => {
      item.style.display = 'none';
    });

    const selectedItems = document.querySelectorAll(`.${category}`);
    selectedItems.forEach((item) => {
      item.style.display = 'block';
    });
  };

  return (
    <main className="purchase-wrapper">
      <aside className="purchase-left-content">
        <div className="purchase-left-title">
          <h2>구매</h2>
          <a href="../Purchase/Purchase.html">전체보기 +</a>
        </div>
        <ul className="purchase-left-menu">
          {['신제품', '제철음식', '축산', '농산', '수산'].map((category) => (
            <li key={category}>
              <label className="custom-radio">
                <input
                  type="radio"
                  name="category"
                  onClick={() => filterCategory(category)}
                />
                {category}
              </label>
            </li>
          ))}
        </ul>
      </aside>

      <section className="purchase-right-content">
        <h1 className="purchase-title">구매</h1>

        <div className="purchase-banner">
          <img
            className="purchase-banner-img"
            src="/img/main/Banner1.jpg"
            alt="배너"
          />
        </div>

        <ul className="purchase-sort-menu">
          {['추천순', '신상품순', '판매량순', '낮은 가격순', '높은 가격순'].map(
            (text, index) => (
              <React.Fragment key={text}>
                <li><a href="#">{text}</a></li>
                {index < 4 && <li>|</li>}
              </React.Fragment>
            )
          )}
        </ul>

        <ul className="purchase-product-list">
          {products.map((product) => (
            <li key={product.productId} className={`purchase-item_store ${product.category}`}>
              <div className="purchase-item_img">
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <div className="purchase-item_add">
                <i className="fa-solid fa-cart-shopping"></i>
                <span onClick={() => alert('장바구니에 담겼습니다')}>담기</span>
              </div>
              <div className="purchase-item_name">
                <span>{product.name}</span>
              </div>
              <div className="purchase-item_discount_price">
                <del>{product.price.toLocaleString()}원</del>
              </div>
              <div className="purchase-item_price">
                <ul>
                  <li className="purchase-discount">
                    {Math.round(100 - (product.salprice / product.price) * 100)}%
                  </li>
                  <li className="purchase-price">{product.salprice.toLocaleString()}원</li>
                </ul>
              </div>
              <div className="purchase-item_review">
                <i className="fa-regular fa-comment-dots"></i>
                <span>999+</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default PurchasePage;
