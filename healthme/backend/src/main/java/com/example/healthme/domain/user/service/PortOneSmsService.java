package com.example.healthme.domain.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class PortOneSmsService {

    @Value("${portone.api.key}")
    private String apiKey;

    @Value("${portone.api.secret}")
    private String apiSecret;

    @Value("${portone.sms.sender}")
    private String sender;

    private final Map<String, String> verificationMap = new ConcurrentHashMap<>();

    // 포트원 토큰 발급
    public String getToken() {
        RestTemplate rt = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        Map<String, String> body = Map.of("imp_key", apiKey, "imp_secret", apiSecret);
        HttpEntity<?> entity = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = rt.postForEntity("https://api.iamport.kr/users/getToken", entity, Map.class);
        Map responseBody = (Map) response.getBody().get("response");
        return (String) responseBody.get("access_token");
    }
    public Map<String, Object> verifyDanalIdentity(String impUid) {
        String token = getToken(); // 위에서 구현한 getToken() 재사용

        RestTemplate rt = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<?> request = new HttpEntity<>(headers);

        // imp_uid로 본인인증 정보 조회
        ResponseEntity<Map> response = rt.exchange(
                "https://api.iamport.kr/certifications/" + impUid,
                org.springframework.http.HttpMethod.GET,
                request,
                Map.class
        );

        // 예외처리 생략: response.getStatusCode() 체크 권장
        Map body = (Map) response.getBody().get("response");
        return body;
    }
}