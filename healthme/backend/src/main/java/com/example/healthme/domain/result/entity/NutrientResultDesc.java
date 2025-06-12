package com.example.healthme.domain.result.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "nutrient_result_desc")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NutrientResultDesc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nutrientName;

    private int rangeStart;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String tip;

    @Column(columnDefinition = "TEXT")
    private String foods;

    @Column(columnDefinition = "TEXT")
    private String info;
}