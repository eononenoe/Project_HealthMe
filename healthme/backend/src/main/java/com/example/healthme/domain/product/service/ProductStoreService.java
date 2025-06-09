package com.example.healthme.domain.product.service;

import com.example.healthme.domain.product.dto.ProductWithNutrientDto;
import com.example.healthme.domain.product.entity.ProductStore;
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

    //  전체 상품 조회 + 영양소 포함
    public List<ProductWithNutrientDto> getAllProductDetails() {
        return productStoreRepository.findAll().stream()
                .map(product -> {
                    List<ProductNutrient> nutrients = nutrientRepository.findByProductStore_ProductId(product.getProductId());
                    ProductNutrient nutrient = (!nutrients.isEmpty()) ? nutrients.get(0) : null;
                    return mapToDto(product, nutrient);
                })
                .collect(Collectors.toList());
    }

    //  개별 상품 조회 + 영양소 포함
    public ProductWithNutrientDto getProductDetail(Long productId) {
        ProductStore product = productStoreRepository.findByProductId(productId)
                .orElseThrow(() -> new RuntimeException("상품을 찾을 수 없습니다."));

        List<ProductNutrient> nutrients = nutrientRepository.findByProductStore_ProductId(productId);
        ProductNutrient nutrient = (!nutrients.isEmpty()) ? nutrients.get(0) : null;

        return mapToDto(product, nutrient);
    }

    //  공통 DTO 변환 메서드
    private ProductWithNutrientDto mapToDto(ProductStore product, ProductNutrient nutrient) {
        return ProductWithNutrientDto.builder()
                .productId(product.getProductId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .salprice(product.getSalprice())
                .amount(product.getAmount())
                .imageUrl(product.getImageUrl())
                .detailImg(product.getDetailImg())
                .category(product.getCategory())
                .sales_count(product.getSales_count())
                .productNutrientId(nutrient != null ? nutrient.getProductNutrientId() : null)
                .protein(nutrient != null ? String.valueOf(nutrient.getProtein()) : null)
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
    }
}
