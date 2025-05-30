package com.example.healthme.domain.mypage.controller;


import com.example.healthme.domain.mypage.dto.AddressUpdate;
import com.example.healthme.domain.mypage.dto.MyPageUserUpdate;
import com.example.healthme.domain.mypage.dto.MypageUserResponseDto;
import com.example.healthme.domain.mypage.service.MypageUserService;

import com.example.healthme.domain.user.dto.UserResponseDto;
import com.example.healthme.domain.user.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mypage")
public class MypageUserController {

    @Autowired
    private MypageUserService mypageUserService;


    // id에 맞는 정보 가져오기
    @GetMapping("/getuserinfo")
    public MypageUserResponseDto getUser(@RequestParam("id") Long id){
        System.out.println("id"+id);
        User user= mypageUserService.getUserInfo(id); // 엔터티에 저장

        return new MypageUserResponseDto(user); // DTO 변환
    }

    // 회원 정보 수정
    @PostMapping("/user/update")
    public void userUpdate(@RequestParam("id") Long id, @ModelAttribute MyPageUserUpdate userUpdate){
        System.out.println(userUpdate);
        mypageUserService.updateUser(id,userUpdate);
    }
    
    // 배송지 수정
    @PostMapping("/updateUser")
    public void AdressUpdate(@RequestParam("id") Long id, @RequestBody AddressUpdate addressUpdate){
        System.out.println("addressUpdate : "+addressUpdate);
        mypageUserService.updateAddress(id, addressUpdate);
    }

    // 새 배송지 추가
//    @PostMapping("/newAddr")
//    public void newAddr (@RequestParam)
}
