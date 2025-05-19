package com.example.healthme.domain.user.service;

import com.example.healthme.domain.user.dto.JoinRequestDto;
import com.example.healthme.domain.user.entity.User;
import com.example.healthme.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    // 회원가입
    public void join(JoinRequestDto dto) {
        // 전화번호 조립
        String fullTel = dto.getTel1() + "-" + dto.getTel2() + "-" + dto.getTel3();

        User user = new User();
        user.setUserid(dto.getUserid());
        user.setPassword(dto.getPassword()); // 이후 암호화 필요
        user.setUsername(dto.getUsername());
        user.setZip(dto.getZip());
        user.setAddress(dto.getAddress());
        user.setTel(fullTel);

        userRepository.save(user);
    }
    // 로그인 중복확인
    public boolean isUseridExists(String userid) {
        return userRepository.existsByUserid(userid);
    }
}
