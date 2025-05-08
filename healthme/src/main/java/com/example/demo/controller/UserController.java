package com.example.demo.controller;

import com.example.demo.domain.dto.UserDto;
import com.example.demo.domain.dto.UserUpdateDto;
import com.example.demo.domain.entity.User;
import com.example.demo.domain.repository.UserRepository;
import com.example.demo.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequestMapping("/join")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @GetMapping("update")
    public String showUpdateForm(HttpSession session, Model model){

        User user = (User)session.getAttribute("loginUser");
        if(user!=null){

            model.addAttribute("user",user);
            return "mypage/user_edit(standard)";
        }
        return "login/login";

    }

    private User user1 = null;
    @PostMapping("/update")
    public String update(@ModelAttribute UserUpdateDto userDto, HttpSession session){
        User user1 = (User)session.getAttribute("loginUser");

        if (userDto.getCurrentPassword().equals(user1.getPassword())) {
            // 기존의 findById -> findByUserid로 변경
            Optional<User> optionalUser = userRepository.findByUserid(user1.getUserid());

            if(optionalUser.isPresent()){
                User currentUser = optionalUser.get();

                User updatedUser = User.builder()
                        .userid(currentUser.getUserid())
                        .password(userDto.getNewPassword())
                        .name(userDto.getUsername())
                        .addr(currentUser.getAddr())
                        .zip(currentUser.getZip())
                        .tel1(userDto.getTel1())
                        .tel2(userDto.getTel2())
                        .tel3(userDto.getTel3())
                        .build();

                userService.join(updatedUser);
                session.setAttribute("loginUser", updatedUser);
                return "index";
            }
        }
        return "mypage/user_edit(standard)";
    }



}
