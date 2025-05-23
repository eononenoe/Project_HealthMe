package com.example.healthme.domain.user.service;

import com.example.healthme.domain.user.dto.JoinRequestDto;
import com.example.healthme.domain.user.dto.LoginRequestDto;
import com.example.healthme.domain.user.dto.UserDto;
import com.example.healthme.domain.user.entity.User;
import com.example.healthme.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    // 회원가입
    public void join(JoinRequestDto dto) {
        // 전화번호 합치기
        String fullTel = dto.getTel1() + "-" + dto.getTel2() + "-" + dto.getTel3();

        // BCrypt를 이용한 패스워드 암호화
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        User user = new User();
        user.setUserid(dto.getUserid());
        user.setPassword(passwordEncoder.encode(dto.getPassword())); // 이후 암호화 필요
        user.setUsername(dto.getUsername());
        user.setZip(dto.getZip());
        user.setAddress(dto.getAddress());
        user.setTel(fullTel);
        // 기본값으로 지정한다
        user.setRole("ROLE_USER");
        user.setGrade("새싹");

        userRepository.save(user);
    }
    // 로그인 중복확인
    public boolean isUseridExists(String userid) {
        return userRepository.existsByUserid(userid);
    }

    public UserDto login(LoginRequestDto dto){
        User user = userRepository.findByUserid(dto.getUserid())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 아이디입니다."));

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        if (!encoder.matches(dto.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        return UserDto.toDto(user);
    }
}
