package com.example.demo.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Component
@Builder
public class UserDto {
    private String userid;
    private String password;
    private String repassword;
    private String name;
    private String zip;
    private String addr;
    private String tel1;
    private String tel2;
    private String tel3;
}
