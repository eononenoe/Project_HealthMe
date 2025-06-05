package com.example.healthme.domain.mypage.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface orderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser_Username(String username);
}
