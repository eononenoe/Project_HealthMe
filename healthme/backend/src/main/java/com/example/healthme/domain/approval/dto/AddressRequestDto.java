package com.example.healthme.domain.approval.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressRequestDto {
    private String recipient;       // 받는 사람 이름
    private String zipcode;         // 우편번호
    private String address;         // 기본 주소
    private String addressDetail;   // 상세 주소
    private String phone1;          // 전화 앞자리 (예: 010)
    private String phone2;          // 전화 중간
    private String phone3;          // 전화 끝자리
    private String emailId;         // 이메일 아이디
    private String emailDomain;     // 이메일 도메인 (naver.com 등)
}
