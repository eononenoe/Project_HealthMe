package com.example.healthme.domain.admin.controller;

import com.example.healthme.domain.admin.dto.AnnouncementRequestDto;
import com.example.healthme.domain.admin.dto.AnouncementResponseDto;
import com.example.healthme.domain.admin.service.Announcementservice;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class AnnouncementController {

    @Autowired
    private Announcementservice announcementService;

    /* 1) 등록 */
    @PostMapping("/api/admin/notices")
    public ResponseEntity<Long> create(@RequestBody AnnouncementRequestDto dto) {
        Long id = announcementService.createNotice(dto);
        return ResponseEntity.ok(id);
    }

    /* 2) 목록 */
    @GetMapping("/api/notices")
    public ResponseEntity<List<AnouncementResponseDto>> list(
            @RequestParam(defaultValue = "공지사항") String category) {
        return ResponseEntity.ok(announcementService.getNotices(category));
    }

    /* 3) 단건 조회 */
    @GetMapping("/api/notices/{id}")
    public ResponseEntity<AnouncementResponseDto> detail(@PathVariable Long id) {
        return ResponseEntity.ok(announcementService.getNotice(id));
    }

    /* 4) 수정 (관리자) */
    @PutMapping("/api/admin/notices/{id}")
    public ResponseEntity<Void> update(@PathVariable Long id,
                                       @RequestBody AnnouncementRequestDto dto) {
        announcementService.updateNotice(id, dto);
        return ResponseEntity.ok().build();
    }

    /* 5) 삭제 (관리자) */
    @DeleteMapping("/api/admin/notices/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        announcementService.deleteNotice(id);
        return ResponseEntity.ok().build();
    }
}
