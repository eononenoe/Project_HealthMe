package com.example.healthme.domain.approval.repository;

import com.example.healthme.domain.approval.entity.ApprovalCartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApprovalCartItemRepository extends JpaRepository<ApprovalCartItem, Long> {
    List<ApprovalCartItem> findByUserid(String userid);
    void deleteByUserid(String userid);
}