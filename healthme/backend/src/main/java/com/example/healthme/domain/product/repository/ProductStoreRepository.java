package com.example.healthme.domain.product.repository;

import com.example.healthme.domain.product.entity.ProductStore;
import org.springframework.data.jpa.repository.JpaRepository;
<<<<<<< HEAD

public interface ProductStoreRepository extends JpaRepository<ProductStore, Long> {}
=======
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductStoreRepository extends JpaRepository<ProductStore, Long> {
    Optional<ProductStore> findByProductId(Long productId);
}
>>>>>>> bdc9346857e2a4c554b5feecb5013b6ca28bd68b
