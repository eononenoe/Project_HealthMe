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


    @PostMapping("/update")
    public String update(@ModelAttribute UserUpdateDto userDto, HttpSession session){

        User user1= (User)session.getAttribute("loginUser"); // login할때 session에 저장된 값 (아이디, 비밀번호만 존재)
        if (userDto.getCurrentPassword().equals(user1.getPassword())){
            // form에서 입력한 현재 비밀번호와 로그인 할때 입력한 비밀번호가 같으면 밑에 코드 실행

            User user = User.builder()
                    .userid(userDto.getUserid())
                    .password(userDto.getNewPassword())
                    .addr(user1.getAddr())
                    .zip(user1.getZip())
                    .name(userDto.getUsername())
                    .tel1(userDto.getTel1())
                    .tel2(userDto.getTel2())
                    .tel3(userDto.getTel3())
                    .build();

            userService.join(user);

            session.setAttribute("loginUser",user);
            return "index";
        }
        return "mypage/user_edit(standard)";

    }

    @PostMapping("/delete")
    public String deleteUser(HttpSession session) {
        User loginUser = (User) session.getAttribute("loginUser");
        if (loginUser == null) {
            System.out.println("세션에 로그인된 사용자 없음");
            return "redirect:/login";
        }

        String userid = loginUser.getUserid();
        System.out.println("삭제할 사용자 ID: " + userid);

        userService.delete(userid);
        session.invalidate();
        return "redirect:/login";
    }
}
