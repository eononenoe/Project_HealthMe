package com.example.healthme.domain.approval.dto;

import com.example.healthme.domain.approval.entity.ApprovalOrderItem;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApprovalOrderItemDto {
    private Long productId;
    private String productName;
    private int quantity;
    private int price;
    private int discountPrice;
    private int unitPrice;
    private int itemTotal;

    public static ApprovalOrderItemDto fromEntity(ApprovalOrderItem item) {
        ApprovalOrderItemDto dto = new ApprovalOrderItemDto();
        dto.setProductId(item.getProductId());
        dto.setProductName(item.getProductName());
        dto.setQuantity(item.getQuantity());
        dto.setPrice(item.getPrice());
        dto.setDiscountPrice(item.getDiscountPrice());
        dto.setUnitPrice(item.getUnitPrice());
        dto.setItemTotal(item.getItemTotal());
        return dto;
    }
}
