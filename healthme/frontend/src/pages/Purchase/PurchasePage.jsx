import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'static/css/pages/Purchase.css';

const PurchasePage = () => {
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8090/healthme/products", {
      withCredentials: true,
    })
      .then(response => {
        setProducts(response.data);
        setOriginalProducts(response.data); // 정렬 전 원본 저장
      })
      .catch(error => {
        console.error("에러 발생:", error);
      });

    // 버튼 관련 fade 효과 처리
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

  const sortProducts = (order) => {
    let sorted = [];
    if (order === 'asc' || order === 'desc') {
      sorted = [...products].sort((a, b) => {
        const priceA = a.salprice ?? a.price;
        const priceB = b.salprice ?? b.price;
        return order === 'asc' ? priceA - priceB : priceB - priceA;
      });
    } else if (order === 'sales') {
      sorted = [...products].sort((a, b) => {
        return (b.sales_count || 0) - (a.sales_count || 0);
      });
    } else if (order === 'discount') {
      sorted = [...products].sort((a, b) => {
        const discountA = a.salprice ? ((a.price - a.salprice) / a.price) * 100 : 0;
        const discountB = b.salprice ? ((b.price - b.salprice) / b.price) * 100 : 0;
        return discountB - discountA; // 높은 할인율이 먼저 오도록
      });
    }
    setProducts(sorted);
  };



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
          <a href="/purchase">전체보기 +</a>
        </div>
        <ul className="purchase-left-menu">
          {['건강식품', '유제품', '축산물', '농산물', '수산물'].map((category) => (
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
        <div className="purchase-banner">
          <img
            className="purchase-banner-img"
            src="/img/main/Banner1.jpg"
            alt="배너"
          />
        </div>

        <ul className="purchase-sort-menu">
          <li><a href="#" onClick={() => sortProducts('sales')}>판매량순</a></li>
          <li>|</li>
          <li><a href="#" onClick={() => sortProducts('discount')}>할인율순</a></li>
          <li>|</li>
          <li><a href="#" onClick={() => sortProducts('asc')}>낮은 가격순</a></li>
          <li>|</li>
          <li><a href="#" onClick={() => sortProducts('desc')}>높은 가격순</a></li>

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
              <div className="purchase-item_subtitle">
                <span>{product.description}</span>
              </div>
              <div className="purchase-item_discount_price">
                <del>{product.price.toLocaleString()}원</del>
              </div>
              <div className="purchase-item_price">
                <ul>
                  <li className="purchase-discount">
                    {Math.round(100 - (product.salprice / product.price) * 100)}%
                  </li>
                  <li className="purchase-price">
                    {product.salprice.toLocaleString()}원
                  </li>
                </ul>
              </div>
              <div className="purchase-item_review">
                <i className="fa-regular fa-comment-dots"></i>
                <span>{product.sales_count.toLocaleString()}+</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default PurchasePage;
