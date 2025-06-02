package com.example.healthme.domain.product.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductNutrient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productNutrientId;

    private Long productId;

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