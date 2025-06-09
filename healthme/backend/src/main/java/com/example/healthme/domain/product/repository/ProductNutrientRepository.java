package com.example.healthme.domain.product.repository;

import com.example.healthme.domain.product.entity.ProductNutrient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductNutrientRepository extends JpaRepository<ProductNutrient, Long> {
    // 연관관계를 따라가는 올바른 메서드 이름
    List<ProductNutrient> findByProductStore_ProductId(Long productId);
}

