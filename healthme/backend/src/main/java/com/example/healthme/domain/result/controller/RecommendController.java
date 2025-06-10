package com.example.healthme.domain.result.controller;

import com.example.healthme.domain.result.dto.ProductRecommendationDto;
import com.example.healthme.domain.result.service.RecommendService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/healthme/recommend")
public class RecommendController {

    private final RecommendService recommendService;

    @PostMapping
    public List<ProductRecommendationDto> getRecommendations(@RequestBody Map<String, Integer> scoreMap) {
        return recommendService.recommend(scoreMap);
    }
}
