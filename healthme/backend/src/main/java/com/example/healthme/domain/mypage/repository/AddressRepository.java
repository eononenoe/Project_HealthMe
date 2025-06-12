package com.example.healthme.domain.mypage.repository;

import com.example.healthme.domain.approval.entity.ApprovalOrder;
import com.example.healthme.domain.mypage.entity.Address;
import com.example.healthme.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address,Long> {

    List<Address> findByUserId(Long user_id);

    @Modifying
    @Query("UPDATE Address a SET a.recipient = :recipient WHERE a.user.id = :userId")
    void updateRecipientByUserId(@Param("userId") Long userId, @Param("recipient") String recipient);

    Optional<Address> findByUserAndIsDefault(User currentUser, boolean b);
}
