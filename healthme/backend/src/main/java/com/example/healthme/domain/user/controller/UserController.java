package com.example.healthme.domain.user.controller;

import com.example.healthme.domain.user.dto.JoinRequestDto;
import com.example.healthme.domain.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/healthme/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    // 회원가입
    @PostMapping("/join")
    public ResponseEntity<?> join(@RequestBody @Valid JoinRequestDto dto, BindingResult bindingResult) {
        // 유효성 검사
        if (bindingResult.hasErrors()) {
            String errorMessage = bindingResult.getFieldError().getDefaultMessage();
            return ResponseEntity.badRequest()
                    .body(Collections.singletonMap("error", errorMessage));
        }

        // 비밀번호 확인
        if (!dto.getPassword().equals(dto.getPassword2())) {
            return ResponseEntity.badRequest()
                    .body(Collections.singletonMap("error", "비밀번호가 일치하지 않습니다."));
        }

        try {
            userService.join(dto); // DB 저장 시도 (중복 가능성 있음)
            return ResponseEntity.ok(Collections.singletonMap("message", "회원가입 성공"));
        } catch (Exception e) {
            return ResponseEntity.status(409) // 중복 등 DB 제약 에러
                    .body(Collections.singletonMap("error", "이미 존재하는 아이디입니다."));
        }
    }
    
    
    // 로그인 중복확인
    @GetMapping("/check")
    public Map<String, Boolean> checkUserid(@RequestParam String userid) {
        boolean exists = userService.isUseridExists(userid);
        return Collections.singletonMap("exists", exists);
    }
}
