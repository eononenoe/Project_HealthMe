package com.example.healthme.domain.approval.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    private String userid;

    private LocalDateTime orderDate;

    private String status;

    private Long addressId;

    private int totalPrice;

    private boolean isCanceled;

    private boolean isCompleted;

    private boolean refundRequested;

    private boolean returnRequested;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> orderItems;
}
