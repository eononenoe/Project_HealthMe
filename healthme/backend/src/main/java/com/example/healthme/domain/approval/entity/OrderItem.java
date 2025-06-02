package com.example.healthme.domain.approval.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "order_items")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderItemId;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private com.example.healthme.domain.approval.entity.Order order;

    private Long productId;

    private int quantity;

    private int unitPrice;

    private int itemTotal;
}
