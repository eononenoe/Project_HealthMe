package com.example.healthme.domain.approval.service;

import com.example.healthme.domain.approval.repository.ApprovalCartItemRepository;
import com.example.healthme.domain.shoppingcart.entity.ShoppingCartItem;
import com.example.healthme.domain.user.entity.User;
import com.example.healthme.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ApprovalCartItemService {
    @Autowired
    private ApprovalCartItemRepository approvalCartItemRepository;

    @Autowired
    private UserRepository userRepository;


    public List<ShoppingCartItem> getCartItemsByUserid(String userid) {
        return approvalCartItemRepository.findByUserUserid(userid);
    }

    public void deleteCartItemsByUserid(String userid) {
        User user = userRepository.findByUserid(userid)
                .orElseThrow(()->new IllegalArgumentException("존재하지 않는 사용자입니다."));
        approvalCartItemRepository.deleteByUser(user);
    }

    public ShoppingCartItem saveCartItem(ShoppingCartItem approvalCartItem) {
        return approvalCartItemRepository.save(approvalCartItem);
    }
}
