// src/components/Header.jsx
<<<<<<< HEAD
import { RoundaboutRightRounded } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
import "static/css/common/common.css";
import axios from "axios";

const handleLogout = async () => {
  try {
    await axios.post(
      "/healthme/users/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
  } catch (err) {
    console.warn("서버 로그아웃 실패 (무시하고 클라이언트만 정리)", err);
  } finally {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("loginUser");
    window.location.href = "/";
  }
};

const Header = () => {
  const loginUser = JSON.parse(localStorage.getItem("loginUser"));
  return (
    <div className="header">
      {/* 오른쪽 상단 메뉴 */}
      <ul className="top_of_top_header">
        {loginUser ? (
          <>
            <li>
              <span>{loginUser.username}님</span>
            </li>
            <li className="logo_middle">|</li>
            {loginUser.role === "ROLE_ADMIN" ? (
              <li>
                <Link to="/admin">관리자페이지</Link>
              </li>
            ) : (
              <li>
                <Link to="/mypage">마이페이지</Link>
              </li>
            )}

            <li className="logo_middle">|</li>
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                로그아웃
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/join">회원가입</Link>
            </li>
            <li className="logo_middle">|</li>
            <li>
              <Link to="/login">로그인</Link>
            </li>
          </>
        )}
        <li className="logo_middle">|</li>
        <li>
          <Link to="/cart">장바구니</Link>
        </li>
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
        <li>
          <a href="/pages/Question/Question.html">영양 설문</a>
        </li>
        <li>
          <a href="/pages/Result/Result.html">맞춤형 성분</a>
        </li>
        <li>
          <a href="/pages/custom nutritional/custom_nutritional.html">
            추천 재료
          </a>
        </li>
        <li>
          <a href="/pages/Purchase/Purchase.html">구매</a>
        </li>
      </ul>
    </div>
  );
=======
import React from 'react';
import { Link } from 'react-router-dom';
import 'static/css/common/common.css';
import axios from 'axios';

const handleLogout = async () => {
    try {
        await axios.post("/healthme/users/logout", {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        });
    } catch (err) {
        console.warn("서버 로그아웃 실패 (무시하고 클라이언트만 정리)", err);
    } finally {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("loginUser");
        window.location.href = "/";
    }
};

const Header = () => {
    const loginUser = JSON.parse(localStorage.getItem("loginUser"));
    return (
        <div className='header'>
            {/* 오른쪽 상단 메뉴 */}
            <ul className="top_of_top_header">
                {loginUser ? (
                    <>
                        <li><span>{loginUser.username}님</span></li>
                        <li className="logo_middle">|</li>
                        <li><Link to="/mypage">마이페이지</Link></li>
                        <li className="logo_middle">|</li>
                        <li><button className='logout-btn' onClick={handleLogout}>로그아웃</button></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/join">회원가입</Link></li>
                        <li className="logo_middle">|</li>
                        <li><Link to="/login">로그인</Link></li>
                    </>
                )}
                <li className="logo_middle">|</li>
                <li><Link to="/cart">장바구니</Link></li>
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
                <li><a href="/question">영양 설문</a></li>
                <li><a href="/result">맞춤형 성분</a></li>
                <li><a href="/nutritional">추천 재료</a></li>
                <li><a href="/purchase">구매</a></li>
            </ul>
        </div >
    );
>>>>>>> bdc9346857e2a4c554b5feecb5013b6ca28bd68b
};

export default Header;
