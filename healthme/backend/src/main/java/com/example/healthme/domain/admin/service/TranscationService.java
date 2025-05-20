package com.example.healthme.domain.admin.service;
import com.example.healthme.domain.admin.dto.TranscationStatusDto;
import com.example.healthme.domain.admin.entity.OrderEntity;
import com.example.healthme.domain.admin.repository.TranscationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TranscationService {
    
    @Autowired
    private TranscationRepository transcationRepository;

    // 페이지네이션된 거래 내역 가져오기
    public Page<OrderEntity> selectAll(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page,size, Sort.by(Sort.Direction.DESC, "orderDate"));

        return transcationRepository.findAll(pageRequest);
    }

    // 거래 취소 or 거래 완료
    public boolean update_transcations(TranscationStatusDto transStatusDto) {
        Optional<OrderEntity> thEntity =transcationRepository.findById(transStatusDto.getOrderId());
        if (!thEntity.isEmpty()){
            OrderEntity tranHisEntity =thEntity.get();
            tranHisEntity.setIsCanceled(transStatusDto.getIsCanceled());
            tranHisEntity.setIsCompleted(transStatusDto.getIsCompleted());
            transcationRepository.save(tranHisEntity);
            return true;
        }
        return false;

    }

    public Page<OrderEntity> select_trans_name(String searchText, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page,size,Sort.by(Sort.Direction.DESC, "orderDate"));
        return transcationRepository.findByTranscationPeopleContaining(searchText, pageRequest);
    }

    public boolean refundReturn(TranscationStatusDto transcationStatusDto,String type) {
        Optional<OrderEntity> orderentity = transcationRepository.findById(transcationStatusDto.getOrderId());
        if (orderentity.isPresent()){
             OrderEntity orderEntity = orderentity.get();
             if (type.equals("환불")){
                 orderEntity.setRefundRequested(transcationStatusDto.getRefundRequested());
             }else if(type.equals("반품")){
                 orderEntity.setReturnRequested(transcationStatusDto.getReturnRequested());
             }
             transcationRepository.save(orderEntity);
             return true;
        }
        return false;
    }
}
