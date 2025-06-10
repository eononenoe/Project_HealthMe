package com.example.healthme.global.config.auth.jwt;

import com.example.healthme.domain.user.entity.User;
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
import com.example.healthme.domain.user.repository.UserRepository;


import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;

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
        log.info("JwtAuthorizationFilter - 요청 URI: {}", uri); // 로그 찍기
        if (
                uri.startsWith("/healthme/users/find-username") ||
                        uri.startsWith("/healthme/users/reset-password") ||
                        uri.startsWith("/healthme/users/join") ||
                        uri.startsWith("/healthme/users/check") ||
                        uri.startsWith("/healthme/users/login")
        ) {
            chain.doFilter(request, response);
            return;
        }

        String token = null;

        try {
            if (request.getCookies() != null) {
                token = Arrays.stream(request.getCookies())
                        .filter(cookie -> JwtProperties.ACCESS_TOKEN_COOKIE_NAME.equals(cookie.getName()))
                        .map(Cookie::getValue)
                        .findFirst()
                        .orElse(null);
            }
        } catch (Exception ignored) {
        }

        if (token != null) {
            try {
                if (jwtTokenProvider.validateToken(token)) {
                    Authentication authentication = getUsernamePasswordAuthenticationToken(token);
                    if (authentication != null) {
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                        log.info("AccessToken 인증 성공: {}", authentication.getName());
                    }
                }
            } catch (ExpiredJwtException e) {
                log.warn("만료된 AccessToken: {}", e.getMessage());

                // accessToken 쿠키 제거
                Cookie expiredAccessToken = new Cookie(JwtProperties.ACCESS_TOKEN_COOKIE_NAME, null);
                expiredAccessToken.setMaxAge(0);
                expiredAccessToken.setPath("/");
                response.addCookie(expiredAccessToken);

                // refreshToken 확인
                String refreshToken = null;
                if (request.getCookies() != null) {
                    refreshToken = Arrays.stream(request.getCookies())
                            .filter(cookie -> JwtProperties.REFRESH_TOKEN_COOKIE_NAME.equals(cookie.getName()))
                            .map(Cookie::getValue)
                            .findFirst()
                            .orElse(null);
                }

                if (refreshToken != null) {
                    try {
                        if (jwtTokenProvider.validateToken(refreshToken)) {
                            // 🔽 핵심 변경: auth 없는 refreshToken은 username만 추출
                            String username = jwtTokenProvider.getUsernameFromToken(refreshToken);

                            User user = userRepository.findByUserid(username)
                                    .orElseThrow(() -> new RuntimeException("유저 없음"));

                            String newAccessToken = jwtTokenProvider.createAccessToken(user);
                            Cookie newAccessCookie = new Cookie(JwtProperties.ACCESS_TOKEN_COOKIE_NAME, newAccessToken);
                            newAccessCookie.setHttpOnly(true);
                            newAccessCookie.setMaxAge(JwtProperties.ACCESS_TOKEN_EXPIRATION_TIME / 1000);
                            newAccessCookie.setPath("/");
                            response.addCookie(newAccessCookie);

                            Authentication authentication = jwtTokenProvider.getAuthentication(newAccessToken);
                            SecurityContextHolder.getContext().setAuthentication(authentication);
                            log.info("AccessToken 재발급 완료 (username: {})", username);
                        }
                    } catch (ExpiredJwtException refreshEx) {
                        log.warn("RefreshToken도 만료됨: {}", refreshEx.getMessage());

                        // RefreshToken 쿠키 제거
                        Cookie expiredRefreshToken = new Cookie(JwtProperties.REFRESH_TOKEN_COOKIE_NAME, null);
                        expiredRefreshToken.setMaxAge(0);
                        expiredRefreshToken.setPath("/");
                        response.addCookie(expiredRefreshToken);
                    }
                }
            } catch (Exception e2) {
                log.error("JWT 처리 중 예외 발생", e2);
            }
        }

        // 항상 필터 체인 계속 실행
        chain.doFilter(request, response);
    }

    private Authentication getUsernamePasswordAuthenticationToken(String token) {
        Authentication authentication = jwtTokenProvider.getAuthentication(token);
        Optional<User> user = userRepository.findByUserid(authentication.getName());

        if (user.isPresent()) {
            return authentication;
        }

        log.warn("인증 실패: 유저 정보 없음 (userid = {})", authentication.getName());
        return null;
    }
}
