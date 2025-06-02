package com.example.healthme.domain.approval.repository;

import com.example.healthme.domain.approval.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserid(String userid);
}