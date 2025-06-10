package com.example.healthme.domain.result.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class NutrientResultDto {
    private int percent;
    private String description;
    private String tip;
    private List<String> foods;
    private String info;
}