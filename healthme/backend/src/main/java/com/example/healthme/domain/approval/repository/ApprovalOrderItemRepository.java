package com.example.healthme.domain.approval.repository;

import com.example.healthme.domain.approval.entity.ApprovalOrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApprovalOrderItemRepository extends JpaRepository<ApprovalOrderItem, Long> {
    List<ApprovalOrderItem> findByOrderOrderId(Long orderId);
}