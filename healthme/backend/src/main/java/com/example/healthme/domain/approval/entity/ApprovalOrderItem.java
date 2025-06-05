package com.example.healthme.domain.approval.entity;

import com.example.healthme.domain.product.entity.ProductStore;
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

    @Column(name = "product_id") // 명시적으로 추가
    private Long productId; // insert, update 시에는 productId 필드에 직접 값을 넣어야한다.

    @ManyToOne(fetch = FetchType.LAZY) // 읽기 전용
    @JoinColumn(name = "product_id", insertable = false, updatable = false)
    private ProductStore product;

    private String productName;
    private int quantity;

    private int price;
    private int discountPrice;

    // 선택 필드
    private int unitPrice;
    private int itemTotal;
}
