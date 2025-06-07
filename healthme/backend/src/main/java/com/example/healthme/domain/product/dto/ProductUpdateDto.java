package com.example.healthme.domain.product.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductUpdateDto {
    private String name;
    private String description;
    private int price;
    private int salprice;
    private int amount;
    private String category;
    private MultipartFile imageUrl;

    private String protein;
    private String iron;
    private String vitaminD;
    private String calcium;
    private String dietaryFiber;
    private String magnesium;
    private String potassium;
    private String biotin;
    private String zinc;
    private String arginine;
}

