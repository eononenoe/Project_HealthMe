package com.example.healthme.domain.product.repository;

import com.example.healthme.domain.product.entity.ProductNutrient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
<<<<<<< HEAD
import java.util.Optional;

@Repository
public interface ProductNutrientRepository extends JpaRepository<ProductNutrient, Long> {
    //List<ProductNutrient> findByProductId(Long productId);
    Optional<ProductNutrient> findByProductId(Long productId);
    void deleteByProductId(Long productId);


=======

@Repository
public interface ProductNutrientRepository extends JpaRepository<ProductNutrient, Long> {
    // 연관관계를 따라가는 올바른 메서드 이름
    List<ProductNutrient> findByProductStore_ProductId(Long productId);
>>>>>>> bdc9346857e2a4c554b5feecb5013b6ca28bd68b
}

