package com.example.healthme.domain.survey.dto;

import java.util.List;

public class SurveyRequestDto {
    private List<SurveyAnswerDto> answers;

    public List<SurveyAnswerDto> getAnswers() {
        return answers;
    }

    public void setAnswers(List<SurveyAnswerDto> answers) {
        this.answers = answers;
    }
}
