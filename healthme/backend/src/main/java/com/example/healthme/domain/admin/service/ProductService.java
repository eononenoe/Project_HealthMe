package com.example.healthme.domain.admin.service;

import com.example.healthme.domain.admin.dto.InsertProductDto;
import com.example.healthme.domain.admin.repository.ProductRepository;
import com.example.healthme.domain.product.dto.ProductUpdateDto;
import com.example.healthme.domain.product.dto.ProductWithNutrientDto;
import com.example.healthme.domain.product.entity.ProductNutrient;
import com.example.healthme.domain.product.entity.ProductStore;
import com.example.healthme.domain.product.repository.ProductNutrientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service

public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductNutrientRepository nutrientRepository;
    // 모든 제품 다 가져오기
    public List<ProductStore> selectAllProduct(){

        List<ProductStore> list=productRepository.findAll();
        if (!list.isEmpty()){
            return list;
        }
        return null;

    }

    // 페이지네이션에 맞춰서 제품 가져오기
    public Page<ProductWithNutrientDto> select_Page_Product(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "productId"));
        Page<ProductStore> productPage = productRepository.findAll(pageRequest);

        return productPage.map(product -> {
            List<ProductNutrient> nutrientList = nutrientRepository.findByProductStore_ProductId(product.getProductId());

            // 첫 번째 영양소만 사용한다고 가정
            ProductNutrient nutrient = !nutrientList.isEmpty() ? nutrientList.get(0) : null;

            return ProductWithNutrientDto.builder()
                    .productId(product.getProductId())
                    .name(product.getName())
                    .category(product.getCategory())
                    .description(product.getDescription())
                    .amount(product.getAmount())
                    .price(product.getPrice())
                    .salprice(product.getSalprice())
                    .imageUrl(product.getImageUrl()) // 수정 시만 사용, 조회에서는 null
                    .protein(nutrient != null ? nutrient.getProtein() : "")
                    .iron(nutrient != null ? nutrient.getIron() : "")
                    .vitaminD(nutrient != null ? nutrient.getVitaminD() : "")
                    .calcium(nutrient != null ? nutrient.getCalcium() : "")
                    .dietaryFiber(nutrient != null ? nutrient.getDietaryFiber() : "")
                    .magnesium(nutrient != null ? nutrient.getMagnesium() : "")
                    .potassium(nutrient != null ? nutrient.getPotassium() : "")
                    .biotin(nutrient != null ? nutrient.getBiotin() : "")
                    .zinc(nutrient != null ? nutrient.getZinc() : "")
                    .arginine(nutrient != null ? nutrient.getArginine() : "")
                    .build();
        });
    }


    // 제품 등록하기
    public void insert_product(InsertProductDto insertProductDto) {
        if (insertProductDto == null) return;

        String saveDir = "C:/uploads/product/";
        new File(saveDir).mkdirs();

        // 썸네일 저장
        String thumbFileName = System.currentTimeMillis() + "_" +
                insertProductDto.getImage_url().getOriginalFilename();
        File thumbDest = new File(saveDir + thumbFileName);
        try {
            insertProductDto.getImage_url().transferTo(thumbDest);
        } catch (IOException e) {
            e.printStackTrace();
            return;
        }

        // ProductStore 저장
        ProductStore product = new ProductStore();
        product.setName(insertProductDto.getProductName());
        product.setCategory(insertProductDto.getCategory());
        product.setAmount(insertProductDto.getAmount());
        product.setPrice(insertProductDto.getProductPrice());
        product.setSalprice(insertProductDto.getSalePrice());
        product.setDescription(insertProductDto.getDescription());
        product.setImageUrl("/images/product/" + thumbFileName);

        productRepository.save(product);

        // ProductNutrient 저장
        // ProductNutrient 저장
        ProductNutrient nutrient = ProductNutrient.builder()
                .productStore(product)  // 수정: productId -> productStore
                .protein(insertProductDto.getProtein())
                .iron(insertProductDto.getIron())
                .vitaminD(insertProductDto.getVitaminD())
                .calcium(insertProductDto.getCalcium())
                .dietaryFiber(insertProductDto.getDietaryFiber())
                .magnesium(insertProductDto.getMagnesium())
                .potassium(insertProductDto.getPotassium())
                .biotin(insertProductDto.getBiotin())
                .zinc(insertProductDto.getZinc())
                .arginine(insertProductDto.getArginine())
                .build();


        nutrientRepository.save(nutrient);
    }




    // 제품 수정
    public boolean update_product(Long productId, ProductUpdateDto productUpdateDto) {
        // 1. 상품 정보 가져오기
        Optional<ProductStore> productOptional = productRepository.findById(productId);
        if (productOptional.isEmpty()) return false;
        ProductStore product = productOptional.get();

        // 2. 영양소 정보 가져오기 (List로 받기)
        List<ProductNutrient> nutrientList = nutrientRepository.findByProductStore_ProductId(productId);
        if (nutrientList.isEmpty()) return false;

        // 첫 번째 영양소 수정 (단일 영양소만 관리한다고 가정)
        ProductNutrient productNutrient = nutrientList.get(0);

        // 3. 상품 정보 업데이트
        product.setName(productUpdateDto.getName());
        product.setCategory(productUpdateDto.getCategory());
        product.setAmount(productUpdateDto.getAmount());
        product.setPrice(productUpdateDto.getPrice());
        product.setSalprice(productUpdateDto.getSalprice());
        product.setDescription(productUpdateDto.getDescription());

        // 4. 영양소 정보 업데이트
        productNutrient.setArginine(productUpdateDto.getArginine());
        productNutrient.setIron(productUpdateDto.getIron());
        productNutrient.setBiotin(productUpdateDto.getBiotin());
        productNutrient.setCalcium(productUpdateDto.getCalcium());
        productNutrient.setMagnesium(productUpdateDto.getMagnesium());
        productNutrient.setPotassium(productUpdateDto.getPotassium());
        productNutrient.setProtein(productUpdateDto.getProtein());
        productNutrient.setDietaryFiber(productUpdateDto.getDietaryFiber());
        productNutrient.setVitaminD(productUpdateDto.getVitaminD());
        productNutrient.setZinc(productUpdateDto.getZinc());

        nutrientRepository.save(productNutrient);

        // 5. 이미지가 있는 경우 저장
        String saveDir = "C:/uploads/product/";
        new File(saveDir).mkdirs();

        try {
            if (productUpdateDto.getImageUrl() != null && !productUpdateDto.getImageUrl().isEmpty()) {
                String thumbFileName = System.currentTimeMillis() + "_" + productUpdateDto.getImageUrl().getOriginalFilename();
                productUpdateDto.getImageUrl().transferTo(new File(saveDir + thumbFileName));
                product.setImageUrl("/images/product/" + thumbFileName);
            }
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }

        // 6. 최종 저장
        productRepository.save(product);
        return true;
    }






    @Transactional
    public boolean product_delete(Long[] noArray) {
        if (noArray == null || noArray.length == 0) return false;

        for (Long no : noArray) {
            // 1. nutrient 먼저 삭제
            nutrientRepository.deleteByProductStore_ProductId(no);

            // 2. product 삭제
            productRepository.deleteById(no);
        }

        return true;
    }

}
