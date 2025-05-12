package com.example.demo.domain.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
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
    @NotBlank(message = "아이디는 필수 항목입니다.")
    @Size(min = 4, max = 20, message = "아이디는 4자 이상 20자 이하로 입력해주세요.")
    private String userid;

    @NotBlank(message = "비밀번호는 필수 항목입니다.")
    @Size(min = 6, max = 30, message = "비밀번호는 6자 이상 30자 이하로 입력해주세요.")
    private String password;

    @NotBlank(message = "비밀번호 확인은 필수 항목입니다.")
    private String repassword;

    @NotBlank(message = "이름은 필수 항목입니다.")
    @Size(max = 30, message = "이름은 30자 이내로 입력해주세요.")
    private String name;

    @NotBlank(message = "우편번호는 필수 항목입니다.")
    private String zip;

    @NotBlank(message = "주소는 필수 항목입니다.")
    private String addr;

    private String tel1;

    @NotBlank(message = "전화번호는 필수 항목입니다.")
    @Pattern(regexp = "\\d{4}", message = "전화번호 중간자리는 숫자 4자리여야 합니다.")
    private String tel2;

    @NotBlank(message = "전화번호는 필수 항목입니다.")
    @Pattern(regexp = "\\d{4}", message = "전화번호 끝자리는 숫자 4자리여야 합니다.")
    private String tel3;
}
