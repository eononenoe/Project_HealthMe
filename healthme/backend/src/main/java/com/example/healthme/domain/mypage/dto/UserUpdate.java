package com.example.healthme.domain.mypage.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdate {
    private String password;
    private String username;
    private String phone;

}
