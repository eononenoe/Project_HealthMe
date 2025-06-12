package com.example.healthme.domain.approval.controller;

import com.example.healthme.domain.approval.service.ApprovalCartItemService;
import com.example.healthme.domain.shoppingcart.entity.ShoppingCartItem;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/shopping-cart")
@RequiredArgsConstructor
public class ApprovalCartItemController {

    private final ApprovalCartItemService approvalCartItemService;

    // 사용자 장바구니 아이템 전체 조회
    @GetMapping("/{userid}")
    public ResponseEntity<List<ShoppingCartItem>> getCartItemsByUserid(@PathVariable String userid) {
        List<ShoppingCartItem> approvalCartItems = approvalCartItemService.getCartItemsByUserid(userid);
        return ResponseEntity.ok(approvalCartItems);
    }

    // 장바구니 아이템 추가
    @PostMapping
    public ResponseEntity<ShoppingCartItem> addCartItem(@RequestBody ShoppingCartItem approvalCartItem) {
        ShoppingCartItem savedItem = approvalCartItemService.saveCartItem(approvalCartItem);
        return ResponseEntity.ok(savedItem);
    }

    // 사용자 장바구니 아이템 전체 삭제
    @DeleteMapping("/{userid}")
    public ResponseEntity<Void> deleteCartItemsByUserid(@PathVariable String userid) {
        approvalCartItemService.deleteCartItemsByUserid(userid);
        return ResponseEntity.noContent().build();
    }
}
