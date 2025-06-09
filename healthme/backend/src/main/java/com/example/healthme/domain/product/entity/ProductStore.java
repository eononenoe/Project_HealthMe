package com.example.healthme.domain.product.entity;

<<<<<<< HEAD
import jakarta.persistence.*;
import lombok.*;

=======
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

>>>>>>> bdc9346857e2a4c554b5feecb5013b6ca28bd68b
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductStore {
<<<<<<< HEAD
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;
    private String name;
    private String description;
    private int price;
    private int salprice;
    private int amount;
    private String imageUrl;
    private String category;
=======

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
>>>>>>> bdc9346857e2a4c554b5feecb5013b6ca28bd68b
}
