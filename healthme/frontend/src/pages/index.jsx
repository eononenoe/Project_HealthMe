import React, { useEffect } from 'react';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'static/css/home/style.css';

const HomePage = () => {
  useEffect(() => {
    new Swiper('.swiper', {
      direction: 'horizontal',
      loop: true,
      autoplay: {
        delay: 2000,
      },
      effect: 'slide',
      mousewheel: true,
      speed: 500,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        type: 'fraction',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }, []);

  return (
    <>
      <main>
        <section>
          {/* 배너 */}
          <div className="wrapper">
            <section className="banner-section">
              <div className="swiper">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <img src={`${process.env.PUBLIC_URL}/img/main/Banner1.jpg`} alt="반찬 배너" />
                  </div>
                  <div className="swiper-slide">
                    <img src={`${process.env.PUBLIC_URL}/img/main/Banner2.jpg`} alt="식단 배너" />
                  </div>
                  <div className="swiper-slide">
                    <img src={`${process.env.PUBLIC_URL}/img/main/Banner3.jpg`} alt="참외 배너" />
                  </div>
                </div>
                <div className="swiper-pagination" />
              </div>
            </section>
          </div>

          {/* 아이템 */}
          <div>
            <ul className="main_top_content">
              <li className="are_you_Health">
                <a href="pages/Question/Question.html">
                  <img
                    className="are_you_Health"
                    width="400"
                    height="400"
                    src="img/main/MyHealth.jpg"
                    alt="건강 찾기"
                  />
                </a>
              </li>
              <li className="what_health_food">
                <a href="pages/Purchase/Purchase.html">
                  <img
                    className="what_health_food"
                    width="400"
                    height="400"
                    src="img/main/HealthFood.jpg"
                    alt="건강 재료 찾기"
                  />
                </a>
              </li>
              <li className="content_news">
                {Array(3).fill().map((_, i) => (
                  <ul key={i} className="news_card">
                    <a href="pages/Announcement/Announcement.html">
                      {i === 0 && (
                        <ul className="news_card_top">
                          <li className="news_card_title">공지사항</li>
                          <li className="news_card_subtitle">NEW</li>
                        </ul>
                      )}
                      <li className="news_card_content">
                        공식 홈페이지 서버 점검 <br />
                        (2025.2.2 0시 ~ 2025.2.2 02시 약 2시간)
                      </li>
                    </a>
                  </ul>
                ))}
              </li>
            </ul>

            {/* 실시간 인기 상품 */}
            <ul className="main_low_content">
              <ul className="main_low_top_content">
                <li className="main_low_title">🏆 실시간 인기 상품</li>
                <li>가장 인기있는 상품만 모아보세요!</li>
              </ul>
              <ProductList />

              {/* 오늘의 특가 */}
              <ul className="main_low_top_content">
                <li className="main_low_title">🎉 오늘의 특가</li>
                <li>헬시미 추천 특가템 최대 50%</li>
              </ul>
              <ProductList isSpecial />
            </ul>
          </div>
        </section>
      </main>
    </>
  );
};

// 공통 상품 리스트 컴포넌트
const ProductList = ({ isSpecial = false }) => {
  const products = isSpecial ? specialProducts : popularProducts;

  return (
    <ul className="main_low_low_content">
      {products.map((product, i) => (
        <li key={i} className="item_store">
          <div className="item_img">
            <img src={product.image} alt="" />
          </div>
          <div className="item_add">
            <i className="fa-solid fa-cart-shopping" />
            <span onClick={() => alert('장바구니에 담겼습니다')}>담기</span>
          </div>
          <div className="item_name">
            <span>{product.name}</span>
          </div>
          <div className="item_discount_price">
            <del>{product.originalPrice}</del>
          </div>
          <div className="item_price">
            <ul>
              <li className="discount">{product.discount}</li>
              <li className="price">{product.price}</li>
            </ul>
          </div>
          <div className="item_review">
            <i className="fa-regular fa-comment-dots" />
            <span>999+</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

// 상품 데이터 예시
const popularProducts = [
  {
    name: '[JJH365] 한돈 부위별 대용량 가성비 7종',
    originalPrice: '28,900원',
    discount: '34%',
    price: '18,900원~',
    image:
      'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/4c36b050-06f9-4ce1-9597-27bf4c2563fb.jpg',
  },
  {
    name: '[KIM01] 동물복지 백색 유정란 20구',
    originalPrice: '10,200원',
    discount: '15%',
    price: '8,670원~',
    image:
      'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/b5afa0d9-0d39-424a-b4aa-df14e290244e.jpg',
  },
  {
    name: '[YSB111] 유기농 채소믹스 600g (냉동)',
    originalPrice: '8,990원',
    discount: '5%',
    price: '8,490원~',
    image:
      'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/2806a17d-deba-4bc4-b6ec-d6dc0c96e575.jpg',
  },
  {
    name: '[YSH45] 완숙토마토 1kg',
    originalPrice: '11,900원',
    discount: '16%',
    price: '9,900원~',
    image:
      'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/dd55e8f3-621f-4b3b-b775-460c4b6c2435.jpeg',
  },
];

const specialProducts = [
  {
    name: '[JJH09] 칠레산 블루베리 125g*3',
    originalPrice: '19,900원',
    discount: '49%',
    price: '9,900원~',
    image:
      'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/a78fcd53-dd61-4b5c-afcd-7ee9a583e045.jpg',
  },
  {
    name: '[JJH30] 대추방울토마토 750g',
    originalPrice: '11,900원',
    discount: '41%',
    price: '6,990원~',
    image:
      'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/4436fdec-039d-4683-b8f3-7ebf677ad190.jpg',
  },
  {
    name: '[JJH05] 채소믹스 500g',
    originalPrice: '5,990원',
    discount: '11%',
    price: '5,290원~',
    image:
      'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/8a813917-6a80-4a23-8bf1-074df5875493.jpg',
  },
  {
    name: '[JJH21] 호주산 목초육 치마살 구이용 300g',
    originalPrice: '16,590원',
    discount: '27%',
    price: '11,900원~',
    image:
      'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/5a551f25-bcc3-4b26-914e-4cedce85dc7e.jpeg?v=0531',
  },
];

export default HomePage;
