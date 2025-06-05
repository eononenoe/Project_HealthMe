package com.example.healthme.domain.product.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "product_nutrient")
public class ProductNutrient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_nutrient_id")
    private Long productNutrientId;

    @Column(name = "product_id")
    private Long productId;

    private String protein;
    private String iron;

    @Column(name = "vitamin_d")
    private String vitaminD;

    private String calcium;

    @Column(name = "dietary_fiber")
    private String dietaryFiber;

    private String magnesium;
    private String potassium;
    private String biotin;
    private String zinc;
    private String arginine;
}
