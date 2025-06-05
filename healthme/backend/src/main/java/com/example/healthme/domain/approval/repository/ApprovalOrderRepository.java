package com.example.healthme.domain.approval.repository;

import com.example.healthme.domain.approval.entity.ApprovalOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApprovalOrderRepository extends JpaRepository<ApprovalOrder, Long> {
    List<ApprovalOrder> findByUser_Userid(String userid);
}