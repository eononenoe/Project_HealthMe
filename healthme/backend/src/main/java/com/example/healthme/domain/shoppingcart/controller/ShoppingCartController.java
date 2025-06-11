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
    if (principalDetails == null) {
        System.out.println("인증 정보 없음!");
        throw new RuntimeException("로그인한 사용자만 장바구니에 담을 수 있습니다.");
    }
    System.out.println("principalDetails.getUserDto(): " + principalDetails.getUserDto());
    System.out.println("productId: " + requestDto.getProductId());
    System.out.println("quantity: " + requestDto.getQuantity());
    String userId = principalDetails.getUserDto().getUserid();
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
// 장바구니 수량 변경
@PutMapping("/item/{cartItemId}/quantity")
public ResponseEntity<Void> updateQuantity(
        @AuthenticationPrincipal PrincipalDetails principalDetails,
        @PathVariable Long cartItemId,
        @RequestParam int quantity) {

    if (principalDetails == null) {
        System.out.println(">> 인증 없음");
//  확인용
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    System.out.println(">> cartItemId: " + cartItemId + ", quantity: " + quantity);
//  확인용
    cartService.updateQuantityByCartItemId(cartItemId, quantity);
    return ResponseEntity.ok().build();
}

    // 항목 삭제
    @DeleteMapping("/delete/{productId}")
    public ResponseEntity<?> deleteCartItem(
            @AuthenticationPrincipal PrincipalDetails principalDetails,
            @PathVariable Long productId,
            @RequestParam(required = false) String guestId) {

        boolean isGuest = guestId != null && !guestId.isEmpty();
        String userId = null;

        if (!isGuest && principalDetails != null) {
            userId = principalDetails.getUserDto().getUserid();
        }
        try {
            cartService.deleteItem(userId, productId, isGuest, guestId);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류 발생");
        }
    }
}