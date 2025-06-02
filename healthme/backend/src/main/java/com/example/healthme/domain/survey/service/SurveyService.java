package com.example.healthme.domain.survey.service;

import com.example.healthme.domain.survey.dto.SurveyAnswerDto;
import com.example.healthme.domain.survey.dto.SurveyRequestDto;
import com.example.healthme.domain.survey.entity.Servey;
import com.example.healthme.domain.survey.repository.ServeyRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SurveyService {

    private final ServeyRepository serveyRepository;

    public SurveyService(ServeyRepository serveyRepository) {
        this.serveyRepository = serveyRepository;
    }

    // 질문 인덱스를 영양소로 매핑
    private static final Map<Integer, String> nutrientMap = Map.ofEntries(
            Map.entry(0, "단백질"), Map.entry(1, "단백질"), Map.entry(2, "단백질"),
            Map.entry(3, "철분"), Map.entry(4, "철분"), Map.entry(5, "철분"),
            Map.entry(6, "비타민 D"), Map.entry(7, "비타민 D"), Map.entry(8, "비타민 D"),
            Map.entry(9, "칼슘"), Map.entry(10, "칼슘"),
            Map.entry(11, "식이섬유"), Map.entry(12, "식이섬유"),
            Map.entry(13, "마그네슘"), Map.entry(14, "마그네슘"),
            Map.entry(15, "칼륨"), Map.entry(16, "칼륨"),
            Map.entry(17, "비오틴"), Map.entry(18, "비오틴"),
            Map.entry(19, "아연"), Map.entry(20, "아연"),
            Map.entry(21, "아르기닌"), Map.entry(22, "아르기닌")
    );

    public void processSurvey(String userId, SurveyRequestDto request) {
        Map<String, Integer> nutrientScores = new HashMap<>();

        for (SurveyAnswerDto answer : request.getAnswers()) {
            String nutrient = nutrientMap.get(answer.getQuestionIndex());
            if (nutrient == null) continue;

            nutrientScores.put(nutrient,
                    nutrientScores.getOrDefault(nutrient, 0) + answer.getScore());
        }

        for (Map.Entry<String, Integer> entry : nutrientScores.entrySet()) {
            Servey servey = new Servey();
            servey.setSurveyId(UUID.randomUUID().toString());
            servey.setUserid(userId);
            servey.setNutrientName(entry.getKey());
            servey.setNutrientValue(String.valueOf(entry.getValue()));
            serveyRepository.save(servey);
        }
    }
}
