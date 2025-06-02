package com.example.healthme.domain.approval.controller;

import com.example.healthme.domain.approval.entity.Order;
import com.example.healthme.domain.approval.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    // 특정 사용자 주문 리스트 조회
    @GetMapping("/{userid}")
    public ResponseEntity<List<Order>> getOrdersByUserid(@PathVariable String userid) {
        List<Order> orders = orderService.getOrdersByUserid(userid);
        return ResponseEntity.ok(orders);
    }

    // 주문 생성
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        Order savedOrder = orderService.saveOrder(order);
        return ResponseEntity.ok(savedOrder);
    }

    // 주문 단건 조회
    @GetMapping("/detail/{orderId}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long orderId) {
        Order order = orderService.getOrderById(orderId);
        if (order == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(order);
    }
}
