package com.example.healthme.domain.user.entity;

import com.example.healthme.domain.mypage.entity.Address;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = {"addresses", "defaultAddress"}) // 순환참조 방지
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String userid;
    private String password;
    private String username;
//    private String zip;
//    private String address;
//    private String addressDetail;
    private String tel;
    private String gender;
    // 회원가입에는 기입x, 기본값 부여
    private String role;
    private String grade;

    private int totalPurchaseAmount; // 누적 구매 금액
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "default_address_id")
    private Address defaultAddress; // Address 객체 자체를 참조

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Address> addresses = new ArrayList<>();

    @Column(length = 20)
    private String provider;
    @Column(length = 100)
    private String providerId;
}
