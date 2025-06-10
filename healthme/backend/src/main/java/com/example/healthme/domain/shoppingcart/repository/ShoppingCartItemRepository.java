package com.example.healthme.domain.shoppingcart.repository;

import com.example.healthme.domain.shoppingcart.entity.ShoppingCartItem;
import com.example.healthme.domain.user.entity.User;
import com.example.healthme.domain.product.entity.ProductStore;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ShoppingCartItemRepository extends JpaRepository<ShoppingCartItem, Long> {

    // 특정 유저의 장바구니 아이템 전체 조회
    List<ShoppingCartItem> findByUser(User user);

    // 유저 + 상품으로 이미 담은 아이템이 있는지 확인 (중복 추가 방지용)
    Optional<ShoppingCartItem> findByUserAndProduct(User user, ProductStore product);

}
