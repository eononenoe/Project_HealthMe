import axios from "axios";
import React, { useEffect, useState } from "react";
import AddressEditPage from "./AddressEditPage";

export default function UserEdit() {
  const [form, setForm] = useState({
    userid: "",
    password: "",
    username: "",
    tel1: "",
    tel2: "",
    tel3: "",
  });
  const [password, setPassword] = useState();
  const [update, setUpdate] = useState(false);

  const loginUser = JSON.parse(localStorage.getItem("loginUser"));

  // 회원 정보 수정 페이지 들어가면 바로 실행
  const userinfo = async () => {
    console.log("loginUser", loginUser);
    if (loginUser !== null) {
      const getuser = await axios.get("/mypage/getuserinfo", {
        params: { id: loginUser.id },
        withCredentials: true,
      });

      console.log("getuser", getuser);

      // 백엔드에서 잘 가져오면
      if (getuser !== null) {
        setForm({
          ...getuser.data,
          tel1: getuser.data.tel.substring(0, 3),
          tel2: getuser.data.tel.substring(4, 8),
          tel3: getuser.data.tel.substring(9, 13),
        });
      } else {
        console.log("불러오지 못했습니다.");
      }
    }
  };

  // input창 정보 수정 이벤트
  const updateHandler = (e) => {
    console.log(e.target.value);

    const name = e.target.name;
    const value = e.target.value;
    setForm((prevform) => ({
      // prevform은 가장 최신의 상태값이다.
      ...prevform,
      [name]: value, //form을 수정한 내용으로 변경.
      // 객체에서 key자리에 변수를 사용할려면 []
    }));
  };

  const checkpasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  // 수정 버튼 클릭하면 실행
  const userAlter = async () => {
    const formData = new FormData();
    formData.append("userid", form.userid);
    formData.append("password", form.password);
    formData.append("username", form.username);
    formData.append("phone", form.tel1 + "-" + form.tel2 + "-" + form.tel3);
    if (form.password !== password) {
      window.alert("비밀번호가 틀렸습니다.");
      return;
    } else {
      try {
        await axios.post(`/mypage/user/update?id=${form.id}`, formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        window.alert("수정에 성공했습니다.");
        setUpdate((prev) => !prev);
      } catch (error) {
        window.alert("수정에 실패했습니다.");
      }
    }
  };

  useEffect(() => {
    userinfo(); // 회원 전체 목록 가져오기
  }, [update]);

  if (!form) {
    //
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
        <form className="profile-edit-form">
          <div className="input-row">
            {/* 여기서 부터 내용 시작 */}
            <label>아이디</label>
            <input type="text" name="userid" value={form.userid} readOnly />
          </div>

          <div className="input-row">
            <label>새 비밀번호</label>
            <input
              type="password"
              name="password"
              placeholder="새 비밀번호를 입력해 주세요"
              onChange={updateHandler}
            />
          </div>

          <div className="input-row">
            <label>비밀번호 재확인</label>
            <input
              type="password"
              name="checkPassword"
              placeholder="한번 더 입력해주세요."
              onChange={checkpasswordHandler}
            />
          </div>

          <div className="input-row">
            <label>이름</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={updateHandler}
            />
          </div>

          <div className="input-row">
            <label>휴대폰</label>
            <div className="phone-box">
              <select
                name="tel1"
                className="form-control custom-input"
                id="tel1"
                value={form.tel1}
                onChange={updateHandler}
              >
                <option value="">선택</option>
                <option value="010">010</option>
                <option value="011">011</option>
              </select>
              <span className="tel-hypen">-</span>
              <input
                type="text"
                name="tel2"
                value={form.tel2}
                className="form-control custom-input"
                id="tel2"
                onChange={updateHandler}
              />
              <span className="tel-hypen">-</span>
              <input
                type="text"
                name="tel3"
                value={form.tel3}
                className="form-control custom-input"
                id="tel3"
                onChange={updateHandler}
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
            <button type="submit" className="submit-btn" onClick={userAlter}>
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
