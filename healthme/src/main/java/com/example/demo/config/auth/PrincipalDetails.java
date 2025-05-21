package com.example.demo.config.auth;

import com.example.demo.domain.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.Collections;

@Data
@AllArgsConstructor
public class PrincipalDetails implements UserDetails {
    private UserDto userDto;

    @Override
    public Collection getAuthorities() {
        return Collections.emptyList(); // 권한 없음
    }

    @Override
    public String getPassword() {
        return userDto.getPassword();
    }

    @Override
    public String getUsername() {
        return userDto.getUserid();
    }

    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() { return true; }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    public boolean isEnabled() { return true; }
}
