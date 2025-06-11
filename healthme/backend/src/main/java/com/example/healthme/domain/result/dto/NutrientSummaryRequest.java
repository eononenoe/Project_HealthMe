package com.example.healthme.domain.result.dto;

import lombok.Getter;

import java.util.Map;

@Getter
public class NutrientSummaryRequest {
    private Map<String, Integer> scoreMap;
    private String gender;
}
