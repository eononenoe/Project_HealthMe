package com.example.healthme.domain.product.controller;

import com.example.healthme.domain.product.entity.ProductNutrient;
import com.example.healthme.domain.product.repository.ProductNutrientRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/healthme/nutrients")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductNutrientController {

    private final ProductNutrientRepository nutrientRepository;

    public ProductNutrientController(ProductNutrientRepository nutrientRepository) {
        this.nutrientRepository = nutrientRepository;
    }

    @GetMapping("/{productId}")
    public ProductNutrient getNutrientByProductId(@PathVariable Long productId) {
        return nutrientRepository.findByProductId(productId);
    }
}
