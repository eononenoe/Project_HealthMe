package com.example.healthme.domain.result.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class NutrientResultDto {
    private int percent;           // 퍼센트
    private String description;    // 분석 설명
    private String tip;            // 개선 팁
    private List<String> foods;    // 추천 식품 목록
}