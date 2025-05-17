package com.example.demo.domain.repository;

import com.example.demo.domain.entity.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity,Integer> {

    Page<ProductEntity> findAllByOrderByNoDesc(Pageable pageable);
}
