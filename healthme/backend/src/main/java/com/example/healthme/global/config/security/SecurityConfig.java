package com.example.healthme.global.config.security;

import com.example.healthme.domain.user.repository.UserRepository;
import com.example.healthme.global.config.auth.handler.loginHandler.CustomLoginFailureHandler;
import com.example.healthme.global.config.auth.handler.loginHandler.CustomLoginSuccessHandler;
import com.example.healthme.global.config.auth.handler.logoutHandler.CustomLogoutHandler;
import com.example.healthme.global.config.auth.handler.logoutHandler.CustomLogoutSuccessHandler;
import com.example.healthme.global.config.auth.jwt.JwtAuthorizationFilter;
import com.example.healthme.global.config.auth.jwt.JwtTokenProvider;
import com.example.healthme.global.config.auth.principal.PrincipalDetailsOAuth2Service;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    // 비밀번호 암호화

    private final CustomLoginFailureHandler customLoginFailureHandler;
    private final CustomLoginSuccessHandler customLoginSuccessHandler;
    private final CustomLogoutHandler customLogoutHandler;
    private final CustomLogoutSuccessHandler customLogoutSuccessHandler;

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PrincipalDetailsOAuth2Service principalDetailsOAuth2Service;



    @Bean
    protected SecurityFilterChain configure(HttpSecurity http) throws Exception {
        // 페이지 권한부여
        http
                .cors(Customizer.withDefaults()) // CORS 활성화
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests((auth) -> {
                    auth.requestMatchers("/", "/healthme/users/join", "/healthme/users/check", "/healthme/users/login").permitAll();
                    // 역할이 있을때 추가/수정 (임시)
                    auth.requestMatchers("/user").hasRole("USER");
                    auth.requestMatchers("/admin").hasRole("ADMIN");
                    auth.anyRequest().authenticated();
                })
                .exceptionHandling(ex -> ex.authenticationEntryPoint(
                        (request, response, authException) -> response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized")
                )); //401 Unauthorized 응답
        // 로그인
        http.formLogin((login) -> {
            login.permitAll();
            login.successHandler(customLoginSuccessHandler);
            login.failureHandler(customLoginFailureHandler);
        });

        // 로그아웃
        http.logout((logout) -> {
            logout
                    .logoutUrl("/healthme/users/logout")
                    .permitAll()
                    .addLogoutHandler(customLogoutHandler)
                    .logoutSuccessHandler(customLogoutSuccessHandler);
        });

        // OAuth2
        http.oauth2Login(oauth -> oauth
                .loginPage("/login") // 사용자 정의 로그인 페이지
                .userInfoEndpoint(user -> user
                        .userService(principalDetailsOAuth2Service)
                )
                .successHandler(customLoginSuccessHandler)
        );
        // JWT 인증 필터 등록
        http.addFilterBefore(
                new JwtAuthorizationFilter(userRepository, jwtTokenProvider),
                org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class
        );
        return http.build();
    }

}
