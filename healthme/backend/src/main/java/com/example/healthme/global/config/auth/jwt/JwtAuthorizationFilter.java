package com.example.healthme.global.config.auth.jwt;


import com.example.healthme.domain.user.entity.User;
import com.example.healthme.domain.user.repository.UserRepository;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

//JWT 인증 필터
//매 요청마다 실행되며, 쿠키에 담긴 JWT 토큰이 유효하면 SecurityContext에 인증 정보 저장
@Slf4j
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;

    public JwtAuthorizationFilter(
            UserRepository userRepository,
            JwtTokenProvider jwtTokenProvider
    ) {
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain
    ) throws ServletException, IOException {
        String uri = request.getRequestURI();
        log.debug("요청 URI: " + uri);

//        전정현 임시
        if (uri.contains("/healthme/products")) {
            chain.doFilter(request, response);
            return;
        }

        String token = null;
        try {
            if (request.getCookies() != null) {
                token = Arrays.stream(request.getCookies())
                        .filter(cookie -> cookie.getName().equals(JwtProperties.ACCESS_TOKEN_COOKIE_NAME))
                        .findFirst()
                        .map(Cookie::getValue)
                        .orElse(null);
            }
        } catch (Exception e) {
            log.warn("쿠키에서 토큰 추출 중 예외 발생", e);
        }

        if (token != null) {
            try {
                if (jwtTokenProvider.validateToken(token)) {
                    Authentication authentication = getUsernamePasswordAuthenticationToken(token);
                    if (authentication != null) {
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                        log.debug("인증 성공: {}", authentication.getName());
                    }
                }
            } catch (ExpiredJwtException e)     //토큰만료시 예외처리(쿠키 제거)
            {
                log.warn("만료된 토큰 감지: {}", e.getMessage());
                // 만료된 토큰 쿠키 제거
                Cookie expiredCookie = new Cookie(JwtProperties.ACCESS_TOKEN_COOKIE_NAME, null);
                expiredCookie.setMaxAge(0);
                expiredCookie.setPath("/");
                response.addCookie(expiredCookie);
            } catch (Exception e2) {
                log.error("JWT 인증 필터 처리 중 예외 발생", e2);
            }
        }
        chain.doFilter(request, response);
    }

    // 토큰에서 인증 객체를 추출하고, DB에 존재하는 유저인지 확인 후 반환
    private Authentication getUsernamePasswordAuthenticationToken(String token) {
        Authentication authentication = jwtTokenProvider.getAuthentication(token);
        Optional<User> user = userRepository.findByUserid(authentication.getName());

        if (user.isPresent()) {
            return authentication;
        }

        log.warn("인증 실패: 유저 정보 없음 (userid = {})", authentication.getName());
        return null; // 유저가 없으면 NULL
    }


}