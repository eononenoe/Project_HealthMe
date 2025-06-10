package com.example.healthme.domain.shoppingcart.controller;

import com.example.healthme.domain.shoppingcart.dto.ShoppingCartItemRequestDto;
import com.example.healthme.domain.shoppingcart.dto.ShoppingCartItemResponseDto;
import com.example.healthme.domain.shoppingcart.service.ShoppingCartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import com.example.healthme.global.config.auth.principal.PrincipalDetails;
import java.util.List;


@RestController
@RequestMapping("/healthme/cart")
@RequiredArgsConstructor
public class ShoppingCartController {

    private final ShoppingCartService cartService;

//    장바구니 담기
@PostMapping
public ResponseEntity<String> addToCart(
        @AuthenticationPrincipal PrincipalDetails principalDetails,
        @RequestBody ShoppingCartItemRequestDto requestDto) {

    System.out.println(">>> principalDetails: " + principalDetails);
    if (principalDetails == null) {
        throw new RuntimeException("로그인이 필요합니다.");
    }
    String userId = principalDetails.getUserDto().getUserid(); // or getUser().getUserid()
    System.out.println("userId: " + userId);

    cartService.addToCart(userId, requestDto);
    return ResponseEntity.ok("장바구니에 추가되었습니다.");
}

// 비회원 장바구니 
    @PostMapping("/healthme/cart/guest-sync")
    public ResponseEntity<String> syncGuestCart(
            @AuthenticationPrincipal PrincipalDetails principalDetails,
            @RequestBody List<ShoppingCartItemRequestDto> guestItems
    ) {
        if (principalDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }

        String userId = principalDetails.getUserDto().getUserid();

        for (ShoppingCartItemRequestDto item : guestItems) {
            cartService.addToCart(userId, item);
        }

        return ResponseEntity.ok("비회원 장바구니가 서버와 동기화되었습니다.");
    }


//     장바구니 목록 조회
@GetMapping
public ResponseEntity<List<ShoppingCartItemResponseDto>> getCartItems(
        @AuthenticationPrincipal PrincipalDetails principalDetails) {

    String userId = principalDetails.getUserDto().getUserid();
    List<ShoppingCartItemResponseDto> cartItems = cartService.getCartItems(userId);
    return ResponseEntity.ok(cartItems);
}

//    // 장바구니 전체 조회
//    @GetMapping("/{userid}")
//    public List<ShoppingCartItemDto> getCartItems(@PathVariable String userid) {
//        return cartService.getCartItems(userid);
//    }
//    // 수량 변경
//    @PutMapping("/{id}/quantity")
//    public ResponseEntity<Void> updateQuantity(@PathVariable Long id, @RequestParam int quantity) {
//        cartService.updateQuantity(id, quantity);
//        return ResponseEntity.ok().build();
//    }
//
//    // 항목 삭제
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteCartItem(@PathVariable Long id) {
//        cartService.deleteItem(id);
//        return ResponseEntity.ok().build();
//    }
//
//    // 장바구니에 담기
//    @PostMapping
//    public ResponseEntity<Void> addCartItem(@RequestBody ShoppingCartItemDto dto) {
//        cartService.addToCart(dto);
//        return ResponseEntity.ok().build();
//    }
//
}