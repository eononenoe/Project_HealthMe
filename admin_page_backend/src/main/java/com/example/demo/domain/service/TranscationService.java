package com.example.demo.domain.service;

import com.example.demo.domain.dto.TranscationDto;
import com.example.demo.domain.dto.TranscationStatusDto;
import com.example.demo.domain.entity.TransactionHistoryEntity;
import com.example.demo.domain.repository.TranscationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Optional;

@Service
public class TranscationService {
    
    @Autowired
    private TranscationRepository transcationRepository;

    // 페이지네이션된 거래 내역 가져오기
    public Page<TransactionHistoryEntity> selectAll(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page,size);
        
        return transcationRepository.findAllByOrderByNoDesc(pageRequest);
    }

    // 거래 취소 or 거래 완료
    public boolean update_transcations(TranscationStatusDto transStatusDto) {
        Optional<TransactionHistoryEntity> thEntity =transcationRepository.findById(transStatusDto.getNo());
        if (!thEntity.isEmpty()){
            TransactionHistoryEntity tranHisEntity =thEntity.get();
            tranHisEntity.setCancel(transStatusDto.getCancel());
            tranHisEntity.setSuccess(transStatusDto.getSuccess());
            transcationRepository.save(tranHisEntity);
            return true;
        }
        return false;

    }
}
