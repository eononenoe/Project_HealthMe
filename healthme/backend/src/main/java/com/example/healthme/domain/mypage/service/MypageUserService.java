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
}
