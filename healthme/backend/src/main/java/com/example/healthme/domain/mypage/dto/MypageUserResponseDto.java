package com.example.healthme.domain.mypage.dto;

import com.example.healthme.domain.user.entity.User;
import lombok.Data;

@Data
public class MypageUserResponseDto {
    private Long id;
    private String userid;
    private String username;
    private String tel;
//    private String zip;
//    private String address;
//    private String addressDetail;
    private int totalPurchaseAmount;

    public MypageUserResponseDto(User user) {
        this.id = user.getId();
        this.userid = user.getUserid();
        this.username = user.getUsername();
        this.tel = user.getTel();
        this.totalPurchaseAmount = user.getTotalPurchaseAmount();
//        this.zip = user.getDefaultAddress().getZip();
//        this.address = user.getDefaultAddress().getAddress();
//        this.addressDetail = user.getDefaultAddress().getAddressDetail();
    }

}
