package com.example.healthme.domain.approval.controller;

import com.example.healthme.domain.approval.entity.ApprovalOrderItem;
import com.example.healthme.domain.approval.service.ApprovalOrderItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order-items")
@RequiredArgsConstructor
public class ApprovalOrderItemController {

    private final ApprovalOrderItemService approvalOrderItemService;

    // 특정 주문의 주문 아이템 조회
    @GetMapping("/{orderId}")
    public ResponseEntity<List<ApprovalOrderItem>> getOrderItemsByOrderId(@PathVariable Long orderId) {
        List<ApprovalOrderItem> items = approvalOrderItemService.getOrderItemsByOrderId(orderId);
        return ResponseEntity.ok(items);
    }

    // 주문 아이템 저장
    @PostMapping
    public ResponseEntity<ApprovalOrderItem> addOrderItem(@RequestBody ApprovalOrderItem approvalOrderItem) {
        ApprovalOrderItem savedItem = approvalOrderItemService.saveOrderItem(approvalOrderItem);
        return ResponseEntity.ok(savedItem);
    }
}
