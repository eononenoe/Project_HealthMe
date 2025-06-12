package com.example.healthme.domain.survey.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "survey")
public class Survey {

    @Id
    private String surveyId;

    private String userid;
    private String nutrientName;
    private String nutrientValue;

    public String getSurveyId() {
        return surveyId;
    }

    public void setSurveyId(String surveyId) {
        this.surveyId = surveyId;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getNutrientName() {
        return nutrientName;
    }

    public void setNutrientName(String nutrientName) {
        this.nutrientName = nutrientName;
    }

    public String getNutrientValue() {
        return nutrientValue;
    }

    public void setNutrientValue(String nutrientValue) {
        this.nutrientValue = nutrientValue;
    }
}
