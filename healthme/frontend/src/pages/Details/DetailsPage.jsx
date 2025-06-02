import React, { useEffect, useRef, useState } from 'react';
import 'static/css/pages/Details.css';

function ProductDetailPage() {
    const unitPrice = 18900;
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('detail');
    const [isDetailExpanded, setDetailExpanded] = useState(false);

    const detailRef = useRef(null);
    const reviewRef = useRef(null);
    const qnaRef = useRef(null);

    const handleScrollToSection = (id) => {
        const refs = {
            detail: detailRef,
            review: reviewRef,
            qna: qnaRef,
        };
        const ref = refs[id];
        if (ref.current) {
            window.scrollTo({
                top: ref.current.offsetTop - 80,
                behavior: 'smooth',
            });
        }
    };

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
        handleScrollToSection(tabId);
    };

    const handleQtyChange = (delta) => {
        setQuantity((prev) => {
            const newQty = Math.max(1, prev + delta);
            return newQty;
        });
    };

    const totalPrice = (unitPrice * quantity).toLocaleString();

    return (
        <div className="product-page-wrapper">
            <div className="product-detail-box">
                {/* 이미지 */}
                <div className="product-image">
                    <img
                        src="https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/4c36b050-06f9-4ce1-9597-27bf4c2563fb.jpg"
                        alt="한돈 부위별 대용량 가성비 7종"
                    />
                </div>

                {/* 제품 정보 */}
                <div className="product-info-area">
                    <span className="product-badge">BEST</span>
                    <h1 className="product-title">한돈 부위별 대용량 가성비 7종</h1>

                    <div className="product-price-box">
                        <strong className="final-price">18,900원</strong>
                        <span className="discount-rate">34%</span>
                        <del className="original-price">28,900원</del>
                    </div>

                    <div className="review-box">
                        <span className="stars" />
                        <span className="score">4.9</span>
                        <span className="count">(999+개 리뷰)</span>
                    </div>

                    <p className="sub-desc">
                        이 제품을 구매하신 고객 분들은 효능, 경제성, 만족도에 대해 좋은 평가를 주셨습니다!
                    </p>

                    <div className="detail_info">
                        <p><strong>오전 10시까지</strong> 주문하고, <strong>오늘 오후 8시 전</strong>에 바로 받아보세요!</p>
                        <p>이후 주문 시, 내일 도착으로 변경됩니다.</p>
                    </div>

                    <div className="delivery-box">배송비 : 무료배송</div>

                    <div className="summary-box">
                        <div>총 수량 <strong>{quantity}개</strong></div>
                        <div className="total-price">
                            <span>합계</span>
                            <strong>{totalPrice}원</strong>
                        </div>
                    </div>

                    <div className="purchase-btn-box">
                        <div className="qty-wrapper">
                            <input type="text" className="qty-input" value={quantity} readOnly />
                            <div className="qty-buttons">
                                <button className="btn-up" onClick={() => handleQtyChange(1)}>
                                    <span className="material-symbols-outlined">keyboard_arrow_up</span>
                                </button>
                                <button className="btn-down" onClick={() => handleQtyChange(-1)}>
                                    <span className="material-symbols-outlined">keyboard_arrow_down</span>
                                </button>
                            </div>
                        </div>
                        <button className="btn-cart">장바구니</button>
                        <button className="btn-buy">바로구매</button>
                    </div>
                </div>
            </div>

            {/* 탭 메뉴 */}
            <div className="tab-menu">
                {['detail', 'review', 'qna'].map((tab) => (
                    <button
                        key={tab}
                        className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => handleTabClick(tab)}
                    >
                        {tab === 'detail' && '상품상세'}
                        {tab === 'review' && '상품평'}
                        {tab === 'qna' && '상품문의'}
                    </button>
                ))}
            </div>

            {/* 탭 콘텐츠 */}
            {activeTab === 'detail' && (
                <>
                    <div
                        id="detail"
                        className={`tab-content active ${isDetailExpanded ? 'expanded' : ''}`}
                        ref={detailRef}
                    >
                        <img src="/img/detail_pig.jpg" alt="상세 설명 이미지" />
                    </div>
                    {!isDetailExpanded && (
                        <button
                            className="show-more-btn"
                            id="showMoreBtn"
                            onClick={() => setDetailExpanded(true)}
                        >
                            <span>상품정보 더보기</span>
                            <span className="material-symbols-outlined">stat_minus_1</span>
                        </button>
                    )}
                </>
            )}
            <div id="review" className={`tab-content ${activeTab === 'review' ? 'active' : ''}`} ref={reviewRef}>
                <h2 className="nutrition-title">상품 영양성분</h2>
                <p className="nutrition-desc">100g 기준 고등어의 주요 영양성분입니다.</p>
                <ul className="nutrition-list">
                    <li><span>단백질</span><strong>19 g</strong></li>
                    <li><span>철분</span><strong>1.5 mg</strong></li>
                    <li><span>비타민 D</span><strong>16 µg</strong></li>
                    <li><span>칼슘</span><strong>12 mg</strong></li>
                    <li><span>식이섬유</span><strong>정보 없음</strong></li>
                    <li><span>마그네슘</span><strong>정보 없음</strong></li>
                    <li><span>칼륨</span><strong>정보 없음</strong></li>
                    <li><span>비오틴</span><strong>정보 없음</strong></li>
                    <li><span>아연</span><strong>정보 없음</strong></li>
                    <li><span>아르기닌</span><strong>정보 없음</strong></li>
                </ul>
            </div>

            <div id="qna" className={`tab-content ${activeTab === 'qna' ? 'active' : ''}`} ref={qnaRef}>
                <div className="qna-header">
                    <h2>상품문의</h2>
                </div>
                <div className="product-inquiry-notice">
                    <ul>
                        <li><strong>상품문의 및 후기게시판을 통한 취소나 환불, 반품 등은 처리되지 않습니다.</strong></li>
                        <li>
                            가격, 판매자, 교환/환불 및 배송 등 해당 상품 자체와 관련 없는 문의는
                            <a href="#"> 고객센터 1:1 문의하기</a>를 이용해주세요.
                        </li>
                        <li>
                            <span className="warning">해당 상품 자체와 관계없는 글</span> (양도, 광고성, 욕설, 비방, 도배 등)의 글은 예고 없이
                            <span className="highlight">이동, 논출제한, 삭제</span> 등의 조치가 취해질 수 있습니다.
                        </li>
                        <li className="caution">공개 게시판이므로 전화번호, 메일 주소 등 개인정보는 절대 남기지 말아주세요.</li>
                    </ul>
                </div>
                <textarea></textarea>
                <div className="qna-button-wrapper">
                    <button>문의하기</button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;
