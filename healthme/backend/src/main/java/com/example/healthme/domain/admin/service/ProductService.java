package com.example.healthme.domain.admin.service;

import com.example.healthme.domain.admin.dto.InsertProductDto;
import com.example.healthme.domain.admin.repository.ProductRepository;
import com.example.healthme.domain.product.entity.ProductStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service

public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    // 모든 제품 다 가져오기
    public List<ProductStore> selectAllProduct(){

        List<ProductStore> list=productRepository.findAll();
        if (!list.isEmpty()){
            return list;
        }
        return null;

    }

    // 페이지네이션에 맞춰서 제품 가져오기
    public Page<ProductStore> select_Page_Product(int page, int size){
        PageRequest pageRequest = PageRequest.of(page, size);

        return productRepository.findAllByOrderByProductIdDesc(pageRequest);
    }


    // 제품 등록하기
    // 제품 등록하기
    public void insert_product(InsertProductDto insertProductDto) {
        if (insertProductDto == null) return;

        String saveDir = "C:/uploads/product/";
        new File(saveDir).mkdirs();

        // 썸네일 파일명
        String thumbFileName = System.currentTimeMillis() + "_" +
                insertProductDto.getImage_url().getOriginalFilename();

        File thumbDest = new File(saveDir + thumbFileName);

        try {
            // 썸네일 이미지 저장
            insertProductDto.getImage_url().transferTo(thumbDest);
        } catch (IOException e) {
            e.printStackTrace();
            return;
        }

        // DB 저장
        ProductStore product = new ProductStore();
        product.setName(insertProductDto.getProductName());
        product.setCategory(insertProductDto.getCategory());
        product.setAmount(insertProductDto.getAmount());
        product.setPrice(insertProductDto.getProductPrice());
        product.setSalprice(insertProductDto.getSalePrice());
        product.setDescription(insertProductDto.getDescription());

        // DB에는 썸네일 이미지 경로만 저장
        product.setImageUrl("/images/product/" + thumbFileName);

        productRepository.save(product);
    }



    // 제품 수정
    // 제품 수정하기
    public boolean update_product(Long no, InsertProductDto dto) {
        Optional<ProductStore> optional = productRepository.findById(no);
        if (optional.isEmpty()) {
            return false;
        }

        ProductStore product = optional.get();

        // 기본 필드 업데이트
        product.setName(dto.getProductName());
        product.setCategory(dto.getCategory());
        product.setAmount(dto.getAmount());
        product.setPrice(dto.getProductPrice());
        product.setSalprice(dto.getSalePrice());
        product.setDescription(dto.getDescription());

        String saveDir = "C:/uploads/product/";
        new File(saveDir).mkdirs();

        try {
            if (dto.getImage_url() != null && !dto.getImage_url().isEmpty()) {
                // null이 아닌지 확인 , 이미지 파일이 비어있지 않은지 확인
                String thumbFileName = System.currentTimeMillis() + "_" + dto.getImage_url().getOriginalFilename();
                dto.getImage_url().transferTo(new File(saveDir + thumbFileName));
                product.setImageUrl("/images/product/" + thumbFileName);
            }


        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }

        productRepository.save(product);
        return true;
    }




    public boolean product_delete(Long noArray[]) {
        if (noArray.length != 0){
            for (Long no : noArray){
                productRepository.deleteById(no);
            }
            return true;
        }
        return false;
    }
}
