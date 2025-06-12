package com.example.healthme.domain.product.entity;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

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

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private ProductStore productStore;
    @Column(name = "protein")
    private String protein;
    @Column(name = "iron")
    private String iron;
    @Column(name = "vitamin_d")
    private String vitaminD;
    @Column(name = "calcium")
    private String calcium;
    @Column(name = "dietary_fiber")
    private String dietaryFiber;
    @Column(name = "magnesium")
    private String magnesium;
    @Column(name = "potassium")
    private String potassium;
    @Column(name = "biotin")
    private String biotin;
    @Column(name = "zinc")
    private String zinc;
    @Column(name = "arginine")
    private String arginine;
}
