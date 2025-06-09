package com.example.healthme.domain.product.repository;

import com.example.healthme.domain.product.entity.ProductNutrient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductNutrientRepository extends JpaRepository<ProductNutrient, Long> {
        List<ProductNutrient> findByProductStore_ProductId(Long productId);
        //Optional<ProductNutrient> findByProductStore_ProductId(Long productId);
        void deleteByProductStore_ProductId(Long productId);
}

