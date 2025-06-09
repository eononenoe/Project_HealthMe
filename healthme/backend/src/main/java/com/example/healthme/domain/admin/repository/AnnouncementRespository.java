package com.example.healthme.domain.admin.repository;

import com.example.healthme.domain.admin.entity.Announcement;
import com.mysql.cj.protocol.x.Notice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnnouncementRespository extends JpaRepository<Announcement, Long> {
    List<Announcement> findByCategoryOrderByIdDesc(String category);
    List<Announcement> findAllByOrderByIdDesc();

}

