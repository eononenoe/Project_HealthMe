package com.example.healthme.domain.user.dto;

import com.example.healthme.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

// 로그인했을 때 가져올 값 ( 내부 처리용 dto, 프론트에 표시하면 절대 안됨)
@Getter
@Setter
@Builder
public class UserDto {
    private Long id;
    private String userid;
    private String password;
    private String username;
    private String zip;
    private String address;
    private String addressDetail;
    private String gender;
    private String tel;
    private String role;
    private String grade;

    // OAuth2용 필드
    private String provider;
    private String providerId;

    public static UserDto fromEntity(User user){
        return UserDto.builder()
                .id(user.getId())
                .userid(user.getUserid())
                .password(user.getPassword())
                .username(user.getUsername())
                .gender(user.getGender())
                .tel(user.getTel())
                .role(user.getRole())
                .grade(user.getGrade())
                .provider(user.getProvider())
                .providerId(user.getProviderId())
                .build();
    }

    public User toEntity() {
        return User.builder()
                .id(this.id)
                .userid(this.userid)
                .password(this.password)
                .username(this.username)
                .gender(this.gender)
                .tel(this.tel)
                .role(this.role)
                .grade(this.grade)
                .provider(this.provider)
                .providerId(this.providerId)
                .build();
    }
}