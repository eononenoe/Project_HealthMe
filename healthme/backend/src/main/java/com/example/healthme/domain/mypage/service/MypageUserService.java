package com.example.healthme.domain.mypage.service;

import com.example.healthme.domain.mypage.dto.AddressUpdate;
import com.example.healthme.domain.mypage.dto.MyPageUserUpdate;
import com.example.healthme.domain.mypage.entity.Address;
import com.example.healthme.domain.user.entity.User;
import com.example.healthme.domain.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

    public void updateUser(Long id, MyPageUserUpdate userUpdate) {
        Optional<User>  optionUser = userRepository.findById(id);
        User user = optionUser.get();
        user.setUserid(userUpdate.getUserid());
        user.setPassword(passwordEncoder.encode(userUpdate.getPassword()));
        user.setUsername(userUpdate.getUsername());
        user.setTel(userUpdate.getPhone());

        userRepository.save(user);
    }

    public void updateAddress(Long id, AddressUpdate addressUpdate) {
        Optional<User> user= userRepository.findById(id);
        User addrUpdateUser = user.get();
        Address defaultAddress = addrUpdateUser.getDefaultAddress();
        defaultAddress.setAddress(addressUpdate.getAddress());
        defaultAddress.setAddressDetail(addressUpdate.getAddressDetail());
        defaultAddress.setZip(addressUpdate.getZip());
        userRepository.save(addrUpdateUser);
    }
}
