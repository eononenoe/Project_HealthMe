package com.example.healthme.domain.admin.service;

import com.example.healthme.domain.admin.dto.TranscationStatusDto;
import com.example.healthme.domain.admin.repository.TranscationRepository;
import com.example.healthme.domain.approval.dto.ApprovalOrderResponseDto;
import com.example.healthme.domain.approval.entity.ApprovalOrder;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TranscationService {

    private final TranscationRepository transcationRepository;

    // 전체 가져오기
    public Page<ApprovalOrderResponseDto> selectAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size,
                Sort.by(Sort.Direction.DESC, "orderDate"));

        // Page<ApprovalOrder> ➜ Page<ApprovalOrderResponseDto>
        return transcationRepository.findAll(pageable)
                .map(ApprovalOrderResponseDto::fromEntity);
    }

    // 이름으로 검색
    public Page<ApprovalOrderResponseDto> selectByUserName(String searchText,
                                                           int page,
                                                           int size) {
        Pageable pageable = PageRequest.of(page, size,
                Sort.by(Sort.Direction.DESC, "orderDate"));

        return transcationRepository
                .findByUser_UsernameContaining(searchText, pageable)
                .map(ApprovalOrderResponseDto::fromEntity);
    }

    // 수정
    public boolean updateTranscation(TranscationStatusDto dto) {
        Optional<ApprovalOrder> opt = transcationRepository.findById(dto.getOrderId());
        if (opt.isEmpty()) return false;

        ApprovalOrder order = opt.get();
        order.setCanceled(dto.isCanceled());
        order.setCompleted(dto.isCompleted());
        transcationRepository.save(order);
        return true;
    }

    // 환불 반품 요청 처리
    public boolean refundOrReturn(TranscationStatusDto dto, String type) {
        Optional<ApprovalOrder> opt = transcationRepository.findById(dto.getOrderId());
        if (opt.isEmpty()) return false;

        ApprovalOrder order = opt.get();
        if ("환불".equals(type)) {
            order.setRefundRequested(dto.isRefundRequested());
        } else if ("반품".equals(type)) {
            order.setReturnRequested(dto.isReturnRequested());
        }
        transcationRepository.save(order);
        return true;
    }
}
