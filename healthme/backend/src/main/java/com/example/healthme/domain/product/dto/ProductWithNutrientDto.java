package com.example.healthme.domain.product.dto;

import com.example.healthme.domain.product.entity.ProductNutrient;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductWithNutrientDto {
    private Long productId;
    private String name;
    private int price;
    private int salprice;
    private String imageUrl;
    private String category;
    private ProductNutrient nutrient;
}