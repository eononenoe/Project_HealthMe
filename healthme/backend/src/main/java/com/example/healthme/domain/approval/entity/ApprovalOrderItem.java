package com.example.healthme.domain.approval.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "order_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApprovalOrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderItemId;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private ApprovalOrder order;

    private Long productId;
    private String productName;
    private int quantity;

    private int price;
    private int discountPrice;

    // 선택 필드
    private int unitPrice;
    private int itemTotal;

    private String productImageUrl;
}
