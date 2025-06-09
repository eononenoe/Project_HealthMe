package com.example.healthme.domain.survey.repository;

import com.example.healthme.domain.survey.entity.Servey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServeyRepository extends JpaRepository<Servey, String> {
}
