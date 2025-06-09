package com.example.healthme.domain.product.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
<<<<<<< HEAD
import org.springframework.web.multipart.MultipartFile;
=======
>>>>>>> bdc9346857e2a4c554b5feecb5013b6ca28bd68b

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductWithNutrientDto {
<<<<<<< HEAD
    private Long productId;
=======
    @JsonProperty("product_id")
    private Long productId;

>>>>>>> bdc9346857e2a4c554b5feecb5013b6ca28bd68b
    private String name;
    private String description;
    private int price;
    private int salprice;
    private int amount;
<<<<<<< HEAD
    private String imageUrl;
    private String category;

=======

    @JsonProperty("image_url")
    private String imageUrl;

    @JsonProperty("detail_img")
    private String detailImg;

    private String category;

    @JsonProperty("sales_count")
    private int sales_count;

>>>>>>> bdc9346857e2a4c554b5feecb5013b6ca28bd68b
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
