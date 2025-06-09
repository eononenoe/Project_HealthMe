package com.example.healthme.domain.approval.dto;

import com.example.healthme.domain.approval.entity.ApprovalOrder;
import com.example.healthme.domain.approval.entity.ApprovalOrderItem;
import com.example.healthme.domain.mypage.dto.AddressUpdate;
import com.example.healthme.domain.mypage.entity.Address;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class ApprovalOrderResponseDto {
    private Long orderId;
    private String userid;
    private LocalDateTime orderDate;
    private String status;
    private String paymentMethod;
    private int totalPrice;
    private boolean isCanceled;
    private boolean isCompleted;
    private boolean refundRequested;
    private boolean returnRequested;
    private AddressUpdate  address; // 그대로 포함 (Embedded)
    private List<ApprovalOrderItemDto> items;

    public static ApprovalOrderResponseDto fromEntity(ApprovalOrder order) {
        ApprovalOrderResponseDto dto = new ApprovalOrderResponseDto();
        dto.setOrderId(order.getOrderId());
        dto.setUserid(order.getUser().getUserid());
        dto.setOrderDate(order.getOrderDate());
        dto.setStatus(order.getStatus());
        dto.setPaymentMethod(order.getPaymentMethod());
        dto.setTotalPrice(order.getTotalPrice());
        dto.setCanceled(order.isCanceled());
        dto.setCompleted(order.isCompleted());
        dto.setRefundRequested(order.isRefundRequested());
        dto.setReturnRequested(order.isReturnRequested());
        dto.setAddress(new AddressUpdate(order.getAddress()));
        dto.setItems(order.getApprovalOrderItems().stream()
                .map(ApprovalOrderItemDto::fromEntity)
                .collect(Collectors.toList()));
        return dto;
    }
}
