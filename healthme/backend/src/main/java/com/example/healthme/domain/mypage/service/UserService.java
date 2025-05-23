package com.example.healthme.domain.mypage.service;

import com.example.healthme.domain.user.entity.User;
import com.example.healthme.domain.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class UserService {

    @Autowired
    private UserRepository userRepository;
    public List<User> getUserInfo() {
        Optional<User> optionalUser = userRepository.findAll();
        User list_user = optionalUser.get();
    }
}
