package com.example.healthme.domain.result.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductRecommendationDto {
    private Long productId;
    private String name;
    private String imageUrl;
    private String category;
    private Double score;
}