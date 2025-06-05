package com.example.healthme.domain.approval.service;

import com.example.healthme.domain.approval.entity.ApprovalCartItem;
import com.example.healthme.domain.approval.repository.ApprovalCartItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ApprovalCartItemService {
    private final ApprovalCartItemRepository approvalCartItemRepository;

    public List<ApprovalCartItem> getCartItemsByUserid(String userid) {
        return approvalCartItemRepository.findByUserid(userid);
    }

    public void deleteCartItemsByUserid(String userid) {
        approvalCartItemRepository.deleteByUserid(userid);
    }

    public ApprovalCartItem saveCartItem(ApprovalCartItem approvalCartItem) {
        return approvalCartItemRepository.save(approvalCartItem);
    }
}
