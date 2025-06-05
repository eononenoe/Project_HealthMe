package com.example.healthme.domain.user.service;

import com.example.healthme.domain.mypage.entity.Address;
import com.example.healthme.domain.mypage.repository.AddressRepository;
import com.example.healthme.domain.user.dto.JoinRequestDto;
import com.example.healthme.domain.user.dto.LoginRequestDto;
import com.example.healthme.domain.user.dto.UserDto;
import com.example.healthme.domain.user.entity.User;
import com.example.healthme.domain.user.repository.UserRepository;
import com.example.healthme.global.config.auth.jwt.JwtTokenProvider;
import com.example.healthme.global.config.auth.jwt.TokenInfo;
import com.example.healthme.global.config.auth.principal.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final  PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    private AddressRepository addressRepository;
    // 일반(폼) 회원가입
    public void join(JoinRequestDto dto) {
        // 1. 전화번호 합치기
        String fullTel = dto.getTel1() + "-" + dto.getTel2() + "-" + dto.getTel3();

        User user = new User();
        user.setUserid(dto.getUserid());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setUsername(dto.getUsername());
//        user.setZip(dto.getZip());
//        user.setAddress(dto.getAddress());
//        user.setAddressDetail(dto.getAddressDetail());
        user.setGender(dto.getGender());
        user.setTel(fullTel);
        user.setRole("ROLE_USER");
        user.setGrade("새싹");
        user.setTotalPurchaseAmount(0);
        user.setProvider(null);
        user.setProviderId(null);

        // 먼저 User 저장 (왜냐하면 Address에서 user를 참조하기 때문)
        userRepository.save(user);

        // 4. Address 객체 생성 및 기본 배송지 설정
        Address address = new Address();
        address.setZip(dto.getZip());
        address.setAddress(dto.getAddress());
        address.setAddressDetail(dto.getAddressDetail());
        address.setRecipient(dto.getUsername());
        address.setRecipientPhone(fullTel);
        address.setIsDefault(true);
        address.setUser(user); // 연관관계 설정

        // 5. Address 저장
        Address savedAddress = addressRepository.save(address);

        // 6. User에 기본 배송지 설정
        user.setDefaultAddress(savedAddress);

        // 7. 다시 User 업데이트 (기본 배송지 반영)
        userRepository.save(user);
    }
    // 아이디 중복확인
    public boolean isUseridExists(String userid) {
        return userRepository.existsByUserid(userid);
    }


    // 로그인
    public TokenInfo login(LoginRequestDto dto){
        User user = userRepository.findByUserid(dto.getUserid())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 아이디입니다."));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        // PrincipalDetails로 Authentication 생성
        PrincipalDetails principalDetails = new PrincipalDetails(UserDto.fromEntity(user));
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                principalDetails, null, principalDetails.getAuthorities()
        );

        // JWT 생성
        return jwtTokenProvider.generateToken(authentication); // TokenInfo 반환
    }

    // 소셜 로그인 계정 생성
    public UserDto createSocialUser(String userid, String username, String provider, String providerId) {
        User user = new User();
        user.setUserid(userid);
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode("1234")); // 소셜 전용
        user.setProvider(provider);
        user.setProviderId(providerId);
        user.setRole("ROLE_USER");
        user.setGrade("새싹");
//        user.setZip("");
//        user.setAddress("");
        user.setTel("");

        userRepository.save(user);

        // 기본 배송지도 Address 테이블에 저장 (비어있지만 isDefault = true)
        Address address = new Address();
        address.setZip("");
        address.setAddress("");
        address.setAddressDetail("");
        address.setRecipient(username); // 사용자 이름으로 초기화
        address.setRecipientPhone(""); // 전화번호가 없을 수 있으니 비워둠
        address.setIsDefault(true);
        address.setUser(user);

        Address savedAddress = addressRepository.save(address);

        user.setDefaultAddress(savedAddress); // 연관관계 설정
        userRepository.save(user); // 다시 저장
        return UserDto.fromEntity(user);
    }
}
