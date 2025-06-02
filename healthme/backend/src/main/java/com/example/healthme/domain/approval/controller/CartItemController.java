package com.example.healthme.domain.approval.controller;

import com.example.healthme.domain.approval.entity.CartItem;
import com.example.healthme.domain.approval.service.CartItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartItemController {

    private final CartItemService cartItemService;

    // 사용자 장바구니 아이템 전체 조회
    @GetMapping("/{userid}")
    public ResponseEntity<List<CartItem>> getCartItemsByUserid(@PathVariable String userid) {
        List<CartItem> cartItems = cartItemService.getCartItemsByUserid(userid);
        return ResponseEntity.ok(cartItems);
    }

    // 장바구니 아이템 추가
    @PostMapping
    public ResponseEntity<CartItem> addCartItem(@RequestBody CartItem cartItem) {
        CartItem savedItem = cartItemService.saveCartItem(cartItem);
        return ResponseEntity.ok(savedItem);
    }

    // 사용자 장바구니 아이템 전체 삭제
    @DeleteMapping("/{userid}")
    public ResponseEntity<Void> deleteCartItemsByUserid(@PathVariable String userid) {
        cartItemService.deleteCartItemsByUserid(userid);
        return ResponseEntity.noContent().build();
    }
}
