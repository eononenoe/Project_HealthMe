package com.example.healthme.domain.approval.service;

import com.example.healthme.domain.approval.entity.ApprovalOrderItem;
import com.example.healthme.domain.approval.repository.ApprovalOrderItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ApprovalOrderItemService {
    private final ApprovalOrderItemRepository approvalOrderItemRepository;

    public List<ApprovalOrderItem> getOrderItemsByOrderId(Long orderId) {
        return approvalOrderItemRepository.findByOrderOrderId(orderId);
    }

    public ApprovalOrderItem saveOrderItem(ApprovalOrderItem approvalOrderItem) {
        return approvalOrderItemRepository.save(approvalOrderItem);
    }
}
