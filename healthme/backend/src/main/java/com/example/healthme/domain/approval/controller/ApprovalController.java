package com.example.healthme.domain.approval.controller;

import com.example.healthme.domain.approval.service.ApprovalService;
import com.example.healthme.domain.mypage.dto.AddressUpdate;
import com.example.healthme.global.config.auth.principal.PrincipalDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/approval")
public class ApprovalController {

    @Autowired
    private ApprovalService approvalService;

    @GetMapping("/default-address")
    public ResponseEntity<AddressUpdate> getDefaultAddress(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        if (principalDetails == null) {
            System.out.println("PrincipalDetails is null");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null); // 인증되지 않은 경우
        }
        Long id = principalDetails.getUserDto().getId(); // 또는 .getUser().getUserid();
        System.out.println("id"+id);
        AddressUpdate dto = approvalService.getDefaultAddressByUserId(id);
        return ResponseEntity.ok(dto);
    }

}
