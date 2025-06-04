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
        var products = productStoreRepository.findAll();
        System.out.println("DB에서 불러온 상품 수: " + products.size());
        for (var p : products) {
            System.out.println("상품: " + p.getProductId() + " / " + p.getName());
        }
        List<ProductWithNutrientDto> result = products.stream().map(product -> {
            ProductNutrient nutrient = nutrientRepository.findByProductId(product.getProductId());
            if (nutrient == null) {
                System.out.println("해당 영양정보 없음: " + product.getProductId());
            }
            // 영양소 제외하고 상품 정보만 DTO로 리턴
            return ProductWithNutrientDto.builder()
                    .productId(product.getProductId())
                    .name(product.getName())
                    .price(product.getPrice())
                    .salprice(product.getSalprice())
                    .imageUrl(product.getImageUrl())
                    .category(product.getCategory())
                    .build();
        }).collect(Collectors.toList());

        System.out.println("반환할 상품 리스트: " + result.size());
        return result;
    }
}
