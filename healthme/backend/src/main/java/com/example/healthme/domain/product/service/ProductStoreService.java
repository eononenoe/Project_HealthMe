package com.example.healthme.domain.product.service;

import com.example.healthme.domain.product.dto.ProductWithNutrientDto;
import com.example.healthme.domain.product.entity.ProductNutrient;
import com.example.healthme.domain.product.entity.ProductStore;
import com.example.healthme.domain.product.repository.ProductNutrientRepository;
import com.example.healthme.domain.product.repository.ProductStoreRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
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
        List<ProductStore> products = productStoreRepository.findAll();

        return products.stream().map(product -> {
            Optional<ProductNutrient> optional = nutrientRepository.findByProductId(product.getProductId());

            if (optional.isEmpty()) {
                System.out.println("productId: " + product.getProductId() + " → 영양성분 없음");
                return ProductWithNutrientDto.builder()
                        .productId(product.getProductId())
                        .name(product.getName())
                        .description(product.getDescription())
                        .price(product.getPrice())
                        .salprice(product.getSalprice())
                        .amount(product.getAmount())
                        .imageUrl(product.getImageUrl())
                        .category(product.getCategory())
                        .nutrients(Collections.emptyList()) // 빈 리스트 반환
                        .build();
            }

            ProductNutrient nutrient = optional.get();

            System.out.println("productId: " + product.getProductId() + " → 영양성분 있음");

            return ProductWithNutrientDto.builder()
                    .productId(product.getProductId())
                    .name(product.getName())
                    .description(product.getDescription())
                    .price(product.getPrice())
                    .salprice(product.getSalprice())
                    .amount(product.getAmount())
                    .imageUrl(product.getImageUrl())
                    .category(product.getCategory())
                    .productNutrientId(nutrient.getProductNutrientId())
                    .protein(nutrient.getProtein())
                    .iron(nutrient.getIron())
                    .vitaminD(nutrient.getVitaminD())
                    .calcium(nutrient.getCalcium())
                    .dietaryFiber(nutrient.getDietaryFiber())
                    .magnesium(nutrient.getMagnesium())
                    .potassium(nutrient.getPotassium())
                    .biotin(nutrient.getBiotin())
                    .zinc(nutrient.getZinc())
                    .arginine(nutrient.getArginine())
                    .nutrients(
                            List.of(
                                            nutrient.getProtein(),
                                            nutrient.getIron(),
                                            nutrient.getCalcium(),
                                            nutrient.getVitaminD(),
                                            nutrient.getDietaryFiber(),
                                            nutrient.getMagnesium(),
                                            nutrient.getPotassium(),
                                            nutrient.getBiotin(),
                                            nutrient.getZinc(),
                                            nutrient.getArginine()
                                    ).stream()
                                    .map(v -> v != null ? v.trim() : "")
                                    .filter(v -> !v.isEmpty()
                                            && !v.equalsIgnoreCase("0g")
                                            && !v.equalsIgnoreCase("0mg")
                                            && !v.equalsIgnoreCase("0μg"))
                                    .collect(Collectors.toList())
                    )
                    .build();
        }).collect(Collectors.toList());
    }
}
