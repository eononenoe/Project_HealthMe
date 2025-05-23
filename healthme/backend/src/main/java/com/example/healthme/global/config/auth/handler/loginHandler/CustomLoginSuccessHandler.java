package com.example.healthme.global.config.auth.handler.loginHandler;

import com.example.healthme.domain.user.dto.UserDto;
import com.example.healthme.global.config.auth.jwt.JwtProperties;
import com.example.healthme.global.config.auth.jwt.JwtTokenProvider;
import com.example.healthme.global.config.auth.jwt.TokenInfo;
import com.example.healthme.global.config.auth.principal.PrincipalDetails;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;

@Slf4j
@Component
@RequiredArgsConstructor
public class CustomLoginSuccessHandler implements AuthenticationSuccessHandler {

	private final JwtTokenProvider jwtTokenProvider;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException{

		log.info("로그인 성공, JWT 발급 시작");

		// 토큰 생성
		TokenInfo tokenInfo = jwtTokenProvider.generateToken(authentication);

		// 로그인 사용자 정보
		PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
		UserDto userDto = principalDetails.getUserDto();

		// userDto >> JSON
		ObjectMapper objectMapper = new ObjectMapper();
		String loginUserJson = objectMapper.writeValueAsString(userDto);
		String encodedLoginUser = URLEncoder.encode(loginUserJson, "UTF-8");

		//TOKEN 쿠키에 담아 전송
		Cookie cookie = new Cookie(JwtProperties.ACCESS_TOKEN_COOKIE_NAME,tokenInfo.getAccessToken());
		cookie.setHttpOnly(true); // JS에서 접근 못 하도록
		cookie.setSecure(false);  // HTTPS일 경우 true, 개발 중엔 false
		cookie.setPath("/");
		cookie.setMaxAge(JwtProperties.ACCESS_TOKEN_EXPIRATION_TIME / 1000);
		response.addCookie(cookie);

		// 프론트에 전달할 URL
		String redirectUrl = "http://localhost:3000/oauth2/redirect"
				+ "?accessToken=" + tokenInfo.getAccessToken()
				+ "&refreshToken=" + tokenInfo.getRefreshToken()
				+ "&loginUser=" + encodedLoginUser;

		response.sendRedirect(redirectUrl);

	}

}
