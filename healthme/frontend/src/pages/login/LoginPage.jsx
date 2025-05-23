import React from "react";
import 'static/css/login/login.css'

const LoginPage = () => {
    return (
        <>
            <div id="header" />
            <div className="login_box">
                <form action="/login.jsp" method="post">
                    <div className="box1">
                        <h2> 로그인</h2>
                        {/* 이메일 입력 */}
                        <input
                            type="text"
                            name="userid"
                            className="custom-input"
                            placeholder="아이디 또는 이메일"
                            id="userid"
                        />
                        {/* 비밀번호 입력 */}
                        <input
                            type="password"
                            name="userpw"
                            className="custom-input"
                            placeholder="비밀번호"
                            id="userid"
                        />
                        {/* 로그인유지 체크박스 */}
                        <div className="cb">
                            <input type="checkbox" id="login" />
                            <label htmlFor="login">로그인 상태 유지</label>
                        </div>
                        {/* 로그인 */}
                        <div className="row mt-4">
                            <div className="col">
                                <button type="submit" className="btn1 btn-custom">
                                    로그인
                                </button>
                            </div>
                        </div>
                        <div className="line">
                            <hr />
                            <span>또는</span>
                            <hr />
                        </div>
                        {/* 구글로 로그인 */}
                        <div className="row">
                            <div className="col">
                                <button type="button" className="btn2 btn-custom">
                                    <img src="/img/google.png" alt="카카오" className="logo_google" />
                                    구글로 로그인
                                </button>
                            </div>
                        </div>
                        {/* 카카오로 로그인 */}
                        <div className="row">
                            <div className="col">
                                <button type="button" className="btn3 btn-custom">
                                    <img src="/img/kakao.png" alt="네이버" className="logo_kakao" />
                                    카카오로 로그인
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="hypertext">
                        <a href="">아이디 찾기</a>
                        <a href="">비밀번호 찾기</a>
                    </div>
                </form>
                <div className="suggest-join">
                    <li>아직 회원이 아니세요?</li>
                    <a href="/pages/login/join.html">회원가입</a>
                </div>
            </div>
            <div id="footer" />
        </>
    );
};

export default LoginPage