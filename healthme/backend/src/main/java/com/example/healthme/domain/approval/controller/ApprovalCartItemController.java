package com.example.healthme.domain.approval.controller;

import com.example.healthme.domain.approval.entity.ApprovalCartItem;
import com.example.healthme.domain.approval.service.ApprovalCartItemService;
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
    public ResponseEntity<List<ApprovalCartItem>> getCartItemsByUserid(@PathVariable String userid) {
        List<ApprovalCartItem> approvalCartItems = approvalCartItemService.getCartItemsByUserid(userid);
        return ResponseEntity.ok(approvalCartItems);
    }

    // 장바구니 아이템 추가
    @PostMapping
    public ResponseEntity<ApprovalCartItem> addCartItem(@RequestBody ApprovalCartItem approvalCartItem) {
        ApprovalCartItem savedItem = approvalCartItemService.saveCartItem(approvalCartItem);
        return ResponseEntity.ok(savedItem);
    }

    // 사용자 장바구니 아이템 전체 삭제
    @DeleteMapping("/{userid}")
    public ResponseEntity<Void> deleteCartItemsByUserid(@PathVariable String userid) {
        approvalCartItemService.deleteCartItemsByUserid(userid);
        return ResponseEntity.noContent().build();
    }
}
