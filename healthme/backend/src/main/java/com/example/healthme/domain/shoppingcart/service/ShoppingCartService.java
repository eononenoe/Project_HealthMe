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
    @Transactional
    public void updateQuantityByCartItemId(Long cartItemId, int quantity) {
        ShoppingCartItem item = cartRepo.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("장바구니 항목을 찾을 수 없습니다."));
        item.setQuantity(quantity);
    }

    // 수량 변경
    @Transactional
    public void updateQuantity(String userId, Long productId, int quantity) {
        User user = userRepo.findByUserid(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
        ProductStore product = productRepo.findByProductId(productId)
                .orElseThrow(() -> new RuntimeException("상품을 찾을 수 없습니다."));

        ShoppingCartItem item = cartRepo.findByUserAndProduct(user, product)
                .orElseThrow(() -> new RuntimeException("장바구니 항목을 찾을 수 없습니다."));

        item.setQuantity(quantity);
        cartRepo.save(item);
    }

    // 항목 삭제
    @Transactional
    public void deleteItem(String userId, Long productId) {
        User user = userRepo.findByUserid(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
        ProductStore product = productRepo.findByProductId(productId)
                .orElseThrow(() -> new RuntimeException("상품을 찾을 수 없습니다."));

        ShoppingCartItem item = cartRepo.findByUserAndProduct(user, product)
                .orElseThrow(() -> new RuntimeException("장바구니 항목을 찾을 수 없습니다."));

        cartRepo.delete(item);
    }
//    @Transactional
//    public void deleteItem(String userId, Long productId, boolean isGuest) {
//        // 회원 장바구니 삭제 로직
//        if (!isGuest) {
//            User user = userRepo.findByUserid(userId)
//                    .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
//            ProductStore product = productRepo.findByProductId(productId)
//                    .orElseThrow(() -> new RuntimeException("상품을 찾을 수 없습니다."));
//
//            ShoppingCartItem item = cartRepo.findByUserAndProduct(user, product)
//                    .orElseThrow(() -> new RuntimeException("장바구니 항목을 찾을 수 없습니다."));
//
//            cartRepo.delete(item);
//        } else {
//            // 비회원 장바구니 삭제 로직
//            // 비회원 장바구니는 로컬 스토리지에서 삭제되고, 서버와 동기화가 필요합니다.
//            // 비회원 사용자 ID와 상품 ID를 기반으로 삭제 작업을 수행
//            ShoppingCartItem item = cartRepo.findByProductAndGuest(productId)
//                    .orElseThrow(() -> new RuntimeException("비회원 장바구니 항목을 찾을 수 없습니다."));
//
//            cartRepo.delete(item); // 비회원의 장바구니 항목 삭제
//        }
//    }

}
