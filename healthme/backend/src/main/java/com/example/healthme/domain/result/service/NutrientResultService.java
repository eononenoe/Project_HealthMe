package com.example.healthme.domain.result.service;

import com.example.healthme.domain.result.dto.NutrientResultDto;
import com.example.healthme.domain.result.entity.NutrientResultDesc;
import com.example.healthme.domain.result.repository.NutrientResultDescRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class NutrientResultService {

    private final NutrientResultDescRepository descRepository;

    // 1. 영양소별 최대 점수 정의
    private static final Map<String, Integer> maxScoreMap = Map.of(
            "단백질", 18,
            "철분", 18,
            "비타민 D", 18,
            "칼슘", 12,
            "식이섬유", 12,
            "마그네슘", 12,
            "칼륨", 12,
            "비오틴", 12,
            "아연", 12,
            "아르기닌", 12
    );

    public Map<String, NutrientResultDto> summarize(Map<String, Integer> scoreMap) {
        Map<String, NutrientResultDto> result = new LinkedHashMap<>();

        for (Map.Entry<String, Integer> entry : scoreMap.entrySet()) {
            String nutrient = entry.getKey();
            int score = entry.getValue();

            // 2. 최대 점수 기준 퍼센트 계산
            int maxScore = maxScoreMap.getOrDefault(nutrient, 1);
            int percent = (int) Math.round((score * 100.0) / maxScore);
            int rangeStart = (percent / 20) * 20;

            // 3. DB에서 설명 조회
            String description = descRepository
                    .findByNutrientAndRange(nutrient, rangeStart)
                    .map(NutrientResultDesc::getDescription)
                    .orElse("설명을 찾을 수 없습니다.");

            // 4. 퍼센트 구간별 색상 결정
            String color = getColorByPercent(percent);

            NutrientResultDto dto = new NutrientResultDto(percent, description, color);
            result.put(nutrient, dto);
        }

        return result;
    }

    // 5. 퍼센트 기준 색상 매핑
    private String getColorByPercent(int percent) {
        if (percent <= 20) return "red";
        else if (percent <= 40) return "orange";
        else if (percent <= 60) return "yellow";
        else if (percent <= 80) return "green";
        else return "blue";
    }
}
