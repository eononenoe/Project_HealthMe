package com.example.healthme.domain.product.controller;

import com.example.healthme.domain.product.entity.ProductNutrient;
import com.example.healthme.domain.product.repository.ProductNutrientRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/healthme/nutrients")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductNutrientController {

    private final ProductNutrientRepository nutrientRepository;

    public ProductNutrientController(ProductNutrientRepository nutrientRepository) {
        this.nutrientRepository = nutrientRepository;
    }

    @GetMapping("/{productId}")
    public List<ProductNutrient> getNutrientsByProductId(@PathVariable Long productId) {
        System.out.println(nutrientRepository.findByProductStore_ProductId(productId));
        return nutrientRepository.findByProductStore_ProductId(productId);

    }
}
