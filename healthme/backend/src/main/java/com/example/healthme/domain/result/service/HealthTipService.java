package com.example.healthme.domain.result.service;

import com.example.healthme.domain.result.entity.HealthTip;
import com.example.healthme.domain.result.repository.HealthTipRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HealthTipService {

    private final HealthTipRepository repository;

    public List<HealthTip> getRandomTips(String category) {
        return repository.findRandomByCategory(category);
    }
}