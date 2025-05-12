<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>회원가입</title>

    <!-- 회원가입 css -->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/common/common.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/login/join.css">

    <!-- JS -->
    <script src="${pageContext.request.contextPath}/js/by.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>

<body>
    <div id="header"></div>
    <form action="/join" method="post">
    <div class="join_box">
        <div class="box1">
            <h2>회원가입</h2>
            <!-- 아이디 -->
            <div class="id-box">
                <input type="text" name="userid" class="custom-input" placeholder="아이디" id="userid">
                <button class="btn-small btn-main">중복확인</button>
            </div>
            <c:if test="${not empty errors['userid']}">
                <div class="error-msg">${errors['userid']}</div>
            </c:if>
            <!-- 비밀번호 -->
            <input type="password" name="password" class="custom-input" placeholder="비밀번호" id="password">
            <c:if test="${not empty errors['password']}">
                <div class="error-msg">${errors['password']}</div>
            </c:if>
            <!-- 비밀번호 재확인 -->
            <input type="password" name="repassword" class="custom-input" placeholder="비밀번호 재확인" id="repassword">
            <!-- 이름 -->
            <input type="text" name="name" class="custom-input" placeholder="이름" id="name">
            <c:if test="${not empty errors['name']}">
                <div class="error-msg">${errors['name']}</div>
            </c:if>
            <!-- 주소 -->
            <div class="address-box">
                <input type="text" name="zip" class="form-control custom-input" placeholder="우편번호" id="zip">
                <button type="button" class="btn-small btn-main">우편번호 검색</button>
            </div>
            <c:if test="${not empty errors['zip']}">
                <div class="error-msg">${errors['zip']}</div>
            </c:if>
            <!-- 상세주소 -->
            <div class="address">
                <input type="text" name="addr" class="form-control custom-input" placeholder="상세 주소" id="addr">
            </div>
            <c:if test="${not empty errors['addr']}">
                <div class="error-msg">${errors['addr']}</div>
            </c:if>
            <!-- 휴대전화 -->
            <h6>휴대전화</h6>
            <div class="tel">
                <select name="tel1" class="form-control custom-input" id="tel1">
                    <option value="010">010</option>
                    <option value="011">011</option>
                    <option value="012">012</option>
                </select>
                <span class="tel-hypen">-</span>
                <input type="text" name="tel2" class="form-control custom-input" id="tel2">

                <span class="tel-hypen">-</span>
                <input type="text" name="tel3" class="form-control custom-input" id="tel3">
                <button type="button" class="btn-small btn-main">인증번호 받기</button>

            </div>
            <c:if test="${not empty errors['tel2']}">
                                                <div class="error-msg">${errors['tel2']}</div>
                                            </c:if>
                            <c:if test="${not empty errors['tel3']}">
                                <div class="error-msg">${errors['tel3']}</div>
                            </c:if>
            <!-- 회원가입 버튼 -->
            <button type="submit" class="btn-big btn-main">회원가입</button>

            <div class="suggest-login">
                <p>아이디가 이미 있으신가요?</p>
                <a href="/login">로그인</a>
            </div>
        </div>
    </div>
    </form>
    <div id="footer"></div>
</body>

</html>
