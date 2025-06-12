package com.example.healthme.domain.mypage.entity;

import com.example.healthme.domain.user.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = "user") // 순환참조 방지
@Table(name = "addresses")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long addressId; // 배송지 ID (PK)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id") // FK
    @JsonIgnore
    private User user; // 사용자 (N:1 관계)

    private String zip;       // 우편번호
    private String address;    // 도로명 주소
    private String addressDetail;  // 상세 주소
    private String recipient;      // 받는 사람
    private String recipientPhone; // 받는 사람 전화번호
    private Boolean isDefault;     // 기본 배송지 여부
}
