package com.example.healthme.domain.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TranscationStatusDto {
    private Long orderId;
    private boolean isCanceled;
    private boolean isCompleted;

    private boolean refundRequested;   // 환불 요청 여부
    private boolean returnRequested;


}
