package com.example.healthme.domain.shoppingcart.controller;

import com.example.healthme.domain.shoppingcart.dto.ShoppingCartItemDto;
import com.example.healthme.domain.shoppingcart.service.ShoppingCartItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
public class ShoppingCartController {

    private final ShoppingCartItemService cartService;

    // 장바구니 전체 조회
    @GetMapping("/{userid}")
    public List<ShoppingCartItemDto> getCartItems(@PathVariable String userid) {
        return cartService.getCartItems(userid);
    }

    // 수량 변경
    @PutMapping("/{id}/quantity")
    public ResponseEntity<Void> updateQuantity(@PathVariable Long id, @RequestParam int quantity) {
        cartService.updateQuantity(id, quantity);
        return ResponseEntity.ok().build();
    }

    // 항목 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCartItem(@PathVariable Long id) {
        cartService.deleteItem(id);
        return ResponseEntity.ok().build();
    }

    // 장바구니에 담기
    @PostMapping
    public ResponseEntity<Void> addCartItem(@RequestBody ShoppingCartItemDto dto) {
        cartService.addToCart(dto);
        return ResponseEntity.ok().build();
    }

}