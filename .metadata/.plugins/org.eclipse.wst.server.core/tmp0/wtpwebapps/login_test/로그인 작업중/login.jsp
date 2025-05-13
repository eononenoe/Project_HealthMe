<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="login.*,java.sql.*"%>

<%
	
	String userid = request.getParameter("userid");
	String userpw = request.getParameter("userpw");

	
	UserDto userdto = new UserDto(userid,userpw);
	
	
	// insert
	

	int result = login_DB.getInstance().insert(userdto);
	
	if(result>=1){
		response.sendRedirect(request.getContextPath()+"/index.html");
		
	}else{
		response.sendRedirect(request.getContextPath()+"/login.html");
	}
%>