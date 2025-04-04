<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ page import="java.sql.*"%>

<%
// 폼에서 보낸 값들을 받는다
String id = request.getParameter("userid");
String pw = request.getParameter("userpw");

// DB 연결용 변수
Connection conn = null;
PreparedStatement pstmt = null;
ResultSet rs = null;

try {
	// 드라이버 로드
	Class.forName("oracle.jdbc.driver.OracleDriver");
	// DB 연결 >> 내 정보를 입력함
	conn = DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:xe", "system", "1234");

	String sql = "SELECT * FROM HealthMe_Login WHERE ID = ? AND PW = ?";


} catch (Exception e) {
	e.printStackTrace();
}
%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

</body>
</html>