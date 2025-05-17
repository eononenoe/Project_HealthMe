package com.example.demo.controller;

import com.example.demo.domain.entity.ProductEntity;
import com.example.demo.domain.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/product")
public class PaginationProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/pagination")
    public Page<ProductEntity> Select_PageContent(@RequestParam int page, @RequestParam int size){
         Page<ProductEntity> page_list= productService.select_Page_Product(page, size);

        return page_list;
    }


}
