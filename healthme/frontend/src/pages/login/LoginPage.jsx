import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import 'static/css/login/login.css'

const LoginPage = () => {
    const [formData, setFormData] = useState({
        userid: '',
        password: '',
        remember: false
    })

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/healthme/users/login', {
                userid: formData.userid,
                password: formData.password
            });

            // 응답에 accessToken이 있어야 함
            const { accessToken, refreshToken, userInfo } = response.data;

            // accessToken 저장
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("loginUser", JSON.stringify(userInfo));
            window.location.href = "/";
        } catch (error) {
            alert('로그인 실패!');
            console.error(error);
        }
    };
    return (
        <>
            <div className="login_box">
                <form onSubmit={handleSubmit}>
                    <div className="box1">
                        <h2>로그인</h2>

                        {/* 아이디 입력 */}
                        <input
                            type="text"
                            name="userid"
                            className="custom-input"
                            placeholder="아이디 또는 이메일"
                            value={formData.userid}
                            onChange={handleChange}
                        />

                        {/* 비밀번호 입력 */}
                        <input
                            type="password"
                            name="password"
                            className="custom-input"
                            placeholder="비밀번호"
                            value={formData.password}
                            onChange={handleChange}
                        />

                        {/* 로그인 상태 유지 */}
                        <div className="cb">
                            <input
                                type="checkbox"
                                id="remember"
                                name="remember"
                                checked={formData.remember}
                                onChange={handleChange}
                            />
                            <label htmlFor="remember">로그인 상태 유지</label>
                        </div>

                        {/* 로그인 버튼 */}
                        <div className="row mt-4">
                            <div className="col">
                                <button type="submit" className="btn1 btn-custom">로그인</button>
                            </div>
                        </div>

                        <div className="line">
                            <hr /><span>또는</span><hr />
                        </div>

                        {/* 구글 로그인 */}
                        <div className="row">
                            <div className="col">
                                <button
                                    type="button"
                                    className="btn2 btn-custom"
                                    onClick={() => window.location.href = "http://localhost:8090/oauth2/authorization/google"}
                                >
                                    <img src="/img/google.png" alt="구글" className="logo_google" />
                                    구글로 로그인
                                </button>
                            </div>
                        </div>

                        {/* 카카오 로그인 */}
                        <div className="row">
                            <div className="col">
                                <button
                                    type="button"
                                    className="btn3 btn-custom"
                                    onClick={() => window.location.href = "http://localhost:8090/oauth2/authorization/kakao"}
                                >
                                    <img src="/img/kakao.png" alt="카카오" className="logo_kakao" />
                                    카카오로 로그인
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 링크들 */}
                    <div className="hypertext">
                        <Link to="#">아이디 찾기</Link>
                        <Link to="#">비밀번호 찾기</Link>
                    </div>
                </form>

                {/* 회원가입 유도 */}
                <div className="suggest-join">
                    <li>아직 회원이 아니세요?</li>
                    <Link to="/join">회원가입</Link>
                </div>
            </div>
        </>
    );
};

export default LoginPage