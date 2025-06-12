package com.example.healthme.domain.result.controller;

import com.example.healthme.domain.result.dto.NutrientResultDto;
import com.example.healthme.domain.result.service.NutrientResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

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