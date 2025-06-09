package com.example.healthme.domain.shoppingcart.entity;


import com.example.healthme.domain.product.entity.ProductStore;
import com.example.healthme.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "cart_item")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShoppingCartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartItemId;

    // 유저 정보 (Many Cart to One User)
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // 상품 정보 (Many Cart to One Product)
    @ManyToOne
    @JoinColumn(name = "product_id")
    private ProductStore product;

    private int quantity; // 장바구니에 담은 수량

    private LocalDateTime addedAt;
    @PrePersist
    protected void onCreate() {
        this.addedAt = LocalDateTime.now();
    }
}