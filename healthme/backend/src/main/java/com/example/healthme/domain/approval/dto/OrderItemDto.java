package com.example.healthme.domain.approval.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderItemDto {
    private Long productId;    // 상품 ID
    private String productName;
    private int quantity;      // 수량
    private int price;         // 판매가 (할인 적용된 가격)
}
