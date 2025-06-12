package com.example.healthme.domain.admin.repository;


import com.example.healthme.domain.product.entity.ProductStore;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<ProductStore, Long> {
    Page<ProductStore> findAllByOrderByProductIdDesc(Pageable pageable);
}

