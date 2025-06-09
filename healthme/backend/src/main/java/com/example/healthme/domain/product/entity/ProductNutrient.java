package com.example.healthme.domain.product.entity;

import jakarta.persistence.*;
import lombok.*;
<<<<<<< HEAD
=======
import com.fasterxml.jackson.annotation.JsonIgnore;
>>>>>>> bdc9346857e2a4c554b5feecb5013b6ca28bd68b

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
<<<<<<< HEAD
@Table(name = "product_nutrient")
=======
>>>>>>> bdc9346857e2a4c554b5feecb5013b6ca28bd68b
public class ProductNutrient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_nutrient_id")
    private Long productNutrientId;

<<<<<<< HEAD
    @Column(name = "product_id")
    private Long productId;

    private String protein;
=======
    @JsonIgnore // 순환 참조 방지 (필요 시 삭제 가능)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private ProductStore productStore;

    @Column(name = "protein")
    private String protein;

    @Column(name = "iron")
>>>>>>> bdc9346857e2a4c554b5feecb5013b6ca28bd68b
    private String iron;

    @Column(name = "vitamin_d")
    private String vitaminD;

<<<<<<< HEAD
=======
    @Column(name = "calcium")
>>>>>>> bdc9346857e2a4c554b5feecb5013b6ca28bd68b
    private String calcium;

    @Column(name = "dietary_fiber")
    private String dietaryFiber;

<<<<<<< HEAD
    private String magnesium;
    private String potassium;
    private String biotin;
    private String zinc;
=======
    @Column(name = "magnesium")
    private String magnesium;

    @Column(name = "potassium")
    private String potassium;

    @Column(name = "biotin")
    private String biotin;

    @Column(name = "zinc")
    private String zinc;

    @Column(name = "arginine")
>>>>>>> bdc9346857e2a4c554b5feecb5013b6ca28bd68b
    private String arginine;
}
