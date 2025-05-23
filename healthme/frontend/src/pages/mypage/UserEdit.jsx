import axios from "axios";
import React, { useEffect, useState } from "react";

export default function UserEdit() {
  const [user, setUser] = useState();

  const userinfo = async () => {
    const loginUser = JSON.parse(localStorage.getItem("loginUser"));
    const token = localStorage.getItem("accessToken");
    console.log("loginUser", loginUser);
    if (loginUser !== null) {
      const getuser = await axios.get("/mypage/getuserinfo", {
        params: { id: loginUser.id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("getuser", getuser);

      if (getuser !== null) {
        setUser(getuser.data);
      } else {
        console.log("불러오지 못했습니다.");
      }
    }
  };
  useEffect(() => {
    userinfo(); // 회원 전체 목록 가져오기
  }, []);

  if (!user) {
    return <h2>잠시만 기다려주세요.</h2>;
  }
  return (
    <>
      <div className="user-box">
        <div className="user-top">
          <div>🌱 강강강</div>
          <form action="javascript:void(0)" method="post">
            <button type="submit" className="logout-button">
              로그아웃
            </button>
          </form>
        </div>
        <div className="delivery-status-summary">
          📦 현재 배송 상태: <span className="badge">2 / 3건 배송 완료</span>
        </div>
        <div className="delivery-detail-button">
          <button>배송 상세보기</button>
        </div>
      </div>

      <div className="form-box">
        <h2>회원 정보 수정</h2>
        <form action="/join/update" method="post" className="profile-edit-form">
          <div className="input-row">
            {/* 여기서 부터 내용 시작 */}
            <label>아이디</label>
            <input type="text" name="userid" value={user.userid} readOnly />
          </div>

          <div className="input-row">
            <label>현재 비밀번호</label>
            <input
              type="password"
              name="currentPassword"
              placeholder="비밀번호를 입력해 주세요"
            />
          </div>

          <div className="input-row">
            <label>새 비밀번호</label>
            <input
              type="password"
              name="newPassword"
              placeholder="새 비밀번호를 입력해 주세요"
            />
          </div>

          <div className="input-row">
            <label>이름</label>
            <input type="text" name="username" value={user.username} />
          </div>

          <div className="input-row">
            <label>휴대폰</label>
            <div className="phone-box">
              <select
                name="tel1"
                className="form-control custom-input"
                id="tel1"
              >
                <option value="010" selected={"${user.tel1}" === "010"}>
                  010
                </option>
                <option value="011" selected={"${user.tel1}" === "011"}>
                  011
                </option>
              </select>
              <span className="tel-hypen">-</span>
              <input
                type="text"
                name="tel2"
                value={user.tel.substring(4, 8)}
                className="form-control custom-input"
                id="tel2"
              />
              <span className="tel-hypen">-</span>
              <input
                type="text"
                name="tel3"
                value={user.tel.substring(9, 13)}
                className="form-control custom-input"
                id="tel3"
              />
              <button type="button" className="verify-btn">
                인증
              </button>
            </div>
          </div>

          <div className="input-row">
            <label>선택약간동의</label>
            <div className="terms-box">
              <input type="checkbox" name="termsAgree" /> 개인정보 수집·이용
              동의(선택)
              <a href="/terms" target="_blank">
                약관보기
              </a>
            </div>
          </div>
          <div className="button-group">
            <button type="submit" className="submit-btn">
              수정하기
            </button>
          </div>
        </form>

        <form action="">
          <input type="hidden" name="userid" value={"${user.name}"} />
          <div className="button-group">
            <button type="submit" className="withrdraw-btn">
              탈퇴하기
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
