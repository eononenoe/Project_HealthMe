<p align="center">
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

| 이름   | 역할 | 담당 파트                        | 주요 기여 내용                                                      |
|--------|------|----------------------------------|---------------------------------------------------------------------|
| 전정현 | 팀장 | 메인, 추천재료, 설문조사, 재료구매 |  사용자 설문 기반 영양 성향 분석 로직 구현 및 결과 타입 분류, 추천 식품 매칭 알고리즘 설계, 재료 구매 프로세스 로직 개발 |
| 하태형 | 조원 | 로그인/소셜로그인, 회원가입, 아이디/비밀번호찾기, 설문결과  | 인증 및 회원 흐름 구현, 설문 응답 기반 영양 성향 분석, 추천 알고리즘 설계 및 구현 |
| 김종호 | 조원 | 관리자페이지, 마이페이지, 공지사항 | 관리자 기능 및 유저 정보 관리 구현, 게시판 및 공지 기능 담당 |
| 심민재 | 조원 | 결제 페이지, 장바구니              | 장바구니 기능 구현, 결제 API 연동 |

---

### **일정**

---

## **주요 기능**

### 1. 사용자 인증 및 계정 관리
- JWT 기반 로그인 및 토큰 인증
- OAuth2 소셜 로그인 (Google, Naver, Kakao)
- 회원가입, 회원 탈퇴
- 이메일 및 휴대폰 인증 기능

### 2. 설문 및 개인화 분석
- 영양 성향 설문 조사
- 성향 결과 분류 및 시각화
- 성향에 맞는 추천 재료 제공

### 3. 식품 탐색 및 구매
- 추천 재료 상세 보기
- 장바구니 기능 (수량 조절, 삭제)
- 결제 페이지 및 결제 연동

### 4. 마이페이지
- 회원 정보 확인 및 수정
- 내가 구매한 재료, 설문 결과 확인

### 5. 관리자 기능
- 관리자 전용 대시보드
- 회원, 주문, 추천 데이터 관리

### 6. 공지사항
- 공지사항 등록 및 열람 기능


---

## 기술 스택

- **개발 도구**  
<div>
  <img src="https://img.shields.io/badge/IntelliJ-000000?style=for-the-badge&logo=intellijidea&logoColor=white">
  <img src="https://img.shields.io/badge/VSCode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">
</div>

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
  <img src="https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white">
</div>

- **데이터베이스**  
<div>
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
</div>

- **외부 API 연동**  
  - Kakao 로그인 API
  - Google 로그인 API  
  - PortOne (아임포트) 결제 API  
  - 다음 주소 검색 API

- **버전 관리 / 협업**  
  GitHub

---
## 의존 주입 리스트

| 카테고리       | 라이브러리 명                                                      | 설명                                                         |
|----------------|--------------------------------------------------------------------|--------------------------------------------------------------|
| **BUILD TOOLS** | org.springframework.boot:spring-boot-starter-web                  | Spring Web을 위한 기본 의존성                                |
| **BUILD TOOLS** | org.springframework.boot:spring-boot-starter-validation           | 입력값 검증을 위한 Validation 기능 지원                      |
| **BUILD TOOLS** | org.springframework.boot:spring-boot-starter-security             | Spring Security 보안 기능 지원                               |
| **BUILD TOOLS** | org.springframework.boot:spring-boot-starter-oauth2-client        | OAuth2 로그인 (Google, Kakao 등) 클라이언트 기능              |
| **BUILD TOOLS** | org.springframework.boot:spring-boot-starter-test                 | 통합 테스트를 위한 기본 테스트 도구                          |
| **DATABASE**    | org.springframework.boot:spring-boot-starter-data-jpa             | Spring Data JPA 기능                                          |
| **DATABASE**    | com.mysql:mysql-connector-j                                       | MySQL 데이터베이스 드라이버                                  |
| **SECURITY**    | io.jsonwebtoken:jjwt-api:0.11.5                                   | JWT 생성 및 검증을 위한 API 라이브러리                       |
| **SECURITY**    | io.jsonwebtoken:jjwt-impl:0.11.5                                  | JWT 구현체 (runtimeOnly로 사용)                              |
| **SECURITY**    | io.jsonwebtoken:jjwt-jackson:0.11.5                               | JWT 파싱 시 Jackson 연동 (runtimeOnly로 사용)               |
| **UTIL**        | org.springframework.boot:spring-boot-starter-mail                 | 이메일 발송 기능 지원                                        |
| **UTIL**        | org.projectlombok:lombok                                          | Getter/Setter/Builder 자동 생성                              |
| **TEST**        | org.junit.platform:junit-platform-launcher                        | JUnit5 테스트 플랫폼 런처                                    |

---

## ERD

<p align="center">
  <img src="./healthme/READMEimg/ERD.png" alt="ERD">
</p>

---

## 폴더 구조

<p align="center">
  <img src="./healthme/READMEimg/FrontEndStructure.png" alt="FrontEndStructure">
  <img src="./healthme/READMEimg/BackEndStructure.png" alt="BackEndStructure">
</p>
---