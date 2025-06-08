package com.example.healthme.domain.product.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductWithNutrientDto {
    @JsonProperty("product_id")
    private Long productId;

    private String name;
    private String description;
    private int price;
    private int salprice;
    private int amount;

    @JsonProperty("image_url")
    private String imageUrl;

    @JsonProperty("detail_img")
    private String detailImg;

    private String category;

    @JsonProperty("sales_count")
    private int sales_count;

    @JsonProperty("product_nutrient_id")
    private Long productNutrientId;

    private String protein;
    private String iron;

    @JsonProperty("vitamin_d")
    private String vitaminD;

    private String calcium;

    @JsonProperty("dietary_fiber")
    private String dietaryFiber;

    private String magnesium;
    private String potassium;
    private String biotin;
    private String zinc;
    private String arginine;

    private List<String> nutrients;
}
