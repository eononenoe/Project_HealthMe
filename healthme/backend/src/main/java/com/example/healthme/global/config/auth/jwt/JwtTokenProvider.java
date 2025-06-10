package com.example.healthme.global.config.auth.jwt;

import com.example.healthme.domain.user.dto.UserDto;
import com.example.healthme.domain.user.entity.User;
import com.example.healthme.global.config.auth.principal.PrincipalDetails;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
@Slf4j
@Component
public class JwtTokenProvider {

    private final Key key;

    public JwtTokenProvider(@Value("${jwt.secret}") String secret) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public TokenInfo generateToken(Authentication authentication) {
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        Long userId = principal.getUserDto().getId();
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
        long now = System.currentTimeMillis();

        Date accessTokenExpiresIn = new Date(now + JwtProperties.ACCESS_TOKEN_EXPIRATION_TIME);
        String accessToken = Jwts.builder()
                .setSubject(authentication.getName())
                .claim("id", userId)
                .claim("username", authentication.getName())
                .claim("auth", authorities)
                .setExpiration(accessTokenExpiresIn)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();

        // ✅ 수정됨: subject 포함
        String refreshToken = Jwts.builder()
                .setSubject(authentication.getName()) // 필수!
                .setExpiration(new Date(now + JwtProperties.REFRESH_TOKEN_EXPIRATION_TIME))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();

        log.debug("generateToken.accessToken : {}", accessToken);
        log.debug("generateToken.refreshToken : {}", refreshToken);

        return TokenInfo.builder()
                .grantType("Bearer")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    public Authentication getAuthentication(String accessToken) {
        Claims claims = parseClaims(accessToken);

        if (claims.get("auth") == null) {
            throw new RuntimeException("권한 정보가 없는 토큰입니다.");
        }

        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get("auth").toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        String username = claims.getSubject();
        Long id = claims.get("id", Integer.class).longValue();

        PrincipalDetails principal = new PrincipalDetails(UserDto.builder()
                .id(id)
                .userid(username)
                .role(authorities.stream().findFirst().get().getAuthority())
                .build());

        log.info("getAuthentication UsernamePasswordAuthenticationToken : {}", accessToken);

        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }

    private Claims parseClaims(String token) {
        try {
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (SecurityException | MalformedJwtException e) {
            log.info("Invalid JWT Token", e);
        } catch (UnsupportedJwtException e) {
            log.info("Unsupported JWT Token", e);
        } catch (IllegalArgumentException e) {
            log.info("JWT claims string is empty.", e);
        }
        return false;
    }

    // ✅ 추가: RefreshToken에서 username 추출
    public String getUsernameFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // ✅ 추가: User → Authentication 변환
    public Authentication getAuthenticationByUser(User user) {
        String role = user.getRole();

        Collection<? extends GrantedAuthority> authorities =
                List.of(new SimpleGrantedAuthority(role));

        PrincipalDetails principal = new PrincipalDetails(UserDto.builder()
                .id(user.getId())
                .userid(user.getUserid())
                .role(role)
                .build());

        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }
    public String createAccessToken(User user) {
        long now = System.currentTimeMillis();

        Date accessTokenExpiresIn = new Date(now + JwtProperties.ACCESS_TOKEN_EXPIRATION_TIME);

        return Jwts.builder()
                .setSubject(user.getUserid())  // username 또는 userid
                .claim("id", user.getId())
                .claim("username", user.getUserid())
                .claim("auth", user.getRole())  // ex: ROLE_USER
                .setExpiration(accessTokenExpiresIn)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }
    public Key getKey() {
        return this.key;
    }
}
