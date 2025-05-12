package com.example.demo.controller;


import com.example.demo.domain.dto.UserDto;
import com.example.demo.domain.entity.User;
import com.example.demo.domain.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Controller
public class JoinController {

    private final UserRepository userRepository;

    // ✅ [POST] 회원가입 처리
    @PostMapping("/join")
    public String join(@Valid @ModelAttribute("userDto") UserDto dto,
                       BindingResult result,
                       Model model) {

        // 유효성 검사 실패
        if (result.hasErrors()) {
            // 모든 필드 에러를 Map<String, String> 형태로 변환해서 JSP로 전달
            Map<String, String> errors = result.getFieldErrors().stream()
                    .collect(Collectors.toMap(
                            err -> err.getField(),
                            err -> err.getDefaultMessage(),
                            (msg1, msg2) -> msg1 // 중복 필드는 첫 번째 메시지 유지
                    ));
            model.addAttribute("errors", errors);
            return "login/join";
        }

        // 비밀번호 불일치
        if (!dto.getPassword().equals(dto.getRepassword())) {
            model.addAttribute("errors", Map.of("repassword", "비밀번호가 일치하지 않습니다."));
            return "login/join";
        }

        // 저장
        User user = User.builder()
                .userid(dto.getUserid())
                .password(dto.getPassword()) // TODO: 비밀번호 암호화 필요
                .name(dto.getName())
                .zip(dto.getZip())
                .addr(dto.getAddr())
                .tel1(dto.getTel1())
                .tel2(dto.getTel2())
                .tel3(dto.getTel3())
                .build();

        userRepository.save(user);
        return "redirect:/login";
    }

    // ✅ [GET] 회원가입 폼 진입
    @GetMapping("/join")
    public String showJoinForm(@ModelAttribute("userDto") UserDto dto) {
        return "login/join";
    }
}