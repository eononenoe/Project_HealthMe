package com.example.healthme.domain.result.controller;

import com.example.healthme.domain.result.entity.HealthTip;
import com.example.healthme.domain.result.service.HealthTipService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/healthme/result")
public class HealthTipController {
    private final HealthTipService healthTipService;

    @GetMapping("/random/{category}")
    public ResponseEntity<List<HealthTip>> getRandomTips(@PathVariable String category) {
        return ResponseEntity.ok(healthTipService.getRandomTips(category));
    }
}
