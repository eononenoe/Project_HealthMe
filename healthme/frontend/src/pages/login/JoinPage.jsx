import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'static/css/login/join.css';

const JoinPage = () => {
    // 백엔드에서 값 가져오게
    const [formData, setFormData] = useState({
        userid: '',
        password: '',
        password2: '',
        username: '',
        zip: '',
        address: '',
        addressDetail: '',
        gender: '',
        tel1: '010',
        tel2: '',
        tel3: '',
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = () => {
        axios.post('/healthme/users/join', formData)
            .then((res) => {
                alert(res.data.message);
                // 회원가입 성공하면 로그인 화면으로
                navigate('/login');
            })
            .catch((err) => {
                console.log(err.response);
                const error = err.response?.data?.error;
                if (!error) {
                    alert('회원가입 실패 (서버 오류)');
                    return;
                }

                const newErrors = {};

                if (error.includes('아이디')) newErrors.userid = error;
                if (error.includes('비밀번호') && error.includes('일치')) newErrors.password2 = error;
                if (error.includes('비밀번호') && !error.includes('일치')) newErrors.password = error;
                if (error.includes('이름')) newErrors.username = error;
                if (error.includes('우편번호')) newErrors.zip = error;
                if (error.includes('주소') && !error.includes('상세')) newErrors.address = error;
                if (error.includes('상세주소')) newErrors.addressDetail = error;
                if (error.includes('전화번호')) {
                    newErrors.tel1 = error;
                    newErrors.tel2 = error;
                    newErrors.tel3 = error;
                }

                setErrors(newErrors);
            });
    };

    // 아이디 중복확인 버튼
    const handleUseridCheck = () => {
        axios.get(`http://localhost:8090/healthme/users/check`, {
            params: { userid: formData.userid }
        })
            .then((res) => {
                if (res.data.exists) {
                    alert('이미 사용 중인 아이디입니다');
                } else {
                    alert('사용 가능한 아이디입니다');
                }
            })
            .catch((err) => {
                console.error(err);
                alert('중복 확인 실패');
            });
    };

    // 우편번호 검색 버튼
    const handleAddressSearch = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                const fullAddress = data.address;      // 도로명 주소
                const zonecode = data.zonecode;        // 우편번호

                setFormData(prev => ({
                    ...prev,
                    zip: zonecode,
                    address: fullAddress,
                }));
            }
        }).open();
    };
    // 성별 선택
    const handleGenderSelect = (value) => {
        setFormData({ ...formData, gender: value });
    };
    // 휴대전화 인증번호 받기
    const [verificationCode, setVerificationCode] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [sentCode, setSentCode] = useState('');

    const handleSendTel = () => {
        const phoneNumber = `${formData.tel1}-${formData.tel2}-${formData.tel3}`;

        axios.post('/healthme/sms/send', { phoneNumber })
            .then(res => {
                alert('인증번호가 전송되었습니다.');
                setSentCode(res.data.code); // 연습용: 서버에서 받은 코드 저장
            })
            .catch(err => {
                alert('전송 실패');
                console.error(err);
            });
    };
    return (
        <div className="join_box">
            <div className="box1">
                <h2>회원가입</h2>

                {/* 아이디 */}
                <div className="input-wrapper">
                    <div className="id-box">
                        <input type="text" name="userid" className="join-custom-input" placeholder="아이디" value={formData.userid} onChange={handleChange} />
                        <button type="button" className="btn-small btn-main" onClick={handleUseridCheck}>중복확인</button>
                    </div>
                    {errors.userid && (<div className="error-message">{errors.userid}</div>)}
                </div>

                {/* 비밀번호 */}
                <div className="input-wrapper">
                    <input type="password" name="password" className="join-custom-input" placeholder="비밀번호" value={formData.password} onChange={handleChange} />
                    {errors.password && (<div className="error-message">{errors.password}</div>)}
                </div>

                {/* 비밀번호 확인 */}
                <div className="input-wrapper">
                    <input type="password" name="password2" className="join-custom-input" placeholder="비밀번호 재확인" value={formData.password2} onChange={handleChange} />
                    {errors.password2 && (<div className="error-message">{errors.password2}</div>)}
                </div>

                {/* 이름 */}
                <div className="input-wrapper">
                    <input type="text" name="username" className="join-custom-input" placeholder="이름" value={formData.username} onChange={handleChange} />
                    {errors.username && (<div className="error-message">{errors.username}</div>)}
                </div>

                {/* 우편번호 */}
                <div className="input-wrapper">
                    <div className="address-box">
                        <input type="text" name="zip" className="join-custom-input" placeholder="우편번호" value={formData.zip} onChange={handleChange} />
                        <button type="button" className="btn-small btn-main" onClick={handleAddressSearch}>우편번호 검색</button>
                    </div>
                    {errors.zip && (<div className="error-message">{errors.zip}</div>)}
                </div>

                {/* 주소 */}
                <div className="input-wrapper">
                    <input type="text" name="address" className="join-custom-input" placeholder="주소" value={formData.address} onChange={handleChange} />
                    {errors.address && (<div className="error-message">{errors.address}</div>)}
                </div>

                {/* 상세주소 */}
                <div className="input-wrapper">
                    <input type="text" name="addressDetail" className="join-custom-input" placeholder="상세주소" value={formData.addressDetail} onChange={handleChange} />
                    {errors.addressDetail && (<div className="error-message">{errors.addressDetail}</div>)}
                </div>

                {/* 성별 */}
                <div className="input-wrapper">
                    <h6>성별</h6>
                    <div className="gender-btn-group">
                        {['남자', '여자', '선택안함'].map((option) => (
                            <button
                                key={option}
                                type="button"
                                className={`btn-option ${formData.gender === option ? 'selected' : ''}`}
                                onClick={() => handleGenderSelect(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 전화번호 */}
                <h6>휴대전화</h6>
                <div className="input-wrapper">
                    <div className="tel">
                        <select name="tel1" className="join-custom-input tel1" value={formData.tel1} onChange={handleChange}>
                            <option value="010">010</option>
                            <option value="011">011</option>
                            <option value="012">012</option>
                        </select>
                        <span className="tel-hypen">-</span>
                        <input type="text" name="tel2" className="join-custom-input tel2" value={formData.tel2} onChange={handleChange} />
                        <span className="tel-hypen">-</span>
                        <input type="text" name="tel3" className="join-custom-input tel3" value={formData.tel3} onChange={handleChange} />
                        <button type="button" className="btn-main btn-small " onClick={handleSendTel}>인증하기</button>
                    </div>

                    {(errors.tel1 || errors.tel2 || errors.tel3) && (
                        <div className="error-message">
                            {errors.tel1 || errors.tel2 || errors.tel3}
                        </div>
                    )}
                </div>
                {/* 인증번호 입력 + 확인 */}
                {sentCode && (
                    <div className="input-wrapper">
                        <div className="tel">
                            <input
                                type="text"
                                className="join-custom-input"
                                placeholder="인증번호 입력"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                            />
                            <button
                                type="button"
                                className="btn-small btn-main"
                                onClick={() => {
                                    if (verificationCode === sentCode) {
                                        setIsVerified(true);
                                        alert('인증 완료');
                                    } else {
                                        alert('인증번호가 일치하지 않습니다');
                                    }
                                }}
                            >
                                인증 확인
                            </button>
                        </div>
                        <div className={`error-message ${isVerified ? 'verified-message' : ''}`}>
                            {isVerified ? '인증되었습니다' : '\u00A0'}
                        </div>
                    </div>
                )}
                <button type="button" className="btn-big btn-main" onClick={handleSubmit}>회원가입</button>

                <div className="suggest-login">
                    <li>아이디가 이미 있으신가요?</li>
                    <Link to="/login">로그인</Link>
                </div>
            </div>
        </div >
    );
};

export default JoinPage;