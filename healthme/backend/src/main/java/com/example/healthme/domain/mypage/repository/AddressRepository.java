package com.example.healthme.domain.mypage.repository;

import com.example.healthme.domain.approval.entity.ApprovalOrder;
import com.example.healthme.domain.mypage.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address,Long> {

    List<Address> findByUserId(Long user_id);


}
