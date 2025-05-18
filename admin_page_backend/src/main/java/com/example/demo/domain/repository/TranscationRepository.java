package com.example.demo.domain.repository;

import com.example.demo.domain.entity.TransactionHistoryEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TranscationRepository extends JpaRepository<TransactionHistoryEntity,Integer> {

    Page<TransactionHistoryEntity> findByTranscationPeopleContaining(String searchText, Pageable pageable);

}
