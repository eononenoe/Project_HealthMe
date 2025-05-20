package com.example.healthme.domain.admin.repository;

import com.example.healthme.domain.admin.entity.OrderEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TranscationRepository extends JpaRepository<OrderEntity,Integer> {

    Page<OrderEntity> findByTranscationPeopleContaining(String searchText, Pageable pageable);

}
