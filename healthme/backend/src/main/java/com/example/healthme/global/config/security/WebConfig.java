    package com.example.healthme.global.config.security;

    import org.springframework.context.annotation.Bean;
    import org.springframework.context.annotation.Configuration;
    import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
    import org.springframework.security.crypto.password.PasswordEncoder;
    import org.springframework.web.servlet.config.annotation.CorsRegistry;
    import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

    @Configuration
    public class WebConfig {
        @Bean
        public WebMvcConfigurer corsConfigurer() {
            return new WebMvcConfigurer() {
                @Override
                public void addCorsMappings(CorsRegistry registry) {
                    registry.addMapping("/**")  // 모든 요청에 대해
                            .allowedOrigins("http://localhost:3000")  // React 개발서버 주소
                            .allowedMethods("GET", "POST", "PUT", "DELETE")
                            .allowedHeaders("*")
                            .allowCredentials(false);

                }
            };
        }
        @Bean
        public PasswordEncoder passwordEncoder() {
            return new BCryptPasswordEncoder();
        }

    }
