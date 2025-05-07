package com.example.demo.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @Column(length = 100)
    private String userid;

    @Column(length = 255, nullable = false)
    private String password;

    @Column(length = 100)
    private String name;

    @Column(length = 20)
    private String zip;

    @Column(length = 255)
    private String addr;

    @Column(length = 10)
    private String tel1;

    @Column(length = 10)
    private String tel2;

    @Column(length = 10)
    private String tel3;
}
