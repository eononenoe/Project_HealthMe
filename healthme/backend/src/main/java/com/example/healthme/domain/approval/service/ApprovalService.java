package com.example.healthme.domain.approval.service;

import com.example.healthme.domain.mypage.dto.AddressUpdate;
import com.example.healthme.domain.mypage.entity.Address;
import com.example.healthme.domain.mypage.repository.AddressRepository;
import com.example.healthme.domain.user.entity.User;
import com.example.healthme.domain.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authorization.method.AuthorizeReturnObject;
import org.springframework.stereotype.Service;

@Service
public class ApprovalService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AddressRepository addressRepository;

    public AddressUpdate getDefaultAddressByUserId(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("사용자 없음"));
        System.out.println("가져와지나 : "+user);
        Address addr = user.getDefaultAddress();
        Long addrId = addr.getAddressId(); // addrId 뽑아오기
        Address address = addressRepository.findById(addrId) // Address엔터티에서 address_id를 기준으로 데이터 가져오기
                .orElseThrow(() -> new RuntimeException("기본 배송지 없음"));

        return new AddressUpdate(address);
    }
}
