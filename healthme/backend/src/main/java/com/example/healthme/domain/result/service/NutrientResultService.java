package com.example.healthme.domain.result.service;

import com.example.healthme.domain.result.dto.NutrientResultDto;
import com.example.healthme.domain.result.entity.NutrientResultDesc;
import com.example.healthme.domain.result.repository.NutrientResultDescRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class NutrientResultService {

    private final NutrientResultDescRepository descRepository;

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

            int maxScore = maxScoreMap.getOrDefault(nutrient, 1);
            int percent = (int) Math.round((score * 100.0) / maxScore);
            int rangeStart = Math.min((percent / 20) * 20, 100);

            NutrientResultDesc desc = descRepository
                    .findByNutrientAndRange(nutrient, rangeStart)
                    .orElse(null);
            if (desc != null) {
                // foods는 문자열 → List<String> 변환
                List<String> foodsList = desc.getFoods() != null
                        ? Arrays.asList(desc.getFoods().split(","))
                        : List.of();

                NutrientResultDto dto = new NutrientResultDto(
                        percent,
                        desc.getDescription(),
                        desc.getTip(),
                        foodsList
                );
                result.put(nutrient, dto);
            } else {
                result.put(nutrient, new NutrientResultDto(percent, "설명을 찾을 수 없습니다.", null, List.of()));
            }
        }

        return result;
    }
}
