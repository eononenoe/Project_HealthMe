package com.example.healthme.domain.product.repository;

import com.example.healthme.domain.product.entity.ProductNutrient;
import com.example.healthme.domain.product.entity.ProductStore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface ProductStoreRepository extends JpaRepository<ProductStore, Long> {
    Optional<ProductStore> findByProductId(Long productId);
}