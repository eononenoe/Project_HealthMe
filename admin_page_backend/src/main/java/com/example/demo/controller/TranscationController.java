package com.example.demo.controller;

import com.example.demo.domain.dto.TranscationStatusDto;
import com.example.demo.domain.service.TranscationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/transactions")
public class TranscationController {

    @Autowired
    private TranscationService transcationService;

    @PostMapping("/status")
    public ResponseEntity<?> update_transcations(@RequestBody TranscationStatusDto transStatusDto){
        System.out.println(transStatusDto);
        boolean bool = transcationService.update_transcations(transStatusDto);
        if (bool){
            return ResponseEntity.ok("수정되었습니다");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("수정 실패하였습니다.");
    }
}
