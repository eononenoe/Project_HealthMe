package com.example.demo.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InsertProductDto {
//    제품 등록폼에서 보내는 데이터 받는 dto

    private String registCategory;
    private String productName;
    private int price;
    private int amount;
    private String description;
    private MultipartFile thumbnail;
    private MultipartFile  detailImage;


}
