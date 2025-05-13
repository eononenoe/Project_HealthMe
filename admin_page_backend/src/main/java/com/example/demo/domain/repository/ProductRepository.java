package com.example.demo.domain.repository;

import com.example.demo.domain.entity.Product;
import com.example.demo.domain.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product,Integer> {

    Page<Product> findAllByOrderByNoDesc(Pageable pageable);
}
