package com.example.demo.controller;

import com.example.demo.domain.dto.UserDto;
import com.example.demo.domain.entity.User;
import com.example.demo.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@RequiredArgsConstructor
@Controller
public class JoinController {

    private final UserRepository userRepository;

    @PostMapping("/join")
    public String join(UserDto dto) {
        if (!dto.getPassword().equals(dto.getRepassword())) {
            return "login/join";
        }


        User user = User.builder()
                .userid(dto.getUserid())
                .password(dto.getPassword()) // ⬅ 암호화된 비번 저장
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

    @GetMapping("/join")
    public String showForm() {
        return "login/join";
    }
}