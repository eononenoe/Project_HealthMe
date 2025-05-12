package com.example.demo.controller;

import com.example.demo.domain.entity.Product;
import com.example.demo.domain.repository.ProductRepository;
import com.example.demo.domain.service.ProductService;
import org.eclipse.tags.shaded.org.apache.xpath.operations.Mod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
public class PaginationController {

    @Autowired
    private ProductService productService;


    @GetMapping("/pagination")
    public Page<Product> Select_PageContent(@RequestParam int page, @RequestParam int size){
         Page<Product> page_list= productService.select_Page_Product(page, size);


        return page_list;
    }


}
