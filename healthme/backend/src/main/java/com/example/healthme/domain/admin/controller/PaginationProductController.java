package com.example.healthme.domain.admin.controller;

import com.example.healthme.domain.admin.service.ProductService;
import com.example.healthme.domain.product.dto.ProductWithNutrientDto;
import com.example.healthme.domain.product.entity.ProductStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/product")
public class PaginationProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/pagination")
    public Page<ProductWithNutrientDto> Select_PageContent(@RequestParam int page, @RequestParam int size){
         Page<ProductWithNutrientDto> page_list= productService.select_Page_Product(page, size);

        return page_list;
    }
}
