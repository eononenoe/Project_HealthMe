package com.example.healthme.domain.approval.service;

import com.example.healthme.domain.approval.entity.CartItem;
import com.example.healthme.domain.approval.repository.CartItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartItemService {
    private final CartItemRepository cartItemRepository;

    public List<CartItem> getCartItemsByUserid(String userid) {
        return cartItemRepository.findByUserid(userid);
    }

    public void deleteCartItemsByUserid(String userid) {
        cartItemRepository.deleteByUserid(userid);
    }

    public CartItem saveCartItem(CartItem cartItem) {
        return cartItemRepository.save(cartItem);
    }
}
