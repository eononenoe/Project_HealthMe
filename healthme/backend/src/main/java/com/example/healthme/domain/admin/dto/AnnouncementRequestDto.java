package com.example.healthme.domain.admin.dto;

import lombok.Data;

@Data
public class AnnouncementRequestDto {
    private String category;
    private String title;
    private String content;
}