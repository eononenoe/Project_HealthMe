package com.example.healthme.domain.shoppingcart.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ShoppingCartItemRequestDto {

    private Long productId; // 어떤 상품을
    private int quantity;   // 몇 개 담을지
}
