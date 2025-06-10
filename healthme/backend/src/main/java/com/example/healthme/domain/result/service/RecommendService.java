package com.example.healthme.domain.result.service;

import com.example.healthme.domain.product.entity.ProductNutrient;
import com.example.healthme.domain.product.entity.ProductStore;
import com.example.healthme.domain.product.repository.ProductStoreRepository;
import com.example.healthme.domain.result.dto.NutrientResultDto;
import com.example.healthme.domain.result.dto.ProductRecommendationDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class RecommendService {

    private final NutrientResultService nutrientResultService;
    private final ProductStoreRepository productStoreRepository;
    private static final Map<String, Double> weightMap = Map.of(
            "단백질", 1.0,
            "철분", 5.0,
            "비타민 D", 15.0,
            "칼슘", 0.5,
            "식이섬유", 2.0,
            "마그네슘", 1.5,
            "칼륨", 0.5,
            "비오틴", 20.0,
            "아연", 2.0,
            "아르기닌", 1.0
    );
    public List<ProductRecommendationDto> recommend(Map<String, Integer> scoreMap) {
        Map<String, NutrientResultDto> summary = nutrientResultService.summarize(scoreMap);

        Map<String, Double> deficiency = new HashMap<>();
        for (Map.Entry<String, NutrientResultDto> entry : summary.entrySet()) {
            double def = 1.0 - (entry.getValue().getPercent() / 100.0);
            deficiency.put(entry.getKey(), def);
        }

        List<ProductStore> products = productStoreRepository.findAllWithNutrients();

        List<ProductRecommendationDto> result = new ArrayList<>();
        for (ProductStore p : products) {
            if (p.getNutrients().isEmpty()) continue;
            ProductNutrient n = p.getNutrients().get(0);  // 보통 1개만 있다고 가정

            double score =
                    deficiency.getOrDefault("단백질", 0.0)   * parseGram(n.getProtein())     * weightMap.get("단백질") +
                            deficiency.getOrDefault("철분", 0.0)     * parseMg(n.getIron())         * weightMap.get("철분") +
                            deficiency.getOrDefault("비타민 D", 0.0) * parseUg(n.getVitaminD())     * weightMap.get("비타민 D") +
                            deficiency.getOrDefault("칼슘", 0.0)     * parseMg(n.getCalcium())      * weightMap.get("칼슘") +
                            deficiency.getOrDefault("식이섬유", 0.0) * parseGram(n.getDietaryFiber()) * weightMap.get("식이섬유") +
                            deficiency.getOrDefault("마그네슘", 0.0) * parseMg(n.getMagnesium())    * weightMap.get("마그네슘") +
                            deficiency.getOrDefault("칼륨", 0.0)     * parseMg(n.getPotassium())    * weightMap.get("칼륨") +
                            deficiency.getOrDefault("비오틴", 0.0)   * parseUg(n.getBiotin())       * weightMap.get("비오틴") +
                            deficiency.getOrDefault("아연", 0.0)     * parseMg(n.getZinc())         * weightMap.get("아연") +
                            deficiency.getOrDefault("아르기닌", 0.0) * parseMg(n.getArginine())     * weightMap.get("아르기닌");

            result.add(new ProductRecommendationDto(
                    p.getProductId(),
                    p.getName(),
                    p.getImageUrl(),
                    p.getCategory(),
                    score
            ));
        }

        result.sort(Comparator.comparing(ProductRecommendationDto::getScore).reversed());
        return result;
    }

    private double parseGram(String val) {
        return parseUnit(val, "g");
    }

    private double parseMg(String val) {
        return parseUnit(val, "mg");
    }

    private double parseUg(String val) {
        return parseUnit(val, "μg");
    }

    private double parseUnit(String val, String unit) {
        if (val == null || val.isBlank()) return 0.0;
        try {
            return Double.parseDouble(val.replace(unit, "").trim());
        } catch (NumberFormatException e) {
            return 0.0;
        }
    }
}
