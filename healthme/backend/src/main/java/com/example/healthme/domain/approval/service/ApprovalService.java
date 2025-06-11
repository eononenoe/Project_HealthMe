package com.example.healthme.domain.approval.service;

import com.example.healthme.domain.approval.dto.ApprovalOrderItemDto;
import com.example.healthme.domain.approval.dto.ApprovalOrderRequestDto;
import com.example.healthme.domain.approval.dto.ApprovalOrderResponseDto;
import com.example.healthme.domain.approval.entity.ApprovalOrder;
import com.example.healthme.domain.approval.entity.ApprovalOrderItem;
import com.example.healthme.domain.approval.repository.ApprovalOrderItemRepository;
import com.example.healthme.domain.approval.repository.ApprovalOrderRepository;
import com.example.healthme.domain.mypage.dto.AddressUpdate;
import com.example.healthme.domain.mypage.entity.Address;
import com.example.healthme.domain.mypage.repository.AddressRepository;
import com.example.healthme.domain.user.entity.User;
import com.example.healthme.domain.user.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ApprovalService {

    private final ApprovalOrderRepository approvalOrderRepository;
    private final ApprovalOrderItemRepository approvalOrderItemRepository;
    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    @Transactional
    public ApprovalOrderResponseDto processPaymentAndSaveOrder(ApprovalOrderRequestDto requestDto, String userId) {
        // user ID(String)를 기반으로 User 엔티티를 조회합니다.
        // User 엔티티의 getId() 메서드를 통해 Long 타입의 user_id를 얻을 수 있습니다.
        User currentUser = userRepository.findByUserid(userId)
                .orElseThrow(() -> new EntityNotFoundException("사용자를 찾을 수 없습니다: " + userId));

        // 1. 주소 처리
        Address orderAddress;
        if (requestDto.getAddress() != null) {
            // ApprovalOrderRequestDto 내의 AddressUpdate DTO를 사용하여 새로운 주소 생성
            AddressUpdate newAddressDto = requestDto.getAddress();
            Address newAddress = Address.builder()
                    .user(currentUser) // User 엔티티와 연결
                    .recipient(newAddressDto.getRecipient())
                    .zip(newAddressDto.getZonecode())
                    .address(newAddressDto.getAddress())
                    .addressDetail(newAddressDto.getAddressDetail())
                    .recipientPhone(newAddressDto.getTel())
                    .isDefault(false) // 새로 입력된 주소는 기본값이 아니라고 가정
                    .build();
            orderAddress = addressRepository.save(newAddress);
        } else {
            // 사용자의 기본 주소를 DB에서 조회합니다.
            // findByUserId를 사용할 수 있지만, 기본 주소를 찾아야 하므로 isDefault 필드도 사용합니다.
            // AddressRepository에 findByUserAndIsDefault(User user, Boolean isDefault) 메서드가
            // 이미 추가되었거나 추가되어야 합니다.
            Optional<Address> defaultAddressOptional = addressRepository.findByUserAndIsDefault(currentUser, true);

            if (defaultAddressOptional.isPresent()) {
                orderAddress = defaultAddressOptional.get();
            } else {
                // 기본 주소가 없는 경우, 사용자의 모든 주소 중 첫 번째 주소를 사용하거나 예외를 발생시킬 수 있습니다.
                // 여기서는 예외를 발생시켜 주소 선택을 강제합니다.
                throw new IllegalArgumentException("기본 배송지를 찾을 수 없습니다. 새로운 주소를 입력하거나 기본 배송지를 설정해 주세요.");
            }
        }

        // 2. ApprovalOrder 엔티티 생성
        ApprovalOrder approvalOrder = ApprovalOrder.builder()
                .userid(userId) // 사용자 ID는 String으로 유지
                .orderDate(LocalDateTime.now())
                .status("결제완료")
                .paymentMethod("card")
                .totalPrice(requestDto.getTotalPrice())
                .isCanceled(false)
                .isCompleted(false)
                .refundRequested(false)
                .returnRequested(false)
                .address(orderAddress) // 처리된 주소 엔티티 연결
                .build();

        // 3. ApprovalOrder 저장 (orderId 생성)
        approvalOrder = approvalOrderRepository.save(approvalOrder);

        // 4. ApprovalOrderItem 엔티티 생성 및 저장
        ApprovalOrder finalApprovalOrder = approvalOrder;
        List<ApprovalOrderItem> orderItems = requestDto.getItems().stream()
                .map(itemDto -> {
                    // **참고**: 실제 운영 환경에서는 상품 정보(가격, 이름 등)를
                    // ProductRepository에서 직접 조회하여 사용하는 것이 안전합니다.
                    // 클라이언트에서 전달된 값을 그대로 사용하면 보안에 취약할 수 있습니다.
                    int price = itemDto.getPrice();
                    int discountPrice = itemDto.getDiscountPrice();
                    int quantity = itemDto.getQuantity();

                    int unitPrice = discountPrice; // 할인된 가격을 단가로 사용
                    int itemTotal = unitPrice * quantity; // 상품별 총 가격

                    return ApprovalOrderItem.builder()
                            .order(finalApprovalOrder)
                            .productId(itemDto.getProductId())
                            .productName(itemDto.getProductName())
                            .quantity(quantity)
                            .price(price)
                            .discountPrice(discountPrice)
                            .unitPrice(unitPrice)
                            .itemTotal(itemTotal)
                            .build();
                })
                .collect(Collectors.toList());

        approvalOrderItemRepository.saveAll(orderItems);

        // 응답 DTO 생성을 위해 주문 항목들을 주문 엔티티에 설정
        approvalOrder.setApprovalOrderItems(orderItems);

        // 5. ApprovalOrderResponseDto 생성 및 반환
        return ApprovalOrderResponseDto.fromEntity(approvalOrder);
    }

    /**
     * 특정 사용자 ID를 통해 해당 사용자의 기본 배송지 정보를 조회합니다.
     *
     * @param userId 조회할 사용자의 Long 타입 ID
     * @return 기본 배송지 정보를 담은 AddressUpdate DTO. 기본 배송지가 없으면 예외 발생.
     * @throws EntityNotFoundException 사용자를 찾을 수 없거나 기본 배송지가 없는 경우
     */
    @Transactional(readOnly = true) // 읽기 전용 트랜잭션으로 설정
    public AddressUpdate getDefaultAddressByUserId(Long userId) {
        // 1. Long 타입의 userId를 사용하여 User 엔티티 조회
        User user = userRepository.findById(userId) // JpaRepository의 기본 findById 사용
                .orElseThrow(() -> new EntityNotFoundException("ID가 " + userId + "인 사용자를 찾을 수 없습니다."));

        // 2. 해당 User의 기본 배송지 조회
        Address defaultAddress = addressRepository.findByUserAndIsDefault(user, true)
                .orElseThrow(() -> new EntityNotFoundException("사용자 ID: " + userId + "에 대한 기본 배송지를 찾을 수 없습니다."));

        // 3. 조회된 Address 엔티티를 AddressUpdate DTO로 변환
        // AddressUpdate DTO의 생성자를 활용합니다.
        // 이 생성자가 엔티티의 필드와 DTO의 필드를 올바르게 매핑해줍니다.
        return new AddressUpdate(defaultAddress);
    }
}