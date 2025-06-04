package com.example.healthme.domain.mypage.repository;

import com.example.healthme.domain.mypage.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface orderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(String username);
}
