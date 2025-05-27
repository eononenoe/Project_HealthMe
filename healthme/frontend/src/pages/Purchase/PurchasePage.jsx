import React, { useEffect } from 'react';
import 'static/css/pages/Purchase.css';

const PurchasePage = () => {
  useEffect(() => {
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
    const items = document.querySelectorAll('.item_store');
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
          <img className='banner-img' src="/img/main/Banner1.jpg" alt="배너" />
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
          {/* 상품 아이템 반복 - 예시 1개만 */}
          <li className="item_store 축산">
            <div className="item_img">
              <img
                src="https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/4c36b050-06f9-4ce1-9597-27bf4c2563fb.jpg"
                alt=""
              />
            </div>
            <div className="item_add">
              <i className="fa-solid fa-cart-shopping"></i>
              <span onClick={() => alert('장바구니에 담겼습니다')}>담기</span>
            </div>
            <div className="item_name">
              <span>한돈 부위별 대용량 가성비 7종</span>
            </div>
            <div className="item_discount_price">
              <del>28,900원</del>
            </div>
            <div className="item_price">
              <ul>
                <li className="discount">34%</li>
                <li className="price">18,900원</li>
              </ul>
            </div>
            <div className="item_review">
              <i className="fa-regular fa-comment-dots"></i>
              <span>999+</span>
            </div>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default PurchasePage;
