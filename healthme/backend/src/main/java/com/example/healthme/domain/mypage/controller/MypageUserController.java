package com.example.healthme.domain.mypage.controller;

import com.example.healthme.domain.mypage.dto.UserUpdate;
import com.example.healthme.domain.mypage.service.MypageUserService;

import com.example.healthme.domain.user.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mypage")
public class MypageUserController {

    @Autowired
    private MypageUserService mypageUserService;

    @GetMapping("/getuserinfo")
    public User getUser(@RequestParam("id") Long id){
        System.out.println("id"+id);
        User user= mypageUserService.getUserInfo(id);
        return user;
    }

    @PostMapping("/user/update")
    public void userUpdate(@RequestParam("id") Long id, @ModelAttribute UserUpdate userUpdate){
        System.out.println(userUpdate);
        mypageUserService.updateUser(id,userUpdate);
    }
    
    // 배송지 수정
    

}
