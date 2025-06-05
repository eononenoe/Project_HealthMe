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

        return products.stream().map(product -> {
            List<ProductNutrient> nutrients = nutrientRepository.findByProductId(product.getProductId());

            System.out.println("찾은 productId: " + product.getProductId());
            if (nutrients == null || nutrients.isEmpty()) {
                System.out.println("영양성분 없음");
            } else {
                System.out.println("영양성분 있음: " + nutrients.get(0).getProtein());
            }

            ProductNutrient nutrient = (nutrients != null && !nutrients.isEmpty()) ? nutrients.get(0) : null;

            return ProductWithNutrientDto.builder()
                    .productId(product.getProductId())
                    .name(product.getName())
                    .description(product.getDescription())
                    .price(product.getPrice())
                    .salprice(product.getSalprice())
                    .amount(product.getAmount())
                    .imageUrl(product.getImageUrl())
                    .category(product.getCategory())
                    .sales_count(product.getSales_count())
                    .productNutrientId(nutrient != null ? nutrient.getProductNutrientId() : null)
                    .protein(nutrient != null ? nutrient.getProtein() : null)
                    .iron(nutrient != null ? nutrient.getIron() : null)
                    .vitaminD(nutrient != null ? nutrient.getVitaminD() : null)
                    .calcium(nutrient != null ? nutrient.getCalcium() : null)
                    .dietaryFiber(nutrient != null ? nutrient.getDietaryFiber() : null)
                    .magnesium(nutrient != null ? nutrient.getMagnesium() : null)
                    .potassium(nutrient != null ? nutrient.getPotassium() : null)
                    .biotin(nutrient != null ? nutrient.getBiotin() : null)
                    .zinc(nutrient != null ? nutrient.getZinc() : null)
                    .arginine(nutrient != null ? nutrient.getArginine() : null)
                    .nutrients(nutrient != null
                            ? List.of(
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
                            .map(String::trim)
                            .filter(v -> v != null && !v.isEmpty()
                                    && !v.equalsIgnoreCase("0g")
                                    && !v.equalsIgnoreCase("0mg")
                                    && !v.equalsIgnoreCase("0μg"))
                            .toList()
                            : List.of())
                    .build();

        }).collect(Collectors.toList());
    }
}
