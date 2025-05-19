package com.example.healthme.domain.result.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/result")
public class ResultController {

    @GetMapping("/indicator")
    public List<Integer> getPercentValues() {
        return List.of(25, 22, 38, 43, 90, 33);
    }
    @GetMapping("/nutrientResult")
    public void nutrientResult(){

    }
}
