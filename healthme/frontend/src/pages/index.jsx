import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'static/css/home/style.css';
import axios from 'axios';

const HomePage = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const [specialProducts, setSpecialProducts] = useState([]);

  useEffect(() => {
    new Swiper('.swiper', {
      direction: 'horizontal',
      loop: true,
      autoplay: {
        delay: 5000,
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

    axios
      .get("http://localhost:8090/healthme/products", { withCredentials: true })
      .then((response) => {
        console.log('응답:', response.data);
        const all = response.data;

        const popular = [...all]
          .sort((a, b) => (b.sales_count || 0) - (a.sales_count || 0))
          .slice(0, 4);

        const special = [...all]
          .filter((p) => p.price && p.salprice)
          .map((p) => ({
            ...p,
            discountRate: Math.round(100 - (p.salprice / p.price) * 100),
          }))
          .sort((a, b) => b.discountRate - a.discountRate)
          .slice(0, 4);

        setPopularProducts(popular);
        setSpecialProducts(special);
      })
      .catch((err) => {
        console.error('상품 로딩 오류:', err);
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
                    <img src={`${process.env.PUBLIC_URL}/img/main/Banner1.jpg`} alt="배너" />
                  </div>
                  <div className="swiper-slide">
                    <img src={`${process.env.PUBLIC_URL}/img/main/Banner2.jpg`} alt="배너" />
                  </div>
                  <div className="swiper-slide">
                    <img src={`${process.env.PUBLIC_URL}/img/main/Banner3.jpg`} alt="배너" />
                  </div>
                  <div className="swiper-slide">
                    <img src={`${process.env.PUBLIC_URL}/img/main/Banner4.jpg`} alt="배너" />
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
                <a href="/question">
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
                <a href="/nutritional">
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
                <li className="main_low_title">실시간 인기 상품</li>
                <li>가장 인기있는 상품만 모아보세요!</li>
              </ul>
              <ProductList products={popularProducts} />

              {/* 오늘의 특가 */}
              <ul className="main_low_top_content">
                <li className="main_low_title">오늘의 특가</li>
                <li>헬시미 추천 특가템 최대 50%</li>
              </ul>
              <ProductList products={specialProducts} isSpecial />
            </ul>
          </div>
        </section>
      </main>
    </>
  );
};

const ProductList = ({ products = [], isSpecial = false }) => {
  const navigate = useNavigate();

  const goToDetail = (product) => {
    console.log("Product:", product);

    if (!product?.productId) {
      alert('상품 ID가 없습니다! ㅎㅇㅎㅇ'); 
      return;
    }
    navigate(`/details/${product.productId}`);
  };


  return (
    <ul className="main_low_low_content">
      {products.map((product) => (
        <li key={product.productId} className="item_store">
          <div className="item_img">
            <img src={product.imageUrl} alt={product.name} />
          </div>
          <div className="item_add" onClick={() => goToDetail(product)}>
            <i className="fa-solid fa-cart-shopping" />
            <span>담기</span>
          </div>
          <div className="item_name">
            <span>{product.name}</span>
          </div>
          <div className="item_item_subtitle">
            <span>{product.description}</span>
          </div>
          <div className="item_discount_price">
            <del>{product.price?.toLocaleString()}원</del>
          </div>
          <div className="item_price">
            <ul>
              <li className="discount">
                {Math.round(100 - (product.salprice / product.price) * 100)}%
              </li>
              <li className="price">
                {product.salprice?.toLocaleString()}원
              </li>
            </ul>
          </div>
          <div className="item_review">
            <i className="fa-regular fa-comment-dots" />
            <span>{(product.sales_count || 0).toLocaleString()}+</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default HomePage;
