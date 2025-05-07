<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>



    <!-- 로그인 css -->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/common/common.css">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/css/login/login.css">
    <!-- js -->
    <script src="${pageContext.request.contextPath}/js/by.js"></script>
     <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>

<body>
    <div id="header"></div>
    <div class="login_box">
        <form action="/login" method="post">
            <div class="box1">
                <h2> 로그인</h2>
                <!-- 이메일 입력 -->
                <input type="text" name="userid" class="custom-input" placeholder="아이디 또는 이메일" id="userid">
                <!-- 비밀번호 입력 -->
                <input type="password" name="password" class="custom-input" placeholder="비밀번호" id="password">
                <!-- 로그인유지 체크박스 -->
                <div class="cb">
                    <input type="checkbox" id="login">
                    <label for="login">로그인 상태 유지</label>
                </div>
                <!-- 로그인 -->
                <div class="row mt-4">
                    <div class="col">
                        <button type="submit" class="btn1 btn-custom">로그인</button>
                    </div>
                </div>
                <div class="line">
                    <hr><span>또는</span>
                    <hr>
                </div>
                <!-- 구글로 로그인 -->
                <div class="row">
                    <div class="col">
                        <button type="button" class="btn2 btn-custom">
                            <img src="/img/google.png" alt="카카오" class="logo_google">구글로 로그인</button>
                    </div>
                </div>
                <!-- 카카오로 로그인 -->
                <div class="row">
                    <div class="col">
                        <button type="button" class="btn3 btn-custom">
                            <img src="/img/kakao.png" alt="네이버" class="logo_kakao">카카오로 로그인</button>
                    </div>
                </div>
            </div>
            <div class="hypertext">
                <a href="">아이디 찾기</a>
                <a href="">비밀번호 찾기</a>
            </div>
        </form>
        <div class="suggest-join">
            <li>아직 회원이 아니세요?</li>
            <a href="/join">회원가입</a>
        </div>
    </div>
    <div id="footer"></div>
</body>

</html>