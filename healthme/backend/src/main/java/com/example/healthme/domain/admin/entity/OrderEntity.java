package com.example.healthme.domain.admin.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "order_tbl")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderId; // 주문 ID (PK)

    private String userid; // 사용자 ID

    private String productName; // 상품명
    private int productPrice;   // 가격
    private int amount;         // 수량

    private String transcationPeople; // 거래자
    private String transcationBank;   // 거래 은행

    private String isCanceled;        // 취소 여부
    private String isCompleted;       // 완료 여부
    private String refundRequested;   // 환불 요청 여부
    private String returnRequested;   // 반품 요청 여부

    private LocalDateTime orderDate; // 거래 일시
}