package com.example.healthme.domain.product.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductStore {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long productId;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private int price;

    @Column(name = "salprice")
    private int salprice;

    @Column(name = "amount")
    private int amount;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "detail_img")
    private String detailImg;

    @Column(name = "category")
    private String category;
    
    @Column(name = "sales_count")
    private int sales_count;

    // Nutrients: 양방향 관계 설정
    @OneToMany(mappedBy = "productStore", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<ProductNutrient> nutrients = new ArrayList<>();
}
