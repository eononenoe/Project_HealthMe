package com.example.healthme.domain.result.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "health_tip")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class HealthTip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String category;
    private String icon;
    private String title;
    private String description;
}