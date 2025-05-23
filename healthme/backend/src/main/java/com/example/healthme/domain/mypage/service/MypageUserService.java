package com.example.healthme.domain.mypage.service;

import com.example.healthme.domain.user.entity.User;
import com.example.healthme.domain.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MypageUserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getUserInfo(String id) {
        Optional<User>  optionUser =userRepository.findByUserid(id);
        List<User> list_user = null;
        list_user.add(optionUser.get());
        return list_user;
    }
}
