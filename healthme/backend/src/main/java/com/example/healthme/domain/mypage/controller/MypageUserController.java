package com.example.healthme.domain.mypage.controller;

import com.example.healthme.domain.mypage.service.MypageUserService;

import com.example.healthme.domain.user.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/mypage")
public class MypageUserController {

    @Autowired
    private MypageUserService mypageUserService;

    @GetMapping("/getuserinfo")
    public User getUser(@RequestParam("id") Long id){
        System.out.println(id);
        User user= mypageUserService.getUserInfo(id);
        return user;
    }
}
