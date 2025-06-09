import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'static/css/pages/Details.css';

function ProductDetailPage() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('detail');
    const [isDetailExpanded, setDetailExpanded] = useState(false);

    const detailRef = useRef(null);
    const reviewRef = useRef(null);

    const renderNutrient = (value, unit = '') => {
        if (!value || value === '0') return '정보 없음';
        return `${value}${unit}`;
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8090/healthme/products/details/${productId}`, {
                    credentials: 'include',
                });
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('상품 불러오기 실패:', error);
            }
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    if (!product) {
        return <div className="detail-product-page-wrapper">상품 정보를 불러올 수 없습니다.</div>;
    }
    const handleClick = () => {
        navigate('/login');
    };
    const handleScrollToSection = (id) => {
        const refs = {
            detail: detailRef,
            review: reviewRef,
        };
        const ref = refs[id];
        if (ref.current) {
            window.scrollTo({ top: ref.current.offsetTop - 80, behavior: 'smooth' });
        }
    };

    const handleQtyChange = (delta) => {
        setQuantity((prev) => Math.max(1, prev + delta));
    };

    const discountRate = Math.round(100 - (product.salprice / product.price) * 100);
    const totalPrice = (product.salprice * quantity).toLocaleString();
    const price = product.salprice;
    const honorDiscount = price * 0.12;     // 명예등급 시 12% 할인
    const basicPoint = price * 0.03;        // 기본 적립 3%
    const maxDiscount = price * 0.15;       // 최대 할인 15%

    return (
        <div className="detail-product-page-wrapper">
            <div className="detail-product-detail-box">
                <div className="detail-product-image">
                    <img src={product.imageUrl} alt={product.name} />
                </div>

                <div className="detail-product-info-area">
                    <span className="detail-product-title">{product.name}</span>

                    <div className="detail-subtitle">{product.description}</div>

                    <div className="detail-product-price-box">
                        <ul>
                            <span className="detail-discount-rate">{discountRate}%</span>
                            <span className="detail-final-price">{product.salprice?.toLocaleString()}원</span>
                        </ul>
                        <span className="detail-original-price">{product.price?.toLocaleString()}원</span>
                    </div>

                    <div className="detail-count-box">
                        <span className="count">누적 주문건수 : {(product.sales_count || 0).toLocaleString()}</span>
                    </div>
                    <div className="detail-benefit-container">
                        <div className="detail-benefit-title">
                            최대 할인 금액 <strong className="detail-benefit-total">
                                {(
                                    product.salprice * (0.03 + 0.02 + 0.01 + 0.12)
                                ).toLocaleString()}원
                            </strong>
                        </div>
                        <ul className="detail-benefit-list">
                            <li>
                                <span className="detail-benefit-label">└ 기본 할인</span>
                                <span className="detail-benefit-value">{(product.salprice * 0.03).toLocaleString()}원</span>
                            </li>
                            <li>
                                <span className="detail-benefit-label">└ 오픈 기념 할인</span>
                                <span className="detail-benefit-value">{(product.salprice * 0.02).toLocaleString()}원</span>
                            </li>
                            <li>
                                <span className="detail-benefit-label">└ 소량 재고 할인</span>
                                <span className="detail-benefit-value">{(product.salprice * 0.01).toLocaleString()}원</span>
                            </li>
                        </ul>
                        <div className="detail-membership">
                            <div className='detail-membership-info'>
                                <div className="detail-membership-left">
                                    <span className="membership-badge">명예</span>
                                    등급 시 추가 할인
                                </div>
                                <div className="detail-membership-right">
                                    {(product.salprice * 0.12).toLocaleString()}원
                                </div>
                            </div>
                            <span className="detail-membership-high">
                                <span className="badge badge-green">새싹</span>: 3% ·
                                <span className="badge badge-orange">열정</span>: 6% ·
                                <span className="badge badge-blue">우수</span>: 9% ·
                                <span className="badge badge-purple">명예</span>: 12% 할인 혜택이 적용됩니다.
                            </span>

                            <button className="detail-benefit-button" onClick={handleClick}>로그인 하러 가기</button>
                        </div>

                    </div>


                    <div className="detail-delivery-box">배송비 : 무료배송</div>

                    <div className="detail-summary-box">
                        <div>총 수량 : <strong>{quantity}개</strong></div>
                        <div className="total-price">
                            <span> 합계 : </span>
                            <strong>{totalPrice}원</strong>
                        </div>
                    </div>

                    <div className="detail-purchase-btn-box">
                        <div className="detail-qty-wrapper">
                            <input type="text" className="detail-qty-input" value={quantity} readOnly />
                            <div className="detail-qty-buttons">
                                <button className="detail-btn-up" onClick={() => handleQtyChange(1)}>
                                    <span className="material-symbols-outlined">keyboard_arrow_up</span>
                                </button>
                                <button className="detail-btn-down" onClick={() => handleQtyChange(-1)}>
                                    <span className="material-symbols-outlined">keyboard_arrow_down</span>
                                </button>
                            </div>
                        </div>
                        <button className="detail-btn-cart">장바구니</button>
                        <button className="detail-btn-buy">구매하기</button>
                    </div>
                </div>
            </div>
            {/*  탭 메뉴 */}
            <div className="detail-tab-menu">
                {['detail', 'review'].map((tab) => (
                    <button
                        key={tab}
                        className={`detail-tab-button ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => {
                            setActiveTab(tab);
                            handleScrollToSection(tab);
                        }}
                    >
                        {tab === 'detail' ? '상품상세' : '영양성분'}
                    </button>
                ))}
            </div>
            {/*  상세 이미지 */}
            {activeTab === 'detail' && (
                <>
                    <div id="detail" className={`detail-tab-content ${isDetailExpanded ? 'expanded' : ''}`} ref={detailRef}>
                        <img src={product.detailImg} alt="상세 설명 이미지" />
                    </div>
                    {!isDetailExpanded && (
                        <button className="detail-show-more-btn" onClick={() => setDetailExpanded(true)}>
                            <span>상품정보 더보기</span>
                            <span className="material-symbols-outlined">expand_more</span>
                        </button>
                    )}
                </>
            )}
            {/*  영양성분 정보 */}
            {activeTab === 'review' && (
                <div id="review" className="detail-tab-content active" ref={reviewRef}>
                    <h2 className="detail-nutrition-title">상품 영양성분</h2>
                    <p className="detail-nutrition-desc">{product.name}의 100g 기준 주요 영양성분입니다.</p>
                    <ul className="detail-nutrition-list">
                        <li><span>단백질</span><strong>{renderNutrient(product.protein, ' g')}</strong></li>
                        <li><span>철분</span><strong>{renderNutrient(product.iron, ' mg')}</strong></li>
                        <li><span>비타민 D</span><strong>{renderNutrient(product.vitamin_d, ' µg')}</strong></li>
                        <li><span>칼슘</span><strong>{renderNutrient(product.calcium, ' mg')}</strong></li>
                        <li><span>식이섬유</span><strong>{renderNutrient(product.dietary_fiber, ' g')}</strong></li>
                        <li><span>마그네슘</span><strong>{renderNutrient(product.magnesium, ' mg')}</strong></li>
                        <li><span>칼륨</span><strong>{renderNutrient(product.potassium, ' mg')}</strong></li>
                        <li><span>비오틴</span><strong>{renderNutrient(product.biotin, ' µg')}</strong></li>
                        <li><span>아연</span><strong>{renderNutrient(product.zinc, ' mg')}</strong></li>
                        <li><span>아르기닌</span><strong>{renderNutrient(product.arginine, ' mg')}</strong></li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default ProductDetailPage;
