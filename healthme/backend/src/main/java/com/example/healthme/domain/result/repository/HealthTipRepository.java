package com.example.healthme.domain.result.repository;

import com.example.healthme.domain.result.entity.HealthTip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HealthTipRepository extends JpaRepository<HealthTip, Long> {
    @Query(value = "SELECT * FROM health_tip WHERE category = :category ORDER BY RAND() LIMIT 20", nativeQuery = true)
    List<HealthTip> findRandomByCategory(@Param("category") String category);
}
