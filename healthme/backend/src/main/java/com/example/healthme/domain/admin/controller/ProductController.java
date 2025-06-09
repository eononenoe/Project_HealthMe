package com.example.healthme.domain.admin.controller;


import com.example.healthme.domain.admin.dto.InsertProductDto;
import com.example.healthme.domain.admin.service.ProductService;
import com.example.healthme.domain.product.dto.ProductUpdateDto;
import com.example.healthme.domain.product.dto.ProductWithNutrientDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


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

    // 상품 수정
    @PutMapping("/{productId}")
    public ResponseEntity<?> update_product(@PathVariable Long productId, @ModelAttribute ProductUpdateDto productUpdateDto){
        System.out.println(productUpdateDto);
        System.out.println(productId);
        if(productService.update_product(productId,productUpdateDto)){
            return ResponseEntity.ok("수정완료");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("수정실패");
    }


    @PostMapping("/delete")
    public ResponseEntity<?> product_Delete(@RequestBody Long[] noArray) {
        boolean result = productService.product_delete(noArray);
        if (result) {
            return ResponseEntity.ok("삭제완료");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("삭제 실패");
    }


}
