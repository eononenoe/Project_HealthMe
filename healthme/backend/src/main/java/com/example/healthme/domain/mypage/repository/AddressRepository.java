package com.example.healthme.domain.mypage.repository;

import com.example.healthme.domain.mypage.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address,Long> {
}
