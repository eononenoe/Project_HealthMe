package com.example.healthme.domain.approval.repository;

import com.example.healthme.domain.approval.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUserid(String userid);
    void deleteByUserid(String userid);
}