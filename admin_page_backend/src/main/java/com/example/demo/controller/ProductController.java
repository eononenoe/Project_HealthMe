package com.example.demo.controller;


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

    @GetMapping("/dbpct")
    public List<Product> deleteLine(){
        List<Product> list = productService.selectAllProduct();
        if(!list.isEmpty()){
            return list; // 프론트에 JSON으로 전달된다.
        }
        return null;
    }

}
