package com.example.healthme.domain.admin.repository;

import com.example.healthme.domain.approval.entity.ApprovalOrder;
import org.hibernate.query.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TranscationRepository extends JpaRepository<ApprovalOrder,Long> {

    Page<ApprovalOrder> findByUser_UsernameContaining(String searchText, Pageable pageable);
}
