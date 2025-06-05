package com.example.healthme.domain.mypage.controller;


import com.example.healthme.domain.mypage.dto.AddressUpdate;
import com.example.healthme.domain.mypage.dto.MyPageUserUpdate;
import com.example.healthme.domain.mypage.dto.MypageUserResponseDto;
import com.example.healthme.domain.mypage.entity.Address;


import com.example.healthme.domain.mypage.service.MypageService;
import com.example.healthme.domain.user.entity.User;
import com.example.healthme.global.config.auth.principal.PrincipalDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/mypage")
public class MypageController {

    @Autowired
    private MypageService mypageUserService;


    // 회원 정보 가져오기
    @GetMapping("getuserinfo")
    public ResponseEntity<MypageUserResponseDto> getuser(@AuthenticationPrincipal PrincipalDetails principalDetails){
        User user =mypageUserService.getuser(principalDetails);
        if (user !=null){
            MypageUserResponseDto userResponseDto = new MypageUserResponseDto(user);
            return ResponseEntity.ok(userResponseDto);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    // 회원 정보 수정
    @PostMapping("/user/update")
    public void userUpdate(@RequestParam("id") Long id, @ModelAttribute MyPageUserUpdate userUpdate){
        // System.out.println(userUpdate);
        mypageUserService.updateUser(id,userUpdate);
    }

    // 주소값 가져오기
    @GetMapping("/getaddrinfo")
    public ResponseEntity<List<AddressUpdate>> getaddr(@AuthenticationPrincipal PrincipalDetails principalDetails){

        List<Address> addr = mypageUserService.getUserInfo(principalDetails); // 엔터티에 저장
        System.out.println("addr_List : "+addr);
        List<AddressUpdate> addr_li = new ArrayList<>();
        for (Address address : addr){ //엔터티 to DTO
            AddressUpdate addrupdate = new AddressUpdate(address); // DTO 변환
            addr_li.add(addrupdate);
        }
        return ResponseEntity.ok(addr_li);
    }
    
    // 배송지 수정
    @PostMapping("/updateAddr")
    public void AdressUpdate(@RequestParam("addr_id") Long addrid, @AuthenticationPrincipal PrincipalDetails principalDetails, @RequestBody AddressUpdate addressUpdate){
//        System.out.println("addressUpdate : "+addressUpdate);
        mypageUserService.updateAddress(addrid,principalDetails,addressUpdate);
    }

    // 새 배송지 추가
    @PostMapping("/newAddr")
    public void newAddr (@RequestBody AddressUpdate addressUpdate, @AuthenticationPrincipal PrincipalDetails principalDetails){
        System.out.println("addressUpdate : "+addressUpdate);
        mypageUserService.addnewAddr(addressUpdate,principalDetails);
    }

    //-----------------------------------------------------------------------

    // 구매내역 전체 불러오기
    @GetMapping("/getbuy")
    public ResponseEntity<?> getBuy(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        List<Order> orders = mypageUserService.getbuyproduct(principalDetails);
        List<OrderDto> result = orders.stream()
                .map(OrderDto::from)
                .collect(Collectors.toList());

        return ResponseEntity.ok(result);  // 빈 리스트라도 200 OK로 보내는 게 맞음
    }
}
