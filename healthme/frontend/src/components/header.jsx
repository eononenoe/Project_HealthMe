// src/components/Header.jsx
import React from 'react';
import 'static/css/common/common.css'; // jsconfig.json 설정돼 있으면 가능

const Header = () => {
    return (
        <div className='header'>
            {/* 오른쪽 상단 메뉴 */}
            <ul className="top_of_top_header">
                <li><a href="/pages/login/join.html">회원가입</a></li>
                <li className="logo_middle">|</li>
                <li><a href="/pages/login/login.html">로그인</a></li>
                <li className="logo_middle">|</li>
                <li><a href="/pages/shopping cart/shopping_cart.html">장바구니</a></li>
            </ul>

            {/* 로고 + 중앙 검색창 정렬 */}
            <div className="header_main_row">
                <div className="logo">
                    <a href="/">
                        <span className="logo_eng">HealthMe</span>
                        <span className="logo_middle">ㅤ|ㅤ</span>
                        <span className="logo_kor">헬시미</span>
                    </a>
                </div>

                <form className="search_box" action="" method="get">
                    <button className="search_btn" type="submit">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                    <input
                        className="search_txt"
                        type="text"
                        placeholder="검색어를 입력해주세요"
                    />
                </form>
            </div>

            {/* 하단 네비 메뉴 */}
            <ul className="low_header_nav">
                <li><a href="/pages/Question/Question.html">영양 설문</a></li>
                <li><a href="/pages/Result/Result.html">맞춤형 성분</a></li>
                <li><a href="/pages/custom nutritional/custom_nutritional.html">추천 재료</a></li>
                <li><a href="/pages/Purchase/Purchase.html">구매</a></li>
            </ul>
        </div>
    );
};

export default Header;
