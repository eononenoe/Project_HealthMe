package com.example.healthme.domain.survey.repository;

import com.example.healthme.domain.survey.entity.Survey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServeyRepository extends JpaRepository<Survey, String> {
    List<Survey> findByUserid(String userid);
}
