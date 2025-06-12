<p>
  <img src="#" alt="healthme 메인 타이틀">
</p>

#### healthme 설명

---

### gif 및 설명 예시 (주요 기능)
- 여행지 검색, 마커를 통해 상세 일정 순서 및 동선 확인
- 작성한 플래너를 프로필에서 확인, 수정 및 삭제 가능
<p align="center">
  <img src="https://github.com/user-attachments/assets/7db17fd3-2875-42ee-a929-ce6f7f8fe20d">
</p>


---

## **개발 동기 / 의도**


---

## **레퍼런스 플랫폼**

- 마켓컬리

---

## **MEMEBR**

| **NAME&nbsp;** | **ROLE**              | **SKILL**                           | **PART**                                                     | **DESCRIPTION** |
| -------------- | --------------------- | ----------------------------------- | ------------------------------------------------------------ | --------------- |


---

### **일정**

---

## **주요 기능**

### **1. 사용자**

- **Jwt 기반 로그인**
- **Oauth 인증 소셜 로그인**
  - google, naver, kakao 지원
- **회원 가입 및 탈퇴**
  - Email, 휴대폰 인증

### **2. 여행지 탐색 및 검색**

- **복합 키워드 기반 탐색**

  - 키워드 기반 탐색
    - 검색어를 통한 여행지 검색
  - 카테고리별 분류
    - 관광명소, 랜드마크, 음식등
    - 최대 3가지 카테고리를 통한 검색
  - 위치 기반 탐색
    - 도시별 여행지 검색
  - 모든 조건을 사용한 복합적 탐색

- **여행지 상세 정보 제공**
  - 사진 및 설명
  - 운영 시간, 주요 명소, 주소
  - 주위의 다른 여행지와 식당
  - 관련된 리뷰

### **3. 여행지 리뷰**

- **리뷰 작성**
  - 별점(1~5점)과 텍스트 리뷰 작성.
  - 사진 첨부(최대 3장).
- **리뷰 관리**
  - 작성한 리뷰를 프로필에서 확인
  - 수정 및 삭제 기능

### **4. 플래너**

- **플래너 작성**
  - 여행지 검색
  - 마커를 통해 상세 일정 순서 및 동선 확인
- **플래너 관리**
  - 작성한 플래너를 프로필에서 확인
  - 수정 및 삭제 기능

### **5. 개인화된 기능**

- **위시리스트**
  - 관심 여행지 저장.
- **여행 기록 관리**
  - 작성한 플래너 및 리뷰를 프로필에서 확인.
- **맞춤 여행지 추천**
  - 사용자의 선호 테마, 좋아요 데이터를 AI가 분석하여 추천.

### **6. 외부 API 활용**

- Google Places API 또는 TripAdvisor API를 이용해 여행지 초기 데이터 세팅.

---

## **기술 스택 / 아키텍처**

**백엔드-**
<img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"><br>

**프론트엔드-**
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"><br>

**AI (추천 시스템 모델 API 서버) -**
<img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=Flask&logoColor=white"><br>

**데이터 콜렉터 (크롤링 및 데이터 전처리)-**
<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=Python&logoColor=white"><br>

**데이터베이스-**
<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
<img src="https://img.shields.io/badge/Hibernate-59666C?style=for-the-badge&logo=hibernate&logoColor=white"><br>

**배포-**
<img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonwebservices&logoColor=white">
<img src="https://img.shields.io/badge/CI%2FCD-Jenkins%20%2B%20GitHub-2C3E50?style=for-the-badge&logo=GitHubActions&logoColor=white"><br>

**인증-**
<img src="https://img.shields.io/badge/OAuth-3EAAAF?style=for-the-badge&logo=oauth&logoColor=white">
<img src="https://img.shields.io/badge/Google-4285F4?style=for-the-badge&logo=google&logoColor=white">
<img src="https://img.shields.io/badge/Kakao-FFCD00?style=for-the-badge&logo=kakaotalk&logoColor=black">
<img src="https://img.shields.io/badge/Naver-03C75A?style=for-the-badge&logo=naver&logoColor=white"><br>

**테스트서버-**
<img src="https://img.shields.io/badge/JUnit5-25A162?style=for-the-badge&logo=JUnit5&logoColor=white"><br>

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
