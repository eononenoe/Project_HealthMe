package com.example.healthme.domain.approval.controller;

import com.example.healthme.domain.approval.dto.ApprovalOrderRequestDto;
import com.example.healthme.domain.approval.dto.ApprovalOrderResponseDto;
import com.example.healthme.domain.approval.entity.ApprovalOrder;
import com.example.healthme.domain.approval.service.ApprovalOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class ApprovalOrderController {

    private final ApprovalOrderService approvalOrderService;

    // 주문 생성
    @PostMapping
    public ResponseEntity<Map<String, Object>> createOrder(@RequestBody ApprovalOrderRequestDto dto) {
        approvalOrderService.createOrder(dto);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "주문이 성공적으로 접수되었습니다.");

        return ResponseEntity.ok(response);
    }

    // 사용자별 주문 목록 조회
    @GetMapping("/{userid}")
    public ResponseEntity<List<ApprovalOrderResponseDto>> getOrdersByUserid(@PathVariable String userid) {
        List<ApprovalOrder> orders = approvalOrderService.getOrdersByUserid(userid);

        List<ApprovalOrderResponseDto> responseDtos = orders.stream()
                .map(ApprovalOrderResponseDto::fromEntity)
                .collect(Collectors.toList());

        return ResponseEntity.ok(responseDtos);
    }

    // 주문 상세 조회
    @GetMapping("/detail/{orderId}")
    public ResponseEntity<ApprovalOrderResponseDto> getOrderById(@PathVariable Long orderId) {
        ApprovalOrder order = approvalOrderService.getOrderById(orderId);
        if (order == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(ApprovalOrderResponseDto.fromEntity(order));
    }
}
