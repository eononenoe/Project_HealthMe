package com.example.demo.domain.service;

import com.example.demo.domain.entity.Product;
import com.example.demo.domain.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<Product> selectAllProduct(){

        List<Product> list=productRepository.findAll();
        if (!list.isEmpty()){
            return list;
        }
        return null;
    }

}
