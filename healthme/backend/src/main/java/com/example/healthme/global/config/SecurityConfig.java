package com.example.healthme.global.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    // 비밀번호 암호화

//    private final CustomLoginFailureHandler customLoginFailureHandler;
//    private final CustomLoginSuccessHandler customLoginSuccessHandler;
//    private final CustomLogoutHandler customLogoutHandler;
//    private final CustomLogoutSuccessHandler customLogoutSuccessHandler;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    protected SecurityFilterChain configure(HttpSecurity httpSecurity) throws Exception {
        // 페이지 권한부여
        httpSecurity
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests((auth) -> {
                    auth.requestMatchers("/", "/healthme/users/join", "/healthme/users/check", "/healthme/users/login").permitAll();
                    // 역할이 있을때 추가/수정 (임시)
                    auth.requestMatchers("/user").hasRole("USER");
                    auth.requestMatchers("/admin").hasRole("ADMIN");
                    auth.anyRequest().authenticated();
                });
//        // 로그인
//        httpSecurity.formLogin((login) -> {
//            login.permitAll();
//            login.successHandler(customLoginSuccessHandler);
//            login.failureHandler(customLoginFailureHandler);
//        });
//
//        // 로그아웃
//        httpSecurity.logout((logout) -> {
//            logout.permitAll();
//            logout.addLogoutHandler(customLogoutHandler);
//            logout.logoutSuccessHandler(customLogoutSuccessHandler);
//        });


        return httpSecurity.build();
    }

}
