package com.example.healthme.domain.user.dto;

import com.example.healthme.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

// 로그인했을 때 가져올 값
@Getter
@Builder
@AllArgsConstructor
public class UserDto {
    private String userid;
    private String username;
    private String role;
    private String grade;

    public static UserDto toDto(User user) {
        return UserDto.builder()
                .userid(user.getUserid())
                .username(user.getUsername())
                .role(user.getRole())
                .grade(user.getGrade())
                .build();
    }
}
