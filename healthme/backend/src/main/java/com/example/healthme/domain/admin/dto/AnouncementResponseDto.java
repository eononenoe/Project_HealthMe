package com.example.healthme.domain.admin.dto;

import com.example.healthme.domain.admin.entity.Announcement;
import com.mysql.cj.protocol.x.Notice;
import lombok.Data;

@Data
public class AnouncementResponseDto {
    private Long id;
    private String category;
    private String title;
    private String content;
    private String createdDate;   // ISO-8601 문자열

    public AnouncementResponseDto(Announcement n) {
        this.id = n.getId();
        this.category = n.getCategory();
        this.title = n.getTitle();
        this.content = n.getContent();
        this.createdDate = n.getCreatedDate().toString();
    }
}