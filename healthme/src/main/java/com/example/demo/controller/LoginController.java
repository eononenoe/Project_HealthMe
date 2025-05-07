package com.example.demo.controller;

import org.springframework.ui.Model;
import com.example.demo.domain.entity.User;
import com.example.demo.domain.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;

@Controller
@RequiredArgsConstructor
public class LoginController {

    private final UserRepository userRepository;

    @PostMapping("/login")
    public String login(@RequestParam String userid,
                        @RequestParam String password,
                        HttpSession session,
                        Model model) {
        Optional<User> userOpt = userRepository.findByUserid(userid);

        if (userOpt.isPresent() && userOpt.get().getPassword().equals(password)) {
            session.setAttribute("loginUser", userOpt.get());
            return "redirect:/"; // 로그인 성공 시 이동할 페이지
        } else {
            model.addAttribute("msg", "아이디 또는 비밀번호가 일치하지 않습니다.");
            return "login/login"; // 실패 시 로그인 페이지로
        }
    }

    @GetMapping("/login")
    public String showLoginForm() {
        return "login/login";
    }
}