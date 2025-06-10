package com.example.healthme.domain.shoppingcart.service;

import com.example.healthme.domain.shoppingcart.dto.ShoppingCartItemRequestDto;
import com.example.healthme.domain.shoppingcart.dto.ShoppingCartItemResponseDto;
import com.example.healthme.domain.shoppingcart.entity.ShoppingCartItem;
import com.example.healthme.domain.shoppingcart.repository.ShoppingCartItemRepository;
import com.example.healthme.domain.product.entity.ProductStore;
import com.example.healthme.domain.product.repository.ProductStoreRepository;
import com.example.healthme.domain.user.entity.User;
import com.example.healthme.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ShoppingCartService {

    private final ShoppingCartItemRepository cartRepo;
    private final ProductStoreRepository productRepo;
    private final UserRepository userRepo;

//      장바구니에 상품 추가
//      이미 있으면 수량만 증가
    @Transactional
    public void addToCart(String userId, ShoppingCartItemRequestDto requestDto) {
        User user = userRepo.findByUserid(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
        ProductStore product = productRepo.findByProductId(requestDto.getProductId())
                .orElseThrow(() -> new RuntimeException("상품을 찾을 수 없습니다."));

        ShoppingCartItem cartItem = cartRepo.findByUserAndProduct(user, product)
                .map(item -> {
                    item.setQuantity(item.getQuantity() + requestDto.getQuantity());
                    return item;
                })
                .orElse(ShoppingCartItem.builder()
                        .user(user)
                        .product(product)
                        .quantity(requestDto.getQuantity())
                        .build()
                );

        cartRepo.save(cartItem);
    }


//      유저의 장바구니 목록 조회
    public List<ShoppingCartItemResponseDto> getCartItems(String userId) {
        User user = userRepo.findByUserid(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        List<ShoppingCartItem> cartItems = cartRepo.findByUser(user);

        return cartItems.stream().map(item ->
                ShoppingCartItemResponseDto.builder()
                        .cartItemId(item.getCartItemId())
                        .productId(item.getProduct().getProductId())
                        .productName(item.getProduct().getName())
                        .imageUrl(item.getProduct().getImageUrl())
                        .price(item.getProduct().getPrice())
                        .quantity(item.getQuantity())
                        .totalPrice(item.getProduct().getPrice() * item.getQuantity())
                        .build()
        ).collect(Collectors.toList());
    }
}
