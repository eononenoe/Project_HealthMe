package com.example.healthme.domain.approval.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderRequestDto {
    private AddressRequestDto address;     // 배송지
    private String paymentMethod;          // 결제 수단 (card, bank, naverpay 등)
    private List<OrderItemDto> items;      // 주문 상품 리스트
    private int totalPrice;                // 최종 결제 금액
}
