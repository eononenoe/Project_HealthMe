//package com.example.healthme.global.config.auth.jwt;
//
//import java.security.SecureRandom;
//import java.util.Base64;
//
//public class KeyGenerator {
//
//    public static  byte[]  getKeygen(){
//        SecureRandom secureRandom = new SecureRandom();
//        byte[] keyBytes = new byte[256 / 8]; // 256비트 키 생성
//        secureRandom.nextBytes(keyBytes); // 난수로 바이트 배열 생성
//        String base64Key = Base64.getEncoder().encodeToString(keyBytes);
//        System.out.println("KeyGenerator getKeygen Key: " + base64Key);
//        return keyBytes;
//    }
//}
