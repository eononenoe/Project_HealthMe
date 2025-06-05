package com.example.healthme.domain.result.controller;

import com.example.healthme.domain.result.dto.NutrientResultDto;
import com.example.healthme.domain.result.entity.HealthTip;
import com.example.healthme.domain.result.service.NutrientResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/healthme/result")
public class NutrientResultController {

    private final NutrientResultService nutrientResultService;

    @PostMapping("/summary")
    public ResponseEntity<Map<String, NutrientResultDto>> getSummary(@RequestBody Map<String, Integer> scoreMap) {
        return ResponseEntity.ok(nutrientResultService.summarize(scoreMap));
    }

}