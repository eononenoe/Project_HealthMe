<p>
  <img src="./healthme/READMEimg/healthmeTitle.png" alt="healthme 메인 타이틀">
</p>

#### 사용자의 건강 성향을 분석해 개인 맞춤형 식품을 추천하고, 직접 장바구니에 담아 쇼핑까지 할 수 있는 영양 큐레이션 플랫폼입니다.

---

### gif 및 설명 예시 (주요 기능)
- 여행지 검색, 마커를 통해 상세 일정 순서 및 동선 확인
- 작성한 플래너를 프로필에서 확인, 수정 및 삭제 가능
<p align="center">
  <img src="https://github.com/user-attachments/assets/7db17fd3-2875-42ee-a929-ce6f7f8fe20d">
</p>


---

## **개발 동기**
건강에 대한 관심은 높아졌지만, 여전히 많은 사람들이 **자신에게 맞는 식품을 선택하는 데 어려움**을 겪고 있습니다.  
특히 다이어트, 영양 밸런스, 특정 질환 관리 등 목적에 따라 필요한 영양소는 다른데,  
기존 쇼핑몰에서는 이를 반영한 **개인화된 추천 기능이 부족**했습니다.

이 문제를 해결하기 위해, 사용자의 간단한 설문을 통해 **영양 성향을 분석하고,  
그 결과에 맞는 식품을 추천해주는 플랫폼**을 기획하게 되었습니다.

---

## **기획 의도**
사용자가 **자신의 영양 성향을 더 잘 이해하고**,  
그에 맞는 식품을 손쉽게 선택할 수 있도록 하는 **데이터 기반의 개인화 추천 플랫폼**을 구현하는 것이 목표였습니다.

기획 초기에는 단순한 설문형 웹앱이었지만,  
이를 확장하여 실제 식품 추천과 장바구니, 결제까지 연결되는 **풀 스택 서비스**로 발전시켰습니다.

---

## 레퍼런스 플랫폼

- [마켓컬리 (https://www.kurly.com)](https://www.kurly.com)

마켓컬리는 사용자 맞춤 추천, 간결한 UI, 식품 중심의 쇼핑 흐름 등에서 큰 영감을 받았습니다.  
특히, **카테고리별 탐색 / 상품 상세 구성 / 장바구니 결제 흐름** 등을 벤치마킹하여  
사용자가 불편함 없이 식품을 탐색하고 구매까지 할 수 있도록 UX를 설계하였습니다.

---
## MEMBER

| 이름   | 역할             | 담당 파트                                               | 주요 기여 내용                                                |
|--------|------------------|----------------------------------------------------------|---------------------------------------------------------------|
| 전정현 | 팀장 / 백엔드 개발 | 회원가입, 로그인, 인증 시스템, DB 모델링, 추천 알고리즘   | 프로젝트 구조 설계 및 백엔드 핵심 로직 구현 전체 리딩         |
| 하태형 | 프론트엔드 개발   | 메인 페이지, 설문 페이지, 결과 페이지 UI/UX             | 사용자 중심의 화면 설계 및 설문 흐름 인터페이스 구현          |
| 김종호 | AI 추천 시스템    | 추천 모델 설계, Flask 기반 API 서버                     | 성향 분석 기반의 맞춤 식품 추천 알고리즘 구현 및 백 연동       |
| 심민재 | 배포 / 풀스택     | CI/CD 구축, 배포 자동화, 백-프론트 연동 테스트          | AWS 기반 배포 환경 구성 및 운영 자동화, 전반적인 QA 및 테스트 |

---

### **일정**

---

## **주요 기능**

### **1. USER**

- **Jwt 기반 로그인**
  - 유효성 검사, 아이디 중복확인, 다음 API를 통한 주소 검색
- **Oauth2 소셜 로그인**
  - google, kakao 
- **회원 가입 및 탈퇴**
  - Email, 휴대폰 인증
- **아이디 찾기**

- **임시 비밀번호 발급**
  - Spring mail 을 통한 임시 비밀번호 발급


---

## 기술 스택

- **개발 도구**  
  IntelliJ (백엔드), VSCode (프론트엔드)

- **백엔드**  
<div>
  <img src="https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=openjdk&logoColor=white">
  <img src="https://img.shields.io/badge/SpringBoot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
  <img src="https://img.shields.io/badge/JPA-59666C?style=for-the-badge&logo=hibernate&logoColor=white">
  <img src="https://img.shields.io/badge/Spring%20Security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white">
  <img src="https://img.shields.io/badge/Lombok-FF4444?style=for-the-badge&logo=lombok&logoColor=white">
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white">
  <img src="https://img.shields.io/badge/HikariCP-00BFFF?style=for-the-badge&logo=spring&logoColor=white">
  <img src="https://img.shields.io/badge/Gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white">
</div>

- **프론트엔드**  
<div>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
</div>

- **데이터베이스**  
<div>
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
</div>

- **외부 API 연동**  
  - Kakao 로그인 / 지도 API  
  - Google 로그인 API  
  - PortOne (아임포트) 결제 API  
  - 다음 주소 검색 API

- **버전 관리 / 협업**  
  GitHub
---

## 주요 END POINT

### **1. **

---

## 의존주입 list

| CAT             | NAME                                                                | DESCRIPTION                                                 |
| --------------- | ------------------------------------------------------------------- | ----------------------------------------------------------- |
| **BUILD TOOLS** | org.springframework.boot:spring-boot-starter-thymeleaf              | Thymeleaf 템플릿 엔진을 지원하는 Spring Boot 스타터         |
| **BUILD TOOLS** | org.springframework.boot:spring-boot-starter-web                    | Spring Web을 위한 기본적인 의존성                           |
| **BUILD TOOLS** | org.springframework.boot:spring-boot-starter-security               | Spring Security를 위한 기본적인 의존성                      |
| **BUILD TOOLS** | org.springframework.boot:spring-boot-starter-oauth2-resource-server | OAuth2 리소스 서버 지원                                     |
| **BUILD TOOLS** | org.thymeleaf.extras:thymeleaf-extras-springsecurity6               | Thymeleaf와 Spring Security 통합을 위한 추가 라이브러리     |
| **BUILD TOOLS** | org.springframework.security:spring-security-test                   | Spring Security 테스트를 위한 의존성                        |
| **BUILD TOOLS** | org.springframework.boot:spring-boot-starter-test                   | Spring Boot 테스트 스타터                                   |
| **BUILD TOOLS** | org.springframework.boot:spring-boot-starter-oauth2-client          | OAuth2 클라이언트를 위한 Spring Boot 스타터                 |
| **DATABASE**    | com.mysql:mysql-connector-j:8.3.0                                   | MySQL 데이터베이스 연결을 위한 JDBC 드라이버                |
| **DATABASE**    | org.springframework.boot:spring-boot-starter-data-jpa               | JPA를 위한 Spring Boot 스타터                               |
| **DATABASE**    | org.springframework.boot:spring-boot-starter-data-redis             | Redis 데이터 저장소 지원                                    |
| **DATABASE**    | org.springframework.boot:spring-boot-starter-data-redis-reactive    | Reactive Redis 지원                                         |
| **SECURITY**    | io.jsonwebtoken:jjwt-api:0.11.2                                     | JWT 생성 및 검증을 위한 API 라이브러리                      |
| **SECURITY**    | io.jsonwebtoken:jjwt-impl:0.11.2                                    | JWT 구현체                                                  |
| **SECURITY**    | io.jsonwebtoken:jjwt-jackson:0.11.2                                 | Jackson을 사용한 JWT 라이브러리                             |
| **VALIDATION**  | org.springframework.boot:spring-boot-starter-validation             | Spring Validation을 위한 기본적인 의존성                    |
| **VALIDATION**  | jakarta.validation:jakarta.validation-api:3.1.0                     | Jakarta Validation API                                      |
| **VALIDATION**  | org.hibernate.validator:hibernate-validator:8.0.1.Final             | Hibernate Validator (JSR-303 표준 구현)                     |
| **REST**        | com.fasterxml.jackson.core:jackson-core:2.18.1                      | Jackson JSON 라이브러리 핵심 기능                           |
| **REST**        | com.fasterxml.jackson.core:jackson-databind:2.18.1                  | Jackson 데이터 바인딩 기능                                  |
| **REST**        | com.fasterxml.jackson.dataformat:jackson-dataformat-xml:2.18.1      | Jackson XML 데이터 포맷 지원                                |
| **REST**        | com.google.code.gson:gson:2.11.0                                    | Google Gson JSON 라이브러리                                 |
| **REST**        | org.springframework.boot:spring-boot-starter-hateoas:3.4.0          | HATEOAS를 위한 Spring Boot 스타터                           |
| **UTIL**        | org.springframework.boot:spring-boot-starter-mail                   | 이메일 발송을 위한 Spring Boot 스타터                       |
| **UTIL**        | commons-fileupload:commons-fileupload:1.4                           | 파일 업로드를 위한 Commons FileUpload 라이브러리            |
| **UTIL**        | commons-io:commons-io:2.8.0                                         | 파일 I/O 관련 유틸리티                                      |
| **UTIL**        | net.nurigo:sdk:4.3.2                                                | 문자 전송(CoolSMS) 관련 SDK                                 |
| **UTIL**        | org.projectlombok:lombok                                            | 자바 코드에서 반복적인 작업을 줄이기 위한 Lombok 라이브러리 |
| **TEST**        | org.mockito:mockito-core:4.5.1                                      | Mockito 핵심 라이브러리                                     |
| **TEST**        | org.mockito:mockito-junit-jupiter:4.5.1                             | JUnit 5에서 Mockito 사용을 위한 의존성                      |

---

## ERD

![ERD](erd 사진)

```
