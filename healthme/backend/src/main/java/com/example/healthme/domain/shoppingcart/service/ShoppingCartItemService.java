package com.example.healthme.domain.shoppingcart.service;

import com.example.healthme.domain.shoppingcart.dto.ShoppingCartItemDto;
import com.example.healthme.domain.shoppingcart.entity.ShoppingCartItem;
import com.example.healthme.domain.shoppingcart.repository.ShopingCartItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ShoppingCartItemService {

    private final ShopingCartItemRepository shopingCartItemRepository;

    public List<ShoppingCartItemDto> getCartItems(String userid) {
        return shopingCartItemRepository.findByUserid(userid).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public void updateQuantity(Long id, int quantity) {
        ShoppingCartItem item = shopingCartItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));
        item.setQuantity(quantity);
        shopingCartItemRepository.save(item);
    }

    public void deleteItem(Long id) {
        shopingCartItemRepository.deleteById(id);
    }

    private ShoppingCartItemDto toDto(ShoppingCartItem entity) {
        return new ShoppingCartItemDto(
                entity.getCartItemId(),
                entity.getUserid(),
                entity.getProductId(),
                entity.getQuantity()
        );
    }

    public void addToCart(ShoppingCartItemDto dto) {
        ShoppingCartItem item = ShoppingCartItem.builder()
                .userid(dto.getUserid())
                .productId(dto.getProductId())
                .quantity(dto.getQuantity())
                .build();

        shopingCartItemRepository.save(item);
    }

}
