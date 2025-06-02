package com.example.healthme.domain.mypage.service;

import com.example.healthme.domain.mypage.dto.AddressUpdate;
import com.example.healthme.domain.mypage.dto.MyPageUserUpdate;
import com.example.healthme.domain.mypage.entity.Address;
import com.example.healthme.domain.mypage.repository.AddressRepository;
import com.example.healthme.domain.user.entity.User;
import com.example.healthme.domain.user.repository.UserRepository;
import com.example.healthme.global.config.auth.principal.PrincipalDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MypageService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public User getuser(PrincipalDetails principalDetails) {
        Optional<User> op_user = userRepository.findById(principalDetails.getUserDto().getId());
        if(op_user!=null){
            User user = op_user.get();

            return user;
        }
        return null;
    }


    public List<Address> getUserInfo(PrincipalDetails  principalDetails) {
        Long user_id = principalDetails.getUserDto().getId();
        List<Address> op_addr = addressRepository.findByUserId(user_id);
        if(op_addr !=null){
            // System.out.println("optionUser "+optionUser.get());
            System.out.println("List<Address> op_addr : "+op_addr);
            return op_addr;
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

    // 배송지 수정
    public void updateAddress(Long id, AddressUpdate addressUpdate) {
        Optional<User> user= userRepository.findById(id);
        User addrUpdateUser = user.get();
        Address defaultAddress = addrUpdateUser.getDefaultAddress(); // 기존 주소 가져온다.
        defaultAddress.setAddress(addressUpdate.getAddress()); // 수정할 주소로 업데이트
        defaultAddress.setAddressDetail(addressUpdate.getAddressDetail()); // 수정할 주소로 업데이트
        defaultAddress.setZip(addressUpdate.getZonecode()); // 수정할 주소로 업데이트
        userRepository.save(addrUpdateUser);
        // userRepository.save()만 해도 Address가 이미 DB에서 불러온 객체이면, JPA가 바뀐 내용을 자동으로 감지해서 수정해주기 때문이다.
    }

    // 배송지 추가
    public void addnewAddr(AddressUpdate addressUpdate, PrincipalDetails principalDetails) {
        Optional<User> op_user = userRepository.findById(principalDetails.getUserDto().getId());
        User user = op_user.get(); // setUser에 넣기위해서 User 엔터티 들고왔다.


        Address address = new Address();
        address.setAddress(addressUpdate.getAddress());
        address.setAddressDetail(addressUpdate.getAddressDetail());
        address.setRecipient(user.getUsername());
        address.setRecipientPhone(user.getTel());
        address.setZip(addressUpdate.getZonecode());
        address.setIsDefault(false);
        address.setUser(user);

        addressRepository.save(address);
    }


}
