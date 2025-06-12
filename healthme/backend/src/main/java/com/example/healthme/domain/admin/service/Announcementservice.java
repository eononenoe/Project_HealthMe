package com.example.healthme.domain.admin.service;

import com.example.healthme.domain.admin.dto.AnnouncementRequestDto;
import com.example.healthme.domain.admin.dto.AnouncementResponseDto;
import com.example.healthme.domain.admin.entity.Announcement;
import com.example.healthme.domain.admin.repository.AnnouncementRespository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class Announcementservice {

    private final AnnouncementRespository announcementRespository;

    /* ───────────────── 등록 ───────────────── */
    @Transactional
    public Long createNotice(AnnouncementRequestDto dto) {
        Announcement a = Announcement.builder()
                .category(dto.getCategory())
                .title(dto.getTitle())
                .content(dto.getContent())
                .build();
        return announcementRespository.save(a).getId();
    }

    /* ───────────────── 목록 ───────────────── */
    @Transactional(readOnly = true)
    public List<AnouncementResponseDto> getNotices(String category) {

        // "전체"일 때와 특정 카테고리일 때를 구분
        List<Announcement> list = "전체".equals(category)
                ? announcementRespository.findAllByOrderByIdDesc()   // 커스텀 쿼리 메서드
                : announcementRespository.findByCategoryOrderByIdDesc(category);

        return list.stream()
                .map(AnouncementResponseDto::new)  // 엔티티 → DTO 변환
                .collect(Collectors.toList());
    }

    /* ───────────────── 단건 ───────────────── */
    @Transactional(readOnly = true)
    public AnouncementResponseDto getNotice(Long id) {
        Announcement a = announcementRespository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("notice not found"));
        return new AnouncementResponseDto(a);
    }

    /* ───────────────── 수정 ───────────────── */
    @Transactional
    public void updateNotice(Long id, AnnouncementRequestDto dto) {
        Announcement a = announcementRespository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("notice not found"));
        a.setCategory(dto.getCategory());
        a.setTitle(dto.getTitle());
        a.setContent(dto.getContent());
    }

    /* ───────────────── 삭제 ───────────────── */
    @Transactional
    public void deleteNotice(Long id) {
        announcementRespository.deleteById(id);
    }
}

