package com.example.healthme.domain.survey.controller;

import com.example.healthme.domain.survey.dto.SurveyRequestDto;
import com.example.healthme.domain.survey.service.SurveyService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/healthme/survey")
public class SurveyController {

    private final SurveyService surveyService;

    public SurveyController(SurveyService surveyService) {
        this.surveyService = surveyService;
    }

    @PostMapping
    public ResponseEntity<?> submitSurvey(@RequestBody SurveyRequestDto request,
                                          @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }

        String userId = userDetails.getUsername(); // JWT 사용자 ID
        surveyService.processSurvey(userId, request);
        return ResponseEntity.ok("설문 제출 완료");
    }
    @GetMapping("/scores")
    public ResponseEntity<Map<String, Integer>> getScores(@RequestParam String userid) {
        Map<String, Integer> scores = surveyService.getScoresByUserId(userid);
        return ResponseEntity.ok(scores);
    }
}
