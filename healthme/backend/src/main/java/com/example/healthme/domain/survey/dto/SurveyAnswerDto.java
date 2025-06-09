package com.example.healthme.domain.survey.dto;

public class SurveyAnswerDto {
    private int questionIndex;
    private int score;

    public int getQuestionIndex() {
        return questionIndex;
    }

    public void setQuestionIndex(int questionIndex) {
        this.questionIndex = questionIndex;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }
}
