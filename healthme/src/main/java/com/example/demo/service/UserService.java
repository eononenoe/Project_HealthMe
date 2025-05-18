package com.example.demo.service;

import com.example.demo.domain.dto.UserDto;
import com.example.demo.domain.entity.User;
import com.example.demo.domain.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public void join(User user) {
        userRepository.save(user);  // DB insert
    }
    public void delete(String userid) {
        System.out.println("[Service] delete 요청: " + userid);

        if (userRepository.existsById(userid)) {
            userRepository.deleteById(userid);
            System.out.println("삭제 성공");
        } else {
            System.out.println("DB에 해당 userid 없음");
        }
    }

}