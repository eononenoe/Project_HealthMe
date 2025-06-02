package com.example.healthme.domain.approval.controller;

import com.example.healthme.domain.approval.entity.OrderItem;
import com.example.healthme.domain.approval.service.OrderItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order-items")
@RequiredArgsConstructor
public class OrderItemController {

    private final OrderItemService orderItemService;

    // 특정 주문의 주문 아이템 조회
    @GetMapping("/{orderId}")
    public ResponseEntity<List<OrderItem>> getOrderItemsByOrderId(@PathVariable Long orderId) {
        List<OrderItem> items = orderItemService.getOrderItemsByOrderId(orderId);
        return ResponseEntity.ok(items);
    }

    // 주문 아이템 저장
    @PostMapping
    public ResponseEntity<OrderItem> addOrderItem(@RequestBody OrderItem orderItem) {
        OrderItem savedItem = orderItemService.saveOrderItem(orderItem);
        return ResponseEntity.ok(savedItem);
    }
}
