package com.example.healthme.domain.approval.controller;

import com.example.healthme.domain.approval.dto.ApprovalOrderRequestDto;
import com.example.healthme.domain.approval.dto.ApprovalOrderResponseDto;
import com.example.healthme.domain.approval.service.ApprovalService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/healthme")
@RequiredArgsConstructor
public class PortOneController { // 클래스 이름을 ApprovalController로 변경

    private final ApprovalService approvalService;

    /**
     * 포트원 결제 성공 후, 결제 정보를 받아 주문을 처리하고 저장하는 API 엔드포인트입니다.
     * 프론트엔드에서 PortOne 결제 성공 콜백 시 호출됩니다.
     *
     * @param requestDto 결제 및 주문 정보를 담은 DTO
     * @param userDetails 현재 로그인된 사용자 정보 (Spring Security를 통해 주입)
     * @return 성공 시 생성된 주문 정보 DTO와 HTTP 200 OK, 실패 시 에러 메시지와 적절한 HTTP 상태 코드 반환
     */
    @PostMapping("/purchase")
    public ResponseEntity<?> processPaymentAndSaveOrder( // 반환 타입을 와일드카드(?)로 하여 유연하게 응답
                                                         @RequestBody ApprovalOrderRequestDto requestDto,
                                                         @AuthenticationPrincipal UserDetails userDetails
    ) {
        try {
            // Spring Security UserDetails에서 사용자 ID (username)를 추출합니다.
            String userId = userDetails.getUsername();

            // ApprovalService의 통합 메서드를 호출하여 결제 처리 및 주문 저장을 수행합니다.
            // 이 메서드 내부에서 주소 처리, 주문 엔티티 생성, 주문 상품 엔티티 생성 및 저장이 모두 이루어집니다.
            ApprovalOrderResponseDto responseDto = approvalService.processPaymentAndSaveOrder(requestDto, userId);

            // 성공적으로 처리된 경우, 생성된 주문 정보를 담은 DTO와 HTTP 200 OK를 반환합니다.
            return ResponseEntity.ok(responseDto);

        } catch (EntityNotFoundException e) {
            // 사용자 또는 기본 주소를 찾을 수 없는 경우
            // 예: "사용자를 찾을 수 없습니다: [userId]", "기본 배송지를 찾을 수 없습니다..."
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            // 유효하지 않은 요청 데이터 (예: 필수 필드 누락, 비즈니스 로직 상의 제약 위반)
            // 예: "기본 배송지를 찾을 수 없습니다. 새로운 주소를 입력하거나 기본 배송지를 설정해 주세요."
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            // 그 외 예상치 못한 모든 예외
            // 실제 운영 환경에서는 로그를 상세하게 남기는 것이 중요합니다.
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("주문 처리 중 서버 오류가 발생했습니다: " + e.getMessage());
        }
    }

    // 기존의 create-order와 processPayment 엔드포인트는 이 통합 로직에 의해 대체되므로 제거됩니다.
    // 만약 결제 전 주문 정보만 미리 생성하는 단계가 필요하다면, 별도의 API로 설계해야 합니다.
}
