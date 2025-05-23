package com.example.healthme.domain.mypage.controller;

import com.example.healthme.domain.mypage.service.UserService;
import com.example.healthme.domain.user.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/mypage")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/getuserinfo")
    public List<User> getUser(){
        userService.getUserInfo();
        return null;
    }
}
