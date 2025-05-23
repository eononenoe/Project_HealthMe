package com.example.healthme.global.config.auth.handler.loginHandler;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@Slf4j
public class CustomLoginFailureHandler implements AuthenticationFailureHandler {

	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
                                        AuthenticationException exception) throws IOException{

		log.error("로그인 실패: {}", exception.getMessage()) ;

		// 보안상 메시지를 직접 노출하지 않고 고정된 파라미터 값 전달
		response.sendRedirect(request.getContextPath() + "/login?error=invalid");
	}



}
