package com.example.healthme.domain.approval.dto;

import com.example.healthme.domain.mypage.dto.AddressUpdate;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ApprovalOrderRequestDto {
    private String userid;                   // 사용자 ID
    private AddressUpdate address;       // 배송지
    private String paymentMethod;            // 결제 수단
    private List<ApprovalOrderItemDto> items;        // 주문 상품 리스트
    private int totalPrice;                  // 총 결제 금액
}
