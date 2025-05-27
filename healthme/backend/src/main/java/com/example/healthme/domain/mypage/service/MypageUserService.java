package com.example.healthme.domain.mypage.service;

import com.example.healthme.domain.mypage.dto.UserUpdate;
import com.example.healthme.domain.user.entity.User;
import com.example.healthme.domain.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MypageUserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public User getUserInfo(Long id) {

        Optional<User>  optionUser =userRepository.findById(id);
        if(optionUser !=null){
            System.out.println("optionUser "+optionUser.get());
            User user = optionUser.get();
            return user;
        }else{
            return null;
        }

    }

    public void updateUser(Long id, UserUpdate userUpdate) {
        Optional<User>  optionUser = userRepository.findById(id);
        User user = optionUser.get();
        user.setUserid(userUpdate.getUserid());
        user.setPassword(passwordEncoder.encode(userUpdate.getPassword()));
        user.setUsername(userUpdate.getUsername());
        user.setTel(userUpdate.getPhone());

        userRepository.save(user);
    }
}
