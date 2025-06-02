package com.example.healthme.domain.product.repository;


import com.example.healthme.domain.product.entity.ProductNutrient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductNutrientRepository extends JpaRepository<ProductNutrient, Long> {
    ProductNutrient findByProductId(Long productId);
}