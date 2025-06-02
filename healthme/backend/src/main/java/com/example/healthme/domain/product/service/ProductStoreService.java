package com.example.healthme.domain.product.service;

import com.example.healthme.domain.product.dto.ProductWithNutrientDto;
import com.example.healthme.domain.product.entity.ProductNutrient;
import com.example.healthme.domain.product.repository.ProductNutrientRepository;
import com.example.healthme.domain.product.repository.ProductStoreRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service("productAreaService")
public class ProductStoreService {

    private final ProductStoreRepository productStoreRepository;
    private final ProductNutrientRepository nutrientRepository;

    public ProductStoreService(ProductStoreRepository productStoreRepository,
                               ProductNutrientRepository nutrientRepository) {
        this.productStoreRepository = productStoreRepository;
        this.nutrientRepository = nutrientRepository;
    }

    public List<ProductWithNutrientDto> getAllProductDetails() {
        return productStoreRepository.findAll().stream().map(product -> {
            ProductNutrient nutrient = nutrientRepository.findByProductId(product.getProductId());
            return ProductWithNutrientDto.builder()
                    .productId(product.getProductId())
                    .name(product.getName())
                    .price(product.getPrice())
                    .salprice(product.getSalprice())
                    .imageUrl(product.getImageUrl())
                    .category(product.getCategory())
                    .nutrient(nutrient)
                    .build();
        }).collect(Collectors.toList());
    }
}
