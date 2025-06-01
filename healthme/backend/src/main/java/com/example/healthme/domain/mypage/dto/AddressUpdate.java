package com.example.healthme.domain.mypage.dto;

import com.example.healthme.domain.mypage.entity.Address;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddressUpdate {
    private String address;
    private String addressDetail;
    private String zonecode;
    private String tel;
    private String recipient;
    private boolean is_default;

    public AddressUpdate(Address addr){
        this.address = addr.getAddress();
        this.addressDetail = addr.getAddressDetail();
        this.zonecode = addr.getZip();
        this.tel = addr.getRecipientPhone();
        this.recipient =addr.getRecipient();
        this.is_default = addr.getIsDefault();
    }


}
