package com.example.healthme.domain.mypage.entity;

import com.example.healthme.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    // 실무 편의상 직접 저장할 수 있도록 유지
    @Column(nullable = false, updatable = false)
    private String userid;

    // 참조용 (조회 전용)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userid", referencedColumnName = "userid", insertable = false, updatable = false)
    private User user;

    private LocalDateTime orderDate;

    private String status;

    @Column(nullable = false)
    private Long addressId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "addressId", insertable = false, updatable = false)
    private Address address;

    private int totalPrice;

    private boolean isCanceled;

    private boolean isCompleted;

    private boolean refundRequested;

    private boolean returnRequested;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> orderItems;
}
