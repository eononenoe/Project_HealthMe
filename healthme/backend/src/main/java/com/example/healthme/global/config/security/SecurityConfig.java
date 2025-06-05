package com.example.healthme.global.config.security;

import com.example.healthme.domain.user.repository.UserRepository;
import com.example.healthme.global.config.auth.handler.loginHandler.CustomLoginFailureHandler;
import com.example.healthme.global.config.auth.handler.loginHandler.CustomLoginSuccessHandler;
import com.example.healthme.global.config.auth.handler.logoutHandler.CustomLogoutHandler;
import com.example.healthme.global.config.auth.handler.logoutHandler.CustomLogoutSuccessHandler;
import com.example.healthme.global.config.auth.jwt.JwtAuthorizationFilter;
import com.example.healthme.global.config.auth.jwt.JwtTokenProvider;
import com.example.healthme.global.config.auth.principal.PrincipalDetailsOAuth2Service;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomLoginFailureHandler customLoginFailureHandler;
    private final CustomLoginSuccessHandler customLoginSuccessHandler;
    private final CustomLogoutHandler customLogoutHandler;
    private final CustomLogoutSuccessHandler customLogoutSuccessHandler;

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PrincipalDetailsOAuth2Service principalDetailsOAuth2Service;

    @Bean
    protected SecurityFilterChain configure(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/",
                                "/healthme/users/join",
                                "/healthme/users/check",
                                "/healthme/users/login",
                                "/healthme/sms/**",
                                "/healthme/survey",
                                "healthme/products", // 정현 임시 ㅣ 상품 목록
                                "/healthme/products/**", // 정현 임시 ㅣ 상품 상세
                                "/healthme/products/details", // 정현 임시 ㅣ 상세 nutrient 포함
                                "/healthme/nutrients/**" // 정현 임시 ㅣ 영양성분 API
                        ).permitAll()
                        .requestMatchers("/user").hasRole("USER")
                        .requestMatchers("/admin").hasRole("ADMIN")
                        .anyRequest().authenticated()
                )


                // 정현 임시 🔒 formLogin 제거하여 리다이렉션 방지
                .formLogin(form -> form.disable())

                .logout(logout -> logout
                        .logoutUrl("/healthme/users/logout")
                        .permitAll()
                        .addLogoutHandler(customLogoutHandler)
                        .logoutSuccessHandler(customLogoutSuccessHandler)
                )

                .oauth2Login(oauth -> oauth
                        .loginPage("/login") // 정현 임시 ㅣ OAuth2 login URL
                        .userInfoEndpoint(user -> user
                                .userService(principalDetailsOAuth2Service)
                        )
                        .successHandler(customLoginSuccessHandler)
                );

        // 정현 임시 🔑 JWT 필터 등록
        http.addFilterBefore(
                new JwtAuthorizationFilter(userRepository, jwtTokenProvider),
                org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class
        );

        return http.build();
    }

    // 정현 임시 🌐 CORS 허용 설정
    @Bean
    public CorsConfigurationSource customCorsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:3000")); // 정현 임시 ㅣ React 개발 서버
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
