package com.example.demo.controller;


import com.example.demo.domain.dto.InsertProductDto;
import com.example.demo.domain.entity.Product;
import com.example.demo.domain.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/product")
public class ProductController {
    @Autowired
    private ProductService productService;

    @PostMapping("/insert/data")
    public void insertProduct(@ModelAttribute InsertProductDto insertProductDto){
        if (insertProductDto!=null){
            productService.insert_product(insertProductDto);
        }

    }

}
