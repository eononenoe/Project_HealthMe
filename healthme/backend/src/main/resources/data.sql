-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: healthme
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- 초기 설정
SET FOREIGN_KEY_CHECKS = 0;

-- 기존 테이블 삭제
DROP TABLE IF EXISTS `product_nutrient`;
DROP TABLE IF EXISTS `product_store`;
DROP TABLE IF EXISTS `nutrient_result_desc`;
DROP TABLE IF EXISTS `health_tip`;

-- product_store 테이블 생성
CREATE TABLE `product_store` (
  `product_id` BIGINT NOT NULL AUTO_INCREMENT,
  `amount` INT NOT NULL,
  `category` VARCHAR(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` VARCHAR(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_url` VARCHAR(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` VARCHAR(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` INT NOT NULL,
  `salprice` INT NOT NULL,
  `keyword` VARCHAR(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sales_count` INT DEFAULT 0,
  `detail_img` VARCHAR(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

-- 테이블 'product_store' 데이터 삽입
LOCK TABLES `product_store` WRITE;
/*!40000 ALTER TABLE `product_store` DISABLE KEYS */;
INSERT INTO `product_store` VALUES (1,100,'축산물','한돈 부위별 대용량 고기 세트','https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/4c36b050-06f9-4ce1-9597-27bf4c2563fb.jpg','한돈 부위별 대용량 가성비 7종',28900,18900,'한돈',888,'/img/details/1.jpeg'),(2,100,'축산물','신선한 동물복지 유정란','https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/b5afa0d9-0d39-424a-b4aa-df14e290244e.jpg','동물복지 백색 유정란 20구',10200,8670,'계란',13,'/img/details/2.jpeg'),(3,100,'농산물','유기농 냉동 채소믹스','https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/2806a17d-deba-4bc4-b6ec-d6dc0c96e575.jpg','유기농 채소믹스 600g (냉동)',8990,8490,'채소믹스',76,'/img/details/3.jpeg'),(4,100,'농산물','국산 제철 완숙토마토','https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/dd55e8f3-621f-4b3b-b775-460c4b6c2435.jpeg','완숙토마토 1kg',11900,9900,'완숙토마토',88,'/img/details/4.jpeg'),(5,100,'농산물','유인원때로 돌아가보자','https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/90162457-a5b1-41ad-a320-21194a0738dc.jpg','바나나 1kg',6900,4990,'바나나',43,'/img/details/5.jpeg'),(6,100,'농산물','달콤한 대추방울토마토','https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/4436fdec-039d-4683-b8f3-7ebf677ad190.jpg','대추방울토마토 750g',11900,6990,'방울토마토',55,NULL),(7,100,'농산물','채소믹스 500g 패키지','https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/8a813917-6a80-4a23-8bf1-074df5875493.jpg','채소믹스 500g',5990,5290,'채소믹스',201,NULL),(8,100,'축산물','호주산 목초육 치마살','https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/5a551f25-bcc3-4b26-914e-4cedce85dc7e.jpeg?v=0531','호주산 목초육 치마살 구이용 300g',16590,11900,'소치마살',420,NULL),(9,100,'축산물','신선한 1등급 닭 다리살','https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/5fe86c36-0de7-4898-8f71-c644a841f117.jpg','1등급 닭 다리살 2종 (냉장)',18990,16290,'닭다리살',333,NULL),(10,100,'축산물','무항생제 오리 다리살','https://img-cf.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/shop/data/goods/1528354300775l0.jpg','무항생제 오리 다리살 슬라이스 350g (냉장)',9900,9190,'오리다리살',111,NULL),(11,100,'축산물','신선한 국내산 소고기 우둔살','https://img-cf.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/shop/data/goods/1637928156814l0.jpg','국내산 소고기 우둔살 200g (냉장)',13000,11150,'소우둔살',34,NULL),(12,100,'수산물','살이 오동통통 오른 새우','https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/0bdb4032-9df4-4037-8a25-a96a2ceec3d8.jpg','손질 생새우살 200g (냉동)',8400,6980,'생새우살',75,NULL),(13,100,'농산물','신선한 칠레산 블루베리','https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/a78fcd53-dd61-4b5c-afcd-7ee9a583e045.jpg','칠레산 블루베리 125g*3',19900,9900,'블루베리',55,NULL),(14,100,'수산물','살이 오동통통 오른 오징어','https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/a0b3861a-d6ad-48fc-b55f-c539779d1105.jpg','국산 손질오징어 300g (냉장)',16900,13900,'손질오징어',79,NULL),(15,100,'수산물','제철 국산 생굴','https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/faa7f5dc-3f71-4211-a199-ed40d03c2aab.jpg','신선한 국산 생굴 420g',10590,7790,'생굴',82,NULL),(16,100,'수산물','엄청난 대 광어','https://img-cf.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/shop/data/goods/160369196760l0.jpg','대광어회 150g (냉장)',16900,14500,'광어',91,NULL),(17,100,'수산물','내 얼굴이 오징어라고?','https://product-image.kurly.com/hdims/resize/%5E%3E720x%3E936/cropcenter/720x936/quality/85/src/product/image/8016a3c9-9a2d-4f56-9ce1-d4ca534222bf.jpg','무늬오징어회 100g (냉장)',16900,13500,'오징어회',88,NULL),(18,100,'수산물','오늘밤 세계여행 시켜줄게','https://img-cf.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/shop/data/goods/1613538785508l0.jpg','자연산 손질 바다장어 350g',29800,18900,'장어',62,NULL),(19,100,'수산물','영양만점 전복','https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/2922045a-660d-4479-807a-c3bb7d14c847.jpg','손질 전복살 700g',33000,23000,'전복',45,NULL),(20,100,'유제품','신선한 우유','https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/6225ab1a-3cb0-4b44-917b-8804d6f79ca5.jpg','전용목장우유 1.8L',5500,4980,'우유',34,NULL),(21,100,'유제품','먹으면 장이 탄탄 해지는 그릭요거트','https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/22702b7a-669f-4e3d-9c2b-4c828993b200.jpg','바이오 그릭 요거트 무가당 플레인 400g',4680,3980,'그릭요거트',56,NULL),(22,100,'유제품','치즈 먹으면 미소가 치즈','https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/cccd8469-0a6d-4be3-b22b-e1d87b25f9a7.jpg','치즈다운 치즈 13매',4200,3980,'치즈슬라이스',58,NULL),(23,100,'유제품','아몬드 브리즈 다양하게 즐겨요','https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/0131b46f-d3b1-4b88-bee1-d1ddc9e12022.jpg','아몬드 브리즈 2종 (190mL X 24팩)',18900,16990,'아몬드브리즈',57,NULL),(24,100,'유제품','치즈가 늘어나는 모짜렐라','https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/8663bab8-b594-469a-8cc1-72c6146b5048.jpg','모짜렐라 스낵팩 170g',11000,10900,'모짜렐라',16,NULL),(25,100,'유제품','프레시 치즈의 신선함을 그대로','https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/5432d5eb-206a-4233-b96f-3e79f1c2143e.jpeg','부라타 치즈 100g (냉동)',6800,5800,'부라타치즈',58,NULL),(26,100,'수산물','고등어 먹으면 뼈가 튼튼','https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/e9079270-38bb-4d73-ad3a-51c632ac9610.jpg','생 고등어 100g X 4개',7300,6800,'생고등어',81,NULL),(27,100,'수산물','남녀노소 연어 좋아하잖아','https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/ae8e6e50-6fb1-4005-b32a-726731ce9eef.jpg','노르웨이 생연어 400g',31900,25900,'생연어',101,NULL),(28,100,'수산물','니들이 게맛을 알아?','https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/6d276631-e7d0-4d17-a978-4b3d97793ce0.jpg','국산 손질 꽃게 2종 (냉동)',14900,12200,'꽃게',168,NULL),(29,100,'수산물','나는 문어 꿈을 꾸는 문어','https://img-cf.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/shop/data/goods/1581052211476l0.jpg','문어 슬라이스 120g (냉장)',13000,11500,'문어슬라이스',310,NULL),(30,100,'수산물','오늘 만큼은 FLEX 하자','https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/3553c4c8-e5d5-464c-9b03-bb66b28922c8.jpg','캐나다산 랍스터 꼬리 1마리',22000,16800,'랍스터',11,NULL),(31,100,'축산물','다이어트의 기초','https://img-cf.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/shop/data/goods/1638428080478l0.jpg','무항생제 닭 가슴살 500g',6900,6300,'닭가슴살',999,NULL),(32,100,'축산물','소고기 만큼 부드러운 닭 안심','https://img-cf.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/shop/data/goods/1653037672255l0.jpeg','무항생제 닭 안심살 500g',6900,6200,'닭안심',201,NULL),(33,100,'축산물','닭,돼지들이랑은 비교가 안되는 안심','https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/fc3eb710-126d-4c18-b776-ac6809b07a73.jpeg?v=0531','호주산 소고기 목초육 안심 스테이크 250g',24750,15990,'소고기안심',123,NULL),(34,100,'농산물','의외로 맛있는 아보카도','https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/ef6261bb-5d4c-477f-94aa-66c004525821.jpg','페루 아보카도 1kg (4~7입)',19900,14900,'아보카도',45,NULL),(35,100,'농산물','짱구가 싫어하는 파프리카','https://img-cf.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/shop/data/goods/1609900940181l0.jpg','파프리카 4입',5990,4990,'파프리카',77,NULL),(36,100,'농산물','환공포증 있으면 브로콜리도 싫어한다던데','https://img-cf.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/shop/data/goods/1648209108935l0.jpeg','친환경 브로콜리 1개',5490,3990,'브로콜리',89,NULL),(37,100,'건강식품','오랜시간 사랑받는 프리미엄 유산균','https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/3bbb89c4-1912-4957-99ce-0ef55c017252.jpeg','덴마크 유산균이야기 (60일분)',55900,29900,'유산균',288,NULL),(38,100,'건강식품','독일 프리미엄 이뮨 비타민','https://3p-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/files/1561e679-59a5-4863-8e11-dc0d757e630c/da0df228-6694-433a-9220-625718fab26f.jpg','이뮨 비타민 드링크 +정제 2박스 (60일분)',211400,115390,'이뮨비타민',211,NULL),(39,100,'건강식품','꼬박꼬박 간편하게 챙겨 먹는','https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/77547c6d-3208-47b3-84ff-31efef0799e3.jpg','꼬박꼬밥 9종 (택1)',35500,22900,'꼬박꼬밥',36,NULL),(40,100,'건강식품','달콤하게 섭취하는 단백질','https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/e967a17e-ecb5-4b6f-bdc7-5d5e0e1ee940.jpg','프로틴 단백질 드링크 7종 (6개입)',15000,10900,'프로틴',874,NULL),(41,100,'건강식품','더욱 진하게 즐기는 푸룬','https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/a5966787-5a67-438a-a78a-0c0ccef28853.jpg','고농축 푸룬 딥워터 (180mL X 3개입)',13500,11500,'푸룬딥워터',456,NULL),(42,100,'건강식품','비타민 B군까지 포함된','https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/11920ea3-ee33-46cf-a6a7-7ef7cc8e7ebd.jpg','마그네슘400 (30일분)',20000,14900,'마그네슘400',100,NULL),(43,100,'건강식품','유기농 사과의 풍부한 영양이 살아있는 천연 사과식초','https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/8bd9f99f-ebc8-49b4-b0b2-8b647e4b43b9.jpg','유기농 사과 식초',8200,6000,'사과식초',135,NULL),(44,100,'건강식품','체네 흡수율이 좋은 RTG형','https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/bda636d0-a1f2-4d84-bbd2-a5d98795edd3.jpg','알티지 오메가-3 (90일분)',60000,27000,'오메가3',139,NULL),(45,100,'건강식품','건강핵심 성분을 한번에, 4 int 멀티 가능성','https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/a7f6045c-dee2-43df-943d-0545ea7da8fb.jpg','칼슘 앤 마그네슘 비타민D 아연 베이직(180일분)',35000,16900,'칼마비아',33,NULL);
/*!40000 ALTER TABLE `product_store` ENABLE KEYS */;
UNLOCK TABLES;

-- product_nutrient 테이블 생성 (외래키 포함)
CREATE TABLE `product_nutrient` (
  `product_nutrient_id` BIGINT NOT NULL AUTO_INCREMENT,
  `product_id` BIGINT,
  `protein` VARCHAR(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `iron` VARCHAR(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vitamin_d` VARCHAR(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `calcium` VARCHAR(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dietary_fiber` VARCHAR(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `magnesium` VARCHAR(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `potassium` VARCHAR(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `biotin` VARCHAR(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zinc` VARCHAR(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `arginine` VARCHAR(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`product_nutrient_id`),
  CONSTRAINT `fk_product_nutrient_to_store` FOREIGN KEY (`product_id`) REFERENCES `product_store` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

-- 테이블 'product_nutrient' 데이터 삽입
LOCK TABLES `product_nutrient` WRITE;
/*!40000 ALTER TABLE `product_nutrient` DISABLE KEYS */;
INSERT INTO `product_nutrient` VALUES (1,1,'24g','2.2mg','1.5μg','15mg','0g','22mg','300mg','5μg','1.2mg','1100mg'),(2,2,'12g','1.5mg','1.0μg','50mg','0g','10mg','140mg','3μg','1.0mg','400mg'),(3,3,'2g','0.6mg','0.0μg','40mg','3g','20mg','250mg','1μg','0.5mg','200mg'),(4,4,'1g','0.3mg','0.0μg','10mg','1g','10mg','200mg','0μg','0.2mg','150mg'),(5,5,'1.1g','0.3mg','0.0μg','5mg','2g','27mg','358mg','0μg','0.2mg','100mg'),(6,6,'1.2g','0.4mg','0.0μg','12mg','1.5g','15mg','220mg','0μg','0.3mg','120mg'),(7,7,'2g','0.5mg','0.0μg','35mg','2g','18mg','240mg','1μg','0.4mg','180mg'),(8,8,'20g','2.5mg','1.2μg','20mg','0g','25mg','310mg','4μg','1.5mg','1000mg'),(9,9,'18g','1.8mg','1.0μg','15mg','0g','22mg','280mg','3μg','1.3mg','900mg'),(10,10,'17g','1.7mg','1.0μg','14mg','0g','21mg','270mg','3μg','1.2mg','850mg'),(11,11,'22g','2.0mg','1.1μg','18mg','0g','24mg','290mg','4μg','1.4mg','950mg'),(12,12,'19g','1.9mg','1.0μg','16mg','0g','23mg','275mg','3μg','1.3mg','920mg'),(13,13,'0.7g','0.3mg','0.0μg','6mg','2.4g','5mg','77mg','0μg','0.2mg','50mg'),(14,14,'15g','1.5mg','1.0μg','12mg','0g','20mg','260mg','3μg','1.1mg','800mg'),(15,15,'14g','1.4mg','1.0μg','11mg','0g','19mg','250mg','3μg','1.0mg','780mg'),(16,16,'21g','2.1mg','1.2μg','19mg','0g','26mg','300mg','4μg','1.5mg','980mg'),(17,17,'13g','1.3mg','1.0μg','10mg','0g','18mg','240mg','2μg','1.0mg','750mg'),(18,18,'23g','2.3mg','1.3μg','21mg','0g','27mg','310mg','4μg','1.6mg','1000mg'),(19,19,'16g','1.6mg','1.0μg','13mg','0g','22mg','270mg','3μg','1.2mg','850mg'),(20,20,'3.3g','0.1mg','0.0μg','113mg','0g','10mg','150mg','0μg','0.4mg','100mg'),(21,21,'9g','0.2mg','0.0μg','110mg','0g','12mg','160mg','0μg','0.5mg','150mg'),(22,22,'5g','0.3mg','0.0μg','120mg','0g','15mg','170mg','0μg','0.6mg','200mg'),(23,23,'1g','0.2mg','0.0μg','10mg','0g','5mg','100mg','0μg','0.2mg','50mg'),(24,24,'7g','0.3mg','0.0μg','130mg','0g','16mg','180mg','0μg','0.7mg','220mg'),(25,25,'6g','0.2mg','0.0μg','125mg','0g','14mg','175mg','0μg','0.6mg','210mg'),(26,26,'20g','2.0mg','1.1μg','17mg','0g','23mg','280mg','3μg','1.3mg','900mg'),(27,27,'22g','2.2mg','1.2μg','19mg','0g','25mg','290mg','4μg','1.4mg','950mg'),(28,28,'18g','1.8mg','1.0μg','15mg','0g','21mg','260mg','3μg','1.2mg','850mg'),(29,29,'19g','1.9mg','1.0μg','16mg','0g','22mg','270mg','3μg','1.3mg','870mg'),(30,30,'21g','2.1mg','1.2μg','18mg','0g','24mg','300mg','4μg','1.5mg','980mg'),(31,31,'23g','2.3mg','1.3μg','20mg','0g','26mg','310mg','4μg','1.6mg','1000mg'),(32,32,'22g','2.2mg','1.2μg','19mg','0g','25mg','290mg','4μg','1.4mg','950mg'),(33,33,'24g','2.4mg','1.4μg','21mg','0g','27mg','320mg','5μg','1.7mg','1050mg'),(34,34,'2g','0.6mg','0.0μg','12mg','3g','29mg','485mg','0μg','0.3mg','150mg'),(35,35,'1.3g','0.4mg','0.0μg','10mg','1.5g','20mg','200mg','0μg','0.2mg','120mg'),(36,36,'3g','0.7mg','0.0μg','40mg','2g','25mg','300mg','1μg','0.5mg','180mg'),(37,37,'0g','0mg','0.0μg','0mg','0g','0mg','0mg','0μg','0mg','0mg'),(38,38,'0g','0mg','0.0μg','0mg','0g','0mg','0mg','0μg','0mg','0mg'),(39,39,'5g','1.0mg','0.5μg','50mg','2g','10mg','100mg','2μg','0.8mg','300mg'),(40,40,'10g','1.5mg','0.8μg','60mg','1g','15mg','150mg','3μg','1.0mg','500mg'),(41,41,'1g','0.2mg','0.0μg','5mg','1g','5mg','80mg','0μg','0.1mg','50mg'),(42,42,'0g','0mg','5μg','5mg','0g','400mg','20mg','0μg','0.2mg','0mg'),(43,43,'0g','0.1mg','0.0μg','7mg','0g','2mg','150mg','0μg','0.1mg','0mg'),(44,44,'0g','0mg','20μg','0mg','0g','0mg','0mg','0μg','0.1mg','0mg'),(45,45,'0.2g','0.3mg','5μg','250mg','0.5g','50mg','75mg','5μg','1.5mg','0mg');
/*!40000 ALTER TABLE `product_nutrient` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

CREATE TABLE nutrient_result_desc (
  id INT PRIMARY KEY,
  nutrient_name VARCHAR(50),
  range_start INT,
  description TEXT,
  tip TEXT,
  foods TEXT,
  info TEXT
);

INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (1,'단백질',0,'단백질이 매우 부족한 상태입니다. 닭가슴살이나 두부 같은 식품 섭취가 도움이 됩니다.','매 끼니 단백질 반찬을 포함해보세요.','닭가슴살,두부,삶은계란','단백질은 근육, 피부, 머리카락, 장기 등 신체 조직을 구성하는 핵심 영양소입니다.\n또한 효소, 호르몬, 항체 등의 재료가 되어 생리 기능을 조절하고 면역을 유지합니다.\n성장기, 회복기, 운동하는 사람에게 특히 더 많이 필요합니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (2,'단백질',20,'단백질 보충이 필요합니다. 계란이나 콩류를 식단에 추가해보세요.','아침에 삶은 계란 한 개를 추가해보세요.','계란,렌틸콩,두유','단백질은 근육, 피부, 머리카락, 장기 등 신체 조직을 구성하는 핵심 영양소입니다.\n또한 효소, 호르몬, 항체 등의 재료가 되어 생리 기능을 조절하고 면역을 유지합니다.\n성장기, 회복기, 운동하는 사람에게 특히 더 많이 필요합니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (3,'단백질',40,'단백질 섭취가 보통입니다. 생선이나 요거트를 꾸준히 섭취하면 좋습니다.','요거트를 간식으로 활용해보세요.','연어,요거트,두유','단백질은 근육, 피부, 머리카락, 장기 등 신체 조직을 구성하는 핵심 영양소입니다.\n또한 효소, 호르몬, 항체 등의 재료가 되어 생리 기능을 조절하고 면역을 유지합니다.\n성장기, 회복기, 운동하는 사람에게 특히 더 많이 필요합니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (4,'단백질',60,'단백질 상태가 양호합니다. 낫또, 렌틸콩 등을 함께 활용해보세요.','현재 식단을 꾸준히 유지하는 것이 좋습니다.','낫또,렌틸콩,두부','단백질은 근육, 피부, 머리카락, 장기 등 신체 조직을 구성하는 핵심 영양소입니다.\n또한 효소, 호르몬, 항체 등의 재료가 되어 생리 기능을 조절하고 면역을 유지합니다.\n성장기, 회복기, 운동하는 사람에게 특히 더 많이 필요합니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (5,'단백질',80,'단백질이 충분한 상태입니다. 식단 균형을 유지해주세요.','단백질 과잉을 피하고 채소 섭취를 늘리세요.','닭가슴살,두부,시금치','단백질은 근육, 피부, 머리카락, 장기 등 신체 조직을 구성하는 핵심 영양소입니다.\n또한 효소, 호르몬, 항체 등의 재료가 되어 생리 기능을 조절하고 면역을 유지합니다.\n성장기, 회복기, 운동하는 사람에게 특히 더 많이 필요합니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (6,'단백질',100,'단백질 섭취가 다소 과한 편입니다. 신장 부담에 주의하세요.','단백질 보충제를 줄이고 식물성 위주로 전환해보세요.','두유,아몬드,채소류','단백질은 근육, 피부, 머리카락, 장기 등 신체 조직을 구성하는 핵심 영양소입니다.\n또한 효소, 호르몬, 항체 등의 재료가 되어 생리 기능을 조절하고 면역을 유지합니다.\n성장기, 회복기, 운동하는 사람에게 특히 더 많이 필요합니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (7,'철분',0,'철분이 심각하게 부족합니다. 간, 시금치, 조개류 등이 좋습니다.','빈혈 증상이 있다면 빠른 보충이 필요합니다.','간,시금치,홍합','철분은 혈액 속에서 산소를 운반하는 헤모글로빈과 미오글로빈을 만드는 데 필수입니다.\n부족하면 빈혈, 피로, 집중력 저하, 창백함 등의 증상이 나타날 수 있습니다.\n특히 여성, 임산부, 성장기 아동은 철분 요구량이 높습니다.\n\n');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (8,'철분',20,'철분 보충이 필요합니다. 붉은살 생선이나 비트 등을 참고해보세요.','비타민 C와 함께 섭취하면 흡수율이 증가합니다.','고등어,비트,오렌지','철분은 혈액 속에서 산소를 운반하는 헤모글로빈과 미오글로빈을 만드는 데 필수입니다.\n부족하면 빈혈, 피로, 집중력 저하, 창백함 등의 증상이 나타날 수 있습니다.\n특히 여성, 임산부, 성장기 아동은 철분 요구량이 높습니다.\n\n');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (9,'철분',40,'철분 섭취가 보통입니다. 철분이 함유된 곡물류도 괜찮습니다.','철분 보충제를 필요 시점에만 사용하세요.','귀리,강낭콩,계란','철분은 혈액 속에서 산소를 운반하는 헤모글로빈과 미오글로빈을 만드는 데 필수입니다.\n부족하면 빈혈, 피로, 집중력 저하, 창백함 등의 증상이 나타날 수 있습니다.\n특히 여성, 임산부, 성장기 아동은 철분 요구량이 높습니다.\n\n');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (10,'철분',60,'철분 상태가 양호합니다. 꾸준히 유지하세요.','지속적인 채소 중심 식단이 좋습니다.','시금치,잡곡밥,계란','철분은 혈액 속에서 산소를 운반하는 헤모글로빈과 미오글로빈을 만드는 데 필수입니다.\n부족하면 빈혈, 피로, 집중력 저하, 창백함 등의 증상이 나타날 수 있습니다.\n특히 여성, 임산부, 성장기 아동은 철분 요구량이 높습니다.\n\n');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (11,'철분',80,'철분 섭취가 많습니다. 비타민 C와 함께 흡수율을 고려하세요.','보충제를 사용 중이라면 용량을 조절하세요.','쇠고기,자두,아몬드','철분은 혈액 속에서 산소를 운반하는 헤모글로빈과 미오글로빈을 만드는 데 필수입니다.\n부족하면 빈혈, 피로, 집중력 저하, 창백함 등의 증상이 나타날 수 있습니다.\n특히 여성, 임산부, 성장기 아동은 철분 요구량이 높습니다.\n\n');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (12,'철분',100,'철분 과잉 상태일 수 있습니다. 복용 중인 보충제를 점검해보세요.','간기능 수치를 확인해보는 것도 좋습니다.','시금치,두부,과일','철분은 혈액 속에서 산소를 운반하는 헤모글로빈과 미오글로빈을 만드는 데 필수입니다.\n부족하면 빈혈, 피로, 집중력 저하, 창백함 등의 증상이 나타날 수 있습니다.\n특히 여성, 임산부, 성장기 아동은 철분 요구량이 높습니다.\n\n');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (13,'비타민 D',0,'비타민 D가 매우 부족합니다. 연어, 계란노른자 등이 유익합니다.','햇볕을 하루 15분 이상 쬐는 것이 중요합니다.','연어,계란노른자,강화우유','비타민 D는 칼슘과 인의 흡수를 도와 뼈를 튼튼하게 유지하는 지용성 비타민입니다.\n면역력 증진, 우울감 감소, 근기능 유지에도 중요한 역할을 합니다.\n햇빛을 통해 피부에서 합성되며, 연어, 달걀노른자 등에도 함유되어 있습니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (14,'비타민 D',20,'비타민 D 보충이 필요합니다. 표고버섯이나 강화 우유를 참고하세요.','우유나 버섯을 식단에 포함해보세요.','표고버섯,강화우유,계란','비타민 D는 칼슘과 인의 흡수를 도와 뼈를 튼튼하게 유지하는 지용성 비타민입니다.\n면역력 증진, 우울감 감소, 근기능 유지에도 중요한 역할을 합니다.\n햇빛을 통해 피부에서 합성되며, 연어, 달걀노른자 등에도 함유되어 있습니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (15,'비타민 D',40,'비타민 D 상태가 보통입니다. 햇볕 노출과 식단을 병행하세요.','주 2~3회 외부활동이 도움이 됩니다.','우유,버섯,달걀','비타민 D는 칼슘과 인의 흡수를 도와 뼈를 튼튼하게 유지하는 지용성 비타민입니다.\n면역력 증진, 우울감 감소, 근기능 유지에도 중요한 역할을 합니다.\n햇빛을 통해 피부에서 합성되며, 연어, 달걀노른자 등에도 함유되어 있습니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (16,'비타민 D',60,'비타민 D 상태가 좋습니다. 유지를 위해 꾸준히 관리하세요.','운동 후 야외활동을 병행해보세요.','연어,강화우유,계란','비타민 D는 칼슘과 인의 흡수를 도와 뼈를 튼튼하게 유지하는 지용성 비타민입니다.\n면역력 증진, 우울감 감소, 근기능 유지에도 중요한 역할을 합니다.\n햇빛을 통해 피부에서 합성되며, 연어, 달걀노른자 등에도 함유되어 있습니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (17,'비타민 D',80,'다소 많은 섭취 상태입니다. 기능성 식품은 조절이 필요합니다.','보충제를 잠시 중단해보세요.','우유,달걀,두부','비타민 D는 칼슘과 인의 흡수를 도와 뼈를 튼튼하게 유지하는 지용성 비타민입니다.\n면역력 증진, 우울감 감소, 근기능 유지에도 중요한 역할을 합니다.\n햇빛을 통해 피부에서 합성되며, 연어, 달걀노른자 등에도 함유되어 있습니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (18,'비타민 D',100,'과다 섭취 우려가 있습니다. 혈중 농도 확인을 권장합니다.','검진을 통해 농도를 체크하세요.','버섯,두유,강화우유','비타민 D는 칼슘과 인의 흡수를 도와 뼈를 튼튼하게 유지하는 지용성 비타민입니다.\n면역력 증진, 우울감 감소, 근기능 유지에도 중요한 역할을 합니다.\n햇빛을 통해 피부에서 합성되며, 연어, 달걀노른자 등에도 함유되어 있습니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (19,'칼슘',0,'칼슘이 부족한 상태입니다. 우유, 멸치, 두부 등 섭취가 도움됩니다.','우유 1컵을 하루에 추가해보세요.','우유,멸치,두부','칼슘은 뼈와 치아를 구성하는 주요 무기질로, 체내에서 가장 많이 존재하는 미네랄입니다.\n근육 수축, 신경 전달, 혈액 응고, 심장 박동 조절 등 다양한 생리 작용에 관여합니다.\n부족하면 성장 저하, 골다공증, 근육 경련 등이 나타날 수 있습니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (20,'칼슘',20,'칼슘 보충이 필요합니다. 요거트나 치즈도 좋은 선택입니다.','간식으로 치즈를 활용해보세요.','치즈,요거트,두유','칼슘은 뼈와 치아를 구성하는 주요 무기질로, 체내에서 가장 많이 존재하는 미네랄입니다.\n근육 수축, 신경 전달, 혈액 응고, 심장 박동 조절 등 다양한 생리 작용에 관여합니다.\n부족하면 성장 저하, 골다공증, 근육 경련 등이 나타날 수 있습니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (21,'칼슘',40,'칼슘 상태가 보통입니다. 해조류 섭취도 고려해보세요.','김이나 다시마를 곁들여보세요.','다시마,김,두부','칼슘은 뼈와 치아를 구성하는 주요 무기질로, 체내에서 가장 많이 존재하는 미네랄입니다.\n근육 수축, 신경 전달, 혈액 응고, 심장 박동 조절 등 다양한 생리 작용에 관여합니다.\n부족하면 성장 저하, 골다공증, 근육 경련 등이 나타날 수 있습니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (22,'칼슘',60,'칼슘이 충분합니다. 유지가 중요합니다.','운동 후 유제품 섭취가 좋습니다.','요거트,우유,두부','칼슘은 뼈와 치아를 구성하는 주요 무기질로, 체내에서 가장 많이 존재하는 미네랄입니다.\n근육 수축, 신경 전달, 혈액 응고, 심장 박동 조절 등 다양한 생리 작용에 관여합니다.\n부족하면 성장 저하, 골다공증, 근육 경련 등이 나타날 수 있습니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (23,'칼슘',80,'칼슘 섭취가 많습니다. 비타민 D와의 균형을 고려하세요.','비타민 D를 병행 섭취하세요.','두부,시금치,우유','칼슘은 뼈와 치아를 구성하는 주요 무기질로, 체내에서 가장 많이 존재하는 미네랄입니다.\n근육 수축, 신경 전달, 혈액 응고, 심장 박동 조절 등 다양한 생리 작용에 관여합니다.\n부족하면 성장 저하, 골다공증, 근육 경련 등이 나타날 수 있습니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (24,'칼슘',100,'과도한 칼슘은 신장 부담이 될 수 있습니다. 주의하세요.','검진을 통해 신장 기능을 점검해보세요.','우유,멸치,견과류','칼슘은 뼈와 치아를 구성하는 주요 무기질로, 체내에서 가장 많이 존재하는 미네랄입니다.\n근육 수축, 신경 전달, 혈액 응고, 심장 박동 조절 등 다양한 생리 작용에 관여합니다.\n부족하면 성장 저하, 골다공증, 근육 경련 등이 나타날 수 있습니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (25,'식이섬유',0,'식이섬유가 매우 부족합니다. 양배추, 고구마 등이 좋습니다.','하루 한 끼 이상 채소 반찬을 넣어보세요.','양배추,고구마,상추','식이섬유는 소화 효소에 의해 분해되지 않고 장까지 도달하는 탄수화물의 일종입니다.\n장내 유익균 증식, 변비 예방, 혈당과 콜레스테롤 조절에 도움을 줍니다.\n채소, 과일, 통곡물, 콩류 등에 풍부하게 함유되어 있습니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (26,'식이섬유',20,'보충이 필요합니다. 사과나 귀리도 고려해보세요.','과일 간식으로 대체해보세요.','사과,귀리,오트밀','식이섬유는 소화 효소에 의해 분해되지 않고 장까지 도달하는 탄수화물의 일종입니다.\n장내 유익균 증식, 변비 예방, 혈당과 콜레스테롤 조절에 도움을 줍니다.\n채소, 과일, 통곡물, 콩류 등에 풍부하게 함유되어 있습니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (27,'식이섬유',40,'식이섬유 섭취가 보통입니다. 콩류나 해조류를 함께 드세요.','밥에 콩을 넣어보는 것도 방법입니다.','콩,미역,김','식이섬유는 소화 효소에 의해 분해되지 않고 장까지 도달하는 탄수화물의 일종입니다.\n장내 유익균 증식, 변비 예방, 혈당과 콜레스테롤 조절에 도움을 줍니다.\n채소, 과일, 통곡물, 콩류 등에 풍부하게 함유되어 있습니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (28,'식이섬유',60,'충분한 상태입니다. 다양한 채소 섭취를 유지하세요.','녹색 채소를 꾸준히 섭취하세요.','브로콜리,양상추,시금치','식이섬유는 소화 효소에 의해 분해되지 않고 장까지 도달하는 탄수화물의 일종입니다.\n장내 유익균 증식, 변비 예방, 혈당과 콜레스테롤 조절에 도움을 줍니다.\n채소, 과일, 통곡물, 콩류 등에 풍부하게 함유되어 있습니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (29,'식이섬유',80,'다소 많은 편입니다. 복부 팽만감에 주의하세요.','물 섭취를 늘리면 도움이 됩니다.','양배추,고구마,견과류','식이섬유는 소화 효소에 의해 분해되지 않고 장까지 도달하는 탄수화물의 일종입니다.\n장내 유익균 증식, 변비 예방, 혈당과 콜레스테롤 조절에 도움을 줍니다.\n채소, 과일, 통곡물, 콩류 등에 풍부하게 함유되어 있습니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (30,'식이섬유',100,'지나친 섭취는 배변 활동에 영향을 줄 수 있어요.','식이섬유 보충제를 줄이세요.','귀리,콩,시리얼','식이섬유는 소화 효소에 의해 분해되지 않고 장까지 도달하는 탄수화물의 일종입니다.\n장내 유익균 증식, 변비 예방, 혈당과 콜레스테롤 조절에 도움을 줍니다.\n채소, 과일, 통곡물, 콩류 등에 풍부하게 함유되어 있습니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (31,'마그네슘',0,'마그네슘이 매우 부족한 상태입니다. 두부, 시금치, 바나나 등이 좋습니다.','견과류나 통곡물 간식을 추가해보세요.','두부,시금치,바나나','마그네슘은 300가지 이상의 효소 반응에 관여하는 필수 미네랄입니다.\n근육 수축과 이완, 신경 전달, 심장 리듬 유지 등에 중요한 역할을 합니다.\n부족하면 근육 경련, 피로, 불면, 두통, 불안 증세 등이 나타날 수 있습니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (32,'마그네슘',20,'마그네슘 보충이 필요합니다. 현미나 해바라기씨를 고려해보세요.','아침 식사에 통곡물 시리얼을 넣어보세요.','현미,해바라기씨,아몬드','마그네슘은 300가지 이상의 효소 반응에 관여하는 필수 미네랄입니다.\n근육 수축과 이완, 신경 전달, 심장 리듬 유지 등에 중요한 역할을 합니다.\n부족하면 근육 경련, 피로, 불면, 두통, 불안 증세 등이 나타날 수 있습니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (33,'마그네슘',40,'마그네슘 섭취가 보통입니다. 녹색채소와 해조류로 균형을 맞추세요.','식단에 해조류를 곁들여 보세요.','시금치,김,아보카도','마그네슘은 300가지 이상의 효소 반응에 관여하는 필수 미네랄입니다.\n근육 수축과 이완, 신경 전달, 심장 리듬 유지 등에 중요한 역할을 합니다.\n부족하면 근육 경련, 피로, 불면, 두통, 불안 증세 등이 나타날 수 있습니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (34,'마그네슘',60,'마그네슘 상태가 양호합니다. 균형 잡힌 식사를 유지하세요.','운동 후 바나나와 견과류를 간식으로 섭취해보세요.','바나나,캐슈넛,두부','마그네슘은 300가지 이상의 효소 반응에 관여하는 필수 미네랄입니다.\n근육 수축과 이완, 신경 전달, 심장 리듬 유지 등에 중요한 역할을 합니다.\n부족하면 근육 경련, 피로, 불면, 두통, 불안 증세 등이 나타날 수 있습니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (35,'마그네슘',80,'마그네슘 섭취가 다소 많은 상태입니다. 보충제 사용량을 점검하세요.','식물성 위주 식단으로 조절해보세요.','귀리,두유,통밀빵','마그네슘은 300가지 이상의 효소 반응에 관여하는 필수 미네랄입니다.\n근육 수축과 이완, 신경 전달, 심장 리듬 유지 등에 중요한 역할을 합니다.\n부족하면 근육 경련, 피로, 불면, 두통, 불안 증세 등이 나타날 수 있습니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (36,'마그네슘',100,'과다 섭취는 설사나 위장 장애를 유발할 수 있습니다.','보충제를 중단하고 식사 위주 섭취로 전환해보세요.','두유,현미,채소류','마그네슘은 300가지 이상의 효소 반응에 관여하는 필수 미네랄입니다.\n근육 수축과 이완, 신경 전달, 심장 리듬 유지 등에 중요한 역할을 합니다.\n부족하면 근육 경련, 피로, 불면, 두통, 불안 증세 등이 나타날 수 있습니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (37,'칼륨',0,'칼륨이 매우 부족한 상태입니다. 바나나, 감자, 아보카도 섭취가 좋습니다.','하루 한 번 과일을 간식으로 챙겨보세요.','바나나,감자,아보카도','칼륨은 세포 내에 존재하는 전해질로, 나트륨과 함께 수분 균형을 유지합니다.\n혈압 조절, 근육 기능, 신경 자극 전달에 꼭 필요한 역할을 합니다.\n채소, 과일(바나나, 아보카도 등), 콩류, 감자에 풍부합니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (38,'칼륨',20,'칼륨 보충이 필요합니다. 채소나 콩류를 함께 섭취하세요.','국이나 반찬에 콩나물을 넣어보세요.','콩나물,당근,두부','칼륨은 세포 내에 존재하는 전해질로, 나트륨과 함께 수분 균형을 유지합니다.\n혈압 조절, 근육 기능, 신경 자극 전달에 꼭 필요한 역할을 합니다.\n채소, 과일(바나나, 아보카도 등), 콩류, 감자에 풍부합니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (39,'칼륨',40,'칼륨 섭취가 보통입니다. 다양한 채소와 과일을 유지하세요.','식단에 삶은 야채를 자주 포함해보세요.','브로콜리,사과,양상추','칼륨은 세포 내에 존재하는 전해질로, 나트륨과 함께 수분 균형을 유지합니다.\n혈압 조절, 근육 기능, 신경 자극 전달에 꼭 필요한 역할을 합니다.\n채소, 과일(바나나, 아보카도 등), 콩류, 감자에 풍부합니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (40,'칼륨',60,'칼륨 상태가 양호합니다. 꾸준히 식이섬유와 함께 섭취하세요.','식사 중 나트륨을 줄이고 채소 비중을 늘려보세요.','오이,시금치,키위','칼륨은 세포 내에 존재하는 전해질로, 나트륨과 함께 수분 균형을 유지합니다.\n혈압 조절, 근육 기능, 신경 자극 전달에 꼭 필요한 역할을 합니다.\n채소, 과일(바나나, 아보카도 등), 콩류, 감자에 풍부합니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (41,'칼륨',80,'칼륨 섭취가 많습니다. 신장 질환이 있다면 주의가 필요합니다.','보충제를 사용 중이라면 복용량을 점검하세요.','토마토,바나나,고구마','칼륨은 세포 내에 존재하는 전해질로, 나트륨과 함께 수분 균형을 유지합니다.\n혈압 조절, 근육 기능, 신경 자극 전달에 꼭 필요한 역할을 합니다.\n채소, 과일(바나나, 아보카도 등), 콩류, 감자에 풍부합니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (42,'칼륨',100,'칼륨 과잉은 심장 기능에 영향을 줄 수 있습니다.','의사 상담을 통해 수치를 점검하고 식단을 조절하세요.','과일류,감자,두유','칼륨은 세포 내에 존재하는 전해질로, 나트륨과 함께 수분 균형을 유지합니다.\n혈압 조절, 근육 기능, 신경 자극 전달에 꼭 필요한 역할을 합니다.\n채소, 과일(바나나, 아보카도 등), 콩류, 감자에 풍부합니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (43,'비오틴',0,'비오틴이 매우 부족한 상태입니다. 탈모나 피부 트러블로 나타날 수 있습니다.','달걀노른자나 아보카도를 자주 섭취해보세요.','달걀노른자,아보카도,견과류','비오틴은 비타민 B군에 속하는 수용성 비타민으로, 에너지 대사에 관여합니다.\n지방, 탄수화물, 단백질의 분해와 피부, 손톱, 머리카락 건강 유지에 도움을 줍니다.\n부족하면 피부염, 탈모, 피로감 등이 나타날 수 있습니다.\n\n');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (44,'비오틴',20,'비오틴 보충이 필요합니다. 육류나 콩류도 좋은 공급원입니다.','주 2~3회 고기 반찬을 곁들여 보세요.','닭고기,대두,달걀','비오틴은 비타민 B군에 속하는 수용성 비타민으로, 에너지 대사에 관여합니다.\n지방, 탄수화물, 단백질의 분해와 피부, 손톱, 머리카락 건강 유지에 도움을 줍니다.\n부족하면 피부염, 탈모, 피로감 등이 나타날 수 있습니다.\n\n');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (45,'비오틴',40,'비오틴 섭취가 보통입니다. 균형 잡힌 식단을 유지하세요.','견과류나 통곡물 간식을 포함해보세요.','귀리,해바라기씨,호두','비오틴은 비타민 B군에 속하는 수용성 비타민으로, 에너지 대사에 관여합니다.\n지방, 탄수화물, 단백질의 분해와 피부, 손톱, 머리카락 건강 유지에 도움을 줍니다.\n부족하면 피부염, 탈모, 피로감 등이 나타날 수 있습니다.\n\n');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (46,'비오틴',60,'비오틴 상태가 양호합니다. 비타민 B 복합군도 함께 챙기세요.','비오틴은 수용성이므로 꾸준히 섭취가 필요합니다.','달걀,아보카도,강낭콩','비오틴은 비타민 B군에 속하는 수용성 비타민으로, 에너지 대사에 관여합니다.\n지방, 탄수화물, 단백질의 분해와 피부, 손톱, 머리카락 건강 유지에 도움을 줍니다.\n부족하면 피부염, 탈모, 피로감 등이 나타날 수 있습니다.\n\n');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (47,'비오틴',80,'비오틴 섭취가 많은 편입니다. 과용하지 않도록 주의하세요.','보충제는 용법에 맞게 복용하세요.','비오틴보충제,간,계란','비오틴은 비타민 B군에 속하는 수용성 비타민으로, 에너지 대사에 관여합니다.\n지방, 탄수화물, 단백질의 분해와 피부, 손톱, 머리카락 건강 유지에 도움을 줍니다.\n부족하면 피부염, 탈모, 피로감 등이 나타날 수 있습니다.\n\n');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (48,'비오틴',100,'비오틴 과잉은 드물지만, 혈액검사에 영향을 줄 수 있습니다.','과도한 보충은 피하고 식이 위주로 유지하세요.','달걀,견과류,채소류','비오틴은 비타민 B군에 속하는 수용성 비타민으로, 에너지 대사에 관여합니다.\n지방, 탄수화물, 단백질의 분해와 피부, 손톱, 머리카락 건강 유지에 도움을 줍니다.\n부족하면 피부염, 탈모, 피로감 등이 나타날 수 있습니다.\n\n');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (49,'아연',0,'아연이 심각하게 부족합니다. 면역력 저하나 상처 회복 지연이 나타날 수 있습니다.','굴이나 소고기 등 아연이 풍부한 식품을 섭취하세요.','굴,쇠고기,해바라기씨','아연은 면역 기능을 유지하고 상처 치유, 세포 분열 등에 관여하는 필수 미네랄입니다.\n성장기 아동의 발달, 미각과 후각 기능 유지에도 중요합니다.\n부족하면 감염에 취약해지고, 상처 회복이 느려질 수 있습니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (50,'아연',20,'아연 보충이 필요합니다. 육류나 해조류도 좋은 공급원입니다.','주 2회 이상 고기 반찬을 포함해보세요.','소고기,김,계란','아연은 면역 기능을 유지하고 상처 치유, 세포 분열 등에 관여하는 필수 미네랄입니다.\n성장기 아동의 발달, 미각과 후각 기능 유지에도 중요합니다.\n부족하면 감염에 취약해지고, 상처 회복이 느려질 수 있습니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (51,'아연',40,'아연 섭취가 보통입니다. 식물성과 동물성을 균형 있게 유지하세요.','견과류와 해조류를 함께 섭취해보세요.','호박씨,김,닭고기','아연은 면역 기능을 유지하고 상처 치유, 세포 분열 등에 관여하는 필수 미네랄입니다.\n성장기 아동의 발달, 미각과 후각 기능 유지에도 중요합니다.\n부족하면 감염에 취약해지고, 상처 회복이 느려질 수 있습니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (52,'아연',60,'아연 상태가 양호합니다. 다양한 식품을 통해 꾸준히 유지하세요.','철분, 아연 흡수를 방해하지 않도록 식사 간격에 유의하세요.','현미,달걀,콩','아연은 면역 기능을 유지하고 상처 치유, 세포 분열 등에 관여하는 필수 미네랄입니다.\n성장기 아동의 발달, 미각과 후각 기능 유지에도 중요합니다.\n부족하면 감염에 취약해지고, 상처 회복이 느려질 수 있습니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (53,'아연',80,'아연 섭취가 많은 편입니다. 장기 복용 시 구리 결핍에 주의하세요.','아연 보충제 사용 시 전문가 상담을 권장합니다.','보충제,육류,해산물','아연은 면역 기능을 유지하고 상처 치유, 세포 분열 등에 관여하는 필수 미네랄입니다.\n성장기 아동의 발달, 미각과 후각 기능 유지에도 중요합니다.\n부족하면 감염에 취약해지고, 상처 회복이 느려질 수 있습니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (54,'아연',100,'아연 과다 복용은 메스꺼움이나 설사를 유발할 수 있습니다.','식이 위주로 유지하고, 보충제 사용은 일시 중단하세요.','계란,두부,호두','아연은 면역 기능을 유지하고 상처 치유, 세포 분열 등에 관여하는 필수 미네랄입니다.\n성장기 아동의 발달, 미각과 후각 기능 유지에도 중요합니다.\n부족하면 감염에 취약해지고, 상처 회복이 느려질 수 있습니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (55,'아르기닌',0,'아르기닌이 매우 부족한 상태입니다. 성장 및 회복에 어려움을 줄 수 있습니다.','닭가슴살이나 견과류를 추가해보세요.','닭가슴살,호두,아몬드','아르기닌은 반필수 아미노산으로, 성장, 혈류 개선, 면역 기능 강화에 관여합니다.\n체내에서 산화질소(NO)를 생성해 혈관 확장과 혈압 조절을 돕습니다.\n운동 능력 향상, 상처 회복, 남성 건강 관련 보충제로도 활용됩니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (56,'아르기닌',20,'아르기닌 보충이 필요합니다. 콩류나 육류를 섭취해보세요.','두유나 삶은 달걀을 식단에 포함해보세요.','두유,계란,렌틸콩','아르기닌은 반필수 아미노산으로, 성장, 혈류 개선, 면역 기능 강화에 관여합니다.\n체내에서 산화질소(NO)를 생성해 혈관 확장과 혈압 조절을 돕습니다.\n운동 능력 향상, 상처 회복, 남성 건강 관련 보충제로도 활용됩니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (57,'아르기닌',40,'아르기닌 섭취가 보통입니다. 꾸준한 유지가 필요합니다.','운동 후 단백질 식품과 함께 섭취해보세요.','계란,소고기,호박씨','아르기닌은 반필수 아미노산으로, 성장, 혈류 개선, 면역 기능 강화에 관여합니다.\n체내에서 산화질소(NO)를 생성해 혈관 확장과 혈압 조절을 돕습니다.\n운동 능력 향상, 상처 회복, 남성 건강 관련 보충제로도 활용됩니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (58,'아르기닌',60,'아르기닌 상태가 양호합니다. 다양한 식품에서 균형 있게 섭취하세요.','하루 1끼는 단백질 중심 식사로 구성해보세요.','닭가슴살,콩,아보카도','아르기닌은 반필수 아미노산으로, 성장, 혈류 개선, 면역 기능 강화에 관여합니다.\n체내에서 산화질소(NO)를 생성해 혈관 확장과 혈압 조절을 돕습니다.\n운동 능력 향상, 상처 회복, 남성 건강 관련 보충제로도 활용됩니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (59,'아르기닌',80,'아르기닌 섭취가 많은 편입니다. 보충제 사용량을 확인해보세요.','보충제 복용 시 하루 권장량을 초과하지 않도록 주의하세요.','보충제,육류,견과류','아르기닌은 반필수 아미노산으로, 성장, 혈류 개선, 면역 기능 강화에 관여합니다.\n체내에서 산화질소(NO)를 생성해 혈관 확장과 혈압 조절을 돕습니다.\n운동 능력 향상, 상처 회복, 남성 건강 관련 보충제로도 활용됩니다.');
INSERT INTO `nutrient_result_desc` (`id`,`nutrient_name`,`range_start`,`description`,`tip`,`foods`,`info`) VALUES (60,'아르기닌',100,'아르기닌 과잉은 복부 불편감이나 저혈압을 유발할 수 있습니다.','자연 식품 위주 섭취로 전환하고 보충은 제한하세요.','두유,호박씨,두부','아르기닌은 반필수 아미노산으로, 성장, 혈류 개선, 면역 기능 강화에 관여합니다.\n체내에서 산화질소(NO)를 생성해 혈관 확장과 혈압 조절을 돕습니다.\n운동 능력 향상, 상처 회복, 남성 건강 관련 보충제로도 활용됩니다.');



CREATE TABLE `health_tip` (
  `id` INT PRIMARY KEY,
  `category` VARCHAR(50),
  `description` TEXT,
  `icon` VARCHAR(50),
  `title` VARCHAR(100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `health_tip` WRITE;
/*!40000 ALTER TABLE `health_tip` DISABLE KEYS */;

INSERT INTO `health_tip` (`id`, `category`, `description`, `icon`, `title`) VALUES
(1,'nutrient-info','닭가슴살, 두부, 콩류 등으로 단백질을 보충하세요.','check_circle','단백질은 근육 생성에 중요합니다'),
(2,'nutrient-info','우유, 멸치, 브로콜리에 풍부하게 들어 있습니다.','check_circle','칼슘은 뼈 건강을 지키는 필수 영양소입니다'),
(3,'nutrient-info','감귤류, 피망, 키위 등을 꾸준히 섭취하세요.','check_circle','비타민 C는 면역력 강화에 도움을 줍니다'),
(4,'nutrient-info','간, 시금치, 건포도에 철분이 풍부합니다.','check_circle','철분은 혈액 생성을 도와줍니다'),
(5,'nutrient-info','현미, 채소, 과일을 충분히 섭취하세요.','check_circle','식이섬유는 장 건강을 유지시켜줍니다'),
(6,'nutrient-info','하루 15분 정도 햇볕을 쬐는 것이 좋습니다.','check_circle','비타민 D는 햇빛을 통해 합성됩니다'),
(7,'nutrient-info','견과류와 통곡물에 많이 함유되어 있습니다.','check_circle','마그네슘은 근육 이완에 기여합니다'),
(8,'nutrient-info','등푸른 생선과 견과류를 섭취하세요.','check_circle','오메가-3는 혈관 건강에 좋습니다'),
(9,'nutrient-info','굴, 쇠고기, 해바라기씨에 풍부합니다.','check_circle','아연은 면역 기능 유지에 필수입니다'),
(10,'nutrient-info','달걀노른자, 아보카도에 함유되어 있습니다.','check_circle','비오틴은 모발과 피부 건강을 돕습니다'),
(11,'today-tip','충분한 수분 섭취는 신진대사와 피로 회복에 도움이 됩니다.','error','하루 2리터 이상의 물을 마셔보세요'),
(12,'today-tip','공복으로 시작하면 혈당이 불안정해지고 집중력이 떨어질 수 있습니다.','error','아침 식사는 꼭 챙기세요'),
(13,'today-tip','꾸준한 유산소 운동은 심폐 기능을 향상시킵니다.','error','30분 정도 가볍게 걷는 습관을 들이세요'),
(14,'today-tip','블루라이트는 수면의 질을 낮출 수 있습니다.','error','자기 전 스마트폰 사용을 줄여보세요'),
(15,'today-tip','오랜 시간 앉아 있으면 혈액순환에 악영향을 줍니다.','error','앉은 자세에서 틈틈이 스트레칭하세요'),
(16,'today-tip','과도한 육류 섭취를 줄이고, 영양 균형을 맞출 수 있습니다.','error','하루 한 끼는 채식 위주로 구성해보세요'),
(17,'today-tip','혈당 스파이크를 방지하고 소화에 좋습니다.','error','과일은 공복보다는 식후에 섭취하세요'),
(18,'today-tip','20분마다 20초간 20피트 먼 곳을 바라보는 습관을 들이세요.','error','눈 휴식을 위해 20-20-20 법칙을 활용하세요'),
(19,'today-tip','스트레스 완화와 집중력 향상에 도움이 됩니다.','error','하루 10분 명상을 시도해보세요'),
(20,'today-tip','수면 유도와 혈액순환에 도움을 줍니다.','error','잠들기 전 따뜻한 물 한 잔 마시기');

/*!40000 ALTER TABLE `health_tip` ENABLE KEYS */;
UNLOCK TABLES;
-- 마무리
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO announcement (category, content, created_date, title) VALUES
('공지사항', '첫 구매 시 10% 할인 쿠폰을 드립니다!', NOW(), '신규 회원 첫 구매 이벤트 안내'),
('공지사항', '냉장 제품은 폭염으로 인해 배송이 1~2일 지연될 수 있습니다.', NOW(), '냉장 식품 배송 지연 안내'),
('공지사항', '6월 20일 오전 2시부터 4시까지 서비스 점검이 있습니다.', NOW(), '정기 점검 안내'),
('공지사항', '신선한 여름 채소와 과일이 새로 입고되었습니다.', NOW(), '여름 제철 식재료 입고 안내');

