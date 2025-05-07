package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class JoinController {

    public JoinController() {
        System.out.println("✅ JoinController loaded");
    }

    @GetMapping("/join")
    public String showJoinForm() {
        return "login/join";
    }
}
