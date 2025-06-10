package com.example.healthme.domain.shoppingcart.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ShoppingCartItemResponseDto {

    private Long cartItemId;
    private Long productId;
    private String productName;
    private String imageUrl;
    private int price;
    private int quantity;
    private int totalPrice; // price * quantity

    // 필요시 addedAt, salePrice 등도 추가 가능
}
