package com.example.healthme.domain.shoppingcart.repository;

import com.example.healthme.domain.shoppingcart.entity.ShoppingCartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShopingCartItemRepository extends JpaRepository<ShoppingCartItem, Long> {
    List<ShoppingCartItem> findByUserid(String userid);
}