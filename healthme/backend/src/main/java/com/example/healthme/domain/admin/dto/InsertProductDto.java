package com.example.healthme.domain.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InsertProductDto {

    private String category;
    private String productName;
    private int productPrice;
    private int salePrice;
    private int amount;
    private String description;

    private MultipartFile image_url;  // 오직 썸네일만 사용
}

