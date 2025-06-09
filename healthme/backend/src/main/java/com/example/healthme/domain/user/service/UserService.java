package com.example.healthme.domain.user.service;

import com.example.healthme.domain.mypage.entity.Address;
import com.example.healthme.domain.mypage.repository.AddressRepository;
import com.example.healthme.domain.user.dto.*;
import com.example.healthme.domain.user.entity.User;
import com.example.healthme.domain.user.repository.UserRepository;
import com.example.healthme.global.config.auth.jwt.JwtTokenProvider;
import com.example.healthme.global.config.auth.jwt.TokenInfo;
import com.example.healthme.global.config.auth.principal.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;   // ← 정확한 패키지
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    /* 의존성 */
    private final UserRepository    userRepository;
    private final AddressRepository addressRepository;
    private final PasswordEncoder   passwordEncoder;
    private final JwtTokenProvider  jwtTokenProvider;
    private final MailService       mailService;

    /* ========================= 회원가입 ========================= */
    public void join(JoinRequestDto dto) {

        String fullTel = dto.getTel1() + "-" + dto.getTel2() + "-" + dto.getTel3();

        User user = User.builder()
                .userid(dto.getUserid())
                .password(passwordEncoder.encode(dto.getPassword()))
                .username(dto.getUsername())
                .zip(dto.getZip())
                .address(dto.getAddress())
                .addressDetail(dto.getAddressDetail())
                .gender(dto.getGender())
                .tel(fullTel)
                .role("ROLE_USER")
                .grade("새싹")
                .totalPurchaseAmount(0)
                .provider(null)
                .providerId(null)
                .build();

        userRepository.save(user);

        Address address = Address.builder()
                .zip(dto.getZip())
                .address(dto.getAddress())
                .addressDetail(dto.getAddressDetail())
                .recipient(dto.getUsername())
                .recipientPhone(fullTel)
                .isDefault(true)
                .user(user)
                .build();

        Address savedAddress = addressRepository.save(address);
        user.setDefaultAddress(savedAddress);
        userRepository.save(user);
    }

    /* =========================== 로그인 ========================= */
    public TokenInfo login(LoginRequestDto dto) {
        User user = userRepository.findByUserid(dto.getUserid())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 아이디입니다."));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        PrincipalDetails principal = new PrincipalDetails(UserDto.fromEntity(user));
        Authentication auth = new UsernamePasswordAuthenticationToken(
                principal, null, principal.getAuthorities());

        return jwtTokenProvider.generateToken(auth);
    }

    /* ======================= 소셜 회원 생성 ===================== */
    public UserDto createSocialUser(String userid, String username,
                                    String provider, String providerId) {

        User user = User.builder()
                .userid(userid)
                .password(passwordEncoder.encode("1234")) // 초기 비밀번호
                .username(username)
                .provider(provider)
                .providerId(providerId)
                .role("ROLE_USER")
                .grade("새싹")
                .tel("")
                .zip("")
                .address("")
                .addressDetail("")
                .build();
        userRepository.save(user);

        Address address = Address.builder()
                .zip("")
                .address("")
                .addressDetail("")
                .recipient(username)
                .recipientPhone("")
                .isDefault(true)
                .user(user)
                .build();

        Address savedAddress = addressRepository.save(address);
        user.setDefaultAddress(savedAddress);
        userRepository.save(user);

        return UserDto.fromEntity(user);
    }

    /* ====================== 유틸 / 검증 로직 ===================== */
    public boolean isUseridExists(String userid) {
        return userRepository.existsByUserid(userid);
    }

    public String findUseridByName(String username) {
        return userRepository.findByUsername(username)
                .map(User::getUserid)
                .orElse(null);
    }

    public void sendTemporaryPassword(String username, String userid) {
        User user = userRepository.findByUsernameAndUserid(username, userid)
                .orElseThrow(() -> new IllegalArgumentException("정보가 일치하지 않습니다."));

        String tempPassword = UUID.randomUUID().toString().substring(0, 8);
        user.setPassword(passwordEncoder.encode(tempPassword));
        userRepository.save(user);

        mailService.sendEmail(
                user.getUserid(),
                "임시 비밀번호 안내",
                "임시 비밀번호는 [" + tempPassword + "] 입니다."
        );
    }
}
