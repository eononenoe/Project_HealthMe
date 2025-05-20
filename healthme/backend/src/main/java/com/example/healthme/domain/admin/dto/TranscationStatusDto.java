package com.example.healthme.domain.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TranscationStatusDto {
    private int orderId;
    private String isCanceled;
    private String isCompleted;

    private String refundRequested;   // 환불 요청 여부
    private String returnRequested;


}
