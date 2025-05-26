package com.example.healthme.domain.user.controller;

import com.example.healthme.domain.user.service.PortOneSmsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/healthme/sms")
@RequiredArgsConstructor
public class SmsController {

    private final PortOneSmsService smsService;

    // 다날 본인인증 imp_uid 검증
    @PostMapping("/certification")
    public ResponseEntity<?> verifyDanal(@RequestBody Map<String, String> body) {
        String impUid = body.get("imp_uid");
        if (impUid == null || impUid.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "imp_uid 누락"));
        }

        try {
            Map<String, Object> userInfo = smsService.verifyDanalIdentity(impUid);
            return ResponseEntity.ok(userInfo); // 실제 서비스에선 DTO로 변환 권장
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", "본인인증 실패", "detail", e.getMessage()));
        }
    }
}