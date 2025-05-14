package com.example.demo.domain.service;

import com.example.demo.domain.dto.InsertProductDto;
import com.example.demo.domain.entity.Product;
import com.example.demo.domain.repository.ProductRepository;

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
    public List<Product> selectAllProduct(){

        List<Product> list=productRepository.findAll();
        if (!list.isEmpty()){
            return list;
        }
        return null;

    }

    // 페이지네이션에 맞춰서 제품 가져오기
    public Page<Product> select_Page_Product(int page, int size){
        PageRequest pageRequest = PageRequest.of(page, size);

        return productRepository.findAllByOrderByNoDesc(pageRequest);
    }


    // 제품 등록하기
    public void insert_product(InsertProductDto insertProductDto){

        if (insertProductDto == null) return;

        // 1. 저장 경로 설정
        String saveDir = "C:/uploads/product/";
        new File(saveDir).mkdirs(); // 경로 없으면 생성

        // 2. 고유 파일명 생성
        String thumbFileName = System.currentTimeMillis() + "_" + insertProductDto.getThumbnail().getOriginalFilename();
        String detailFileName = System.currentTimeMillis() + "_" + insertProductDto.getDetailImage().getOriginalFilename();

        File thumbDest = new File(saveDir + thumbFileName);
        File detailDest = new File(saveDir + detailFileName);

        try {
            insertProductDto.getThumbnail().transferTo(thumbDest);
            insertProductDto.getDetailImage().transferTo(detailDest);
        } catch (IOException e) {
            e.printStackTrace();
            return; // 실패 시 중단
        }

        // 엔터티 생성 후 저장
        Product product = new Product();
        product.setProductName(insertProductDto.getProductName());
        product.setCategory(insertProductDto.getRegistCategory());
        product.setAmount(insertProductDto.getAmount());
        product.setDetailUrl("/images/product"+thumbFileName);
        product.setThumbnailUrl("/images/product"+detailFileName);
        product.setProductPrice(insertProductDto.getPrice());
        product.setDescription(insertProductDto.getDescription());

        productRepository.save(product);
        // insertProductDto는 InsertProductDto 이고 이걸 넣으면 안된다.
        // 왜냐하면 productRepository는 Product를 상속하기 때문이다.


    }

    // 제품 수정
    public boolean update_product(int no, InsertProductDto insertProductDto){

        Optional<Product> opProduct= productRepository.findById(no);
        Product product= opProduct.get(); // DB에 저장되어있는 데이터를 product에 저장
        if (insertProductDto!=null){ // product를 입력받은 insertProductDto로 다시 저장한 다음 수정.
            product.setCategory(insertProductDto.getRegistCategory());
            product.setProductName(insertProductDto.getProductName());
            product.setProductPrice(insertProductDto.getPrice());
            product.setAmount(insertProductDto.getAmount());

            productRepository.save(product); // 수정된다.
            return true;
        }
        return false;
    }

}
