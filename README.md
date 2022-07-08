# Team-C payhere
`프로젝트 진행 기간 2022.07.04 ~ 2022.07.08`

# 환경
![node](https://img.shields.io/badge/nodejs-v16.15.1-339933?style=plastic&logo=Node.js&logoColor=white)
![npm](https://img.shields.io/badge/npm-v8.13.1-7986cb?&style=plastic&logo=npm&logoColor=white)
![mysql](https://img.shields.io/badge/MySQL-v5.7-00758f?&style=plastic&logo=mysql&logoColor=white)
![docker](https://img.shields.io/badge/docker-v20.10.17-2596ed?&style=plastic&logo=docker&logoColor=white)

# 서비스 개요
본인의 소비내역을 기록/관리할 수 있는 서비스

# 요구사항 분석
* 고객은 이메일과 비밀번호 입력을 통해서 회원 가입할 수 있다
* 고객은 로그인과 로그아웃을 할 수 있다
* 로그인 상태가 아니면 가계부 내역에 대한 접근 제한 처리가 되어야 한다
* 고객은 로그인 이후 가계부 관련 아래의 행동을 할 수 있다
  * 가계부에 오늘 사용한 돈의 금액과 관련된 메모를 남길 수 있다
  * 가계부에서 수정을 원하는 내역은 금액과 메모를 수정할 수 있다
  * 가계부에서 삭제를 원하는 내역은 삭제할 수 있다
  * 삭제한 내역은 언제든지 다시 복구할 수 있다
  * 가계부에 기록한 가계부 리스트를 볼 수 있다
  * 가계부에서 상세한 세부 내역을 볼 수 있다

# API Documentation
https://documenter.getpostman.com/view/21440012/UzJMrFXk

# DB Modeling
<img width="1140" alt="ERD" src="https://user-images.githubusercontent.com/79984416/177918370-dd930910-ace8-484d-81bc-3b6deedd6b41.png">

# 프로젝트 담당 역할
### 김지유
* - [x] Api Documentation
* - [x] Docker
* - [x] DB 모델링
* - [x] 타입 검증 미들웨어
* - [x] 가계부 CRUD
  * - [x] 가계부 등록
  * - [x] 가계부 수정
  * - [x] 가계부 삭제
  * - [x] 가계부 조회
  * - [x] 가계부 상세 조회
  
### 김영우
* - [x] README.md 작성
* - [x] 접근 제한 처리
* - [x] 토큰 인증 제어
* - [x] 프로젝트 초기화, lint, formatting
* - [x] 사용자 API
  * - [x] 회원가입
  * - [x] 로그인

### 공통
* - [x] 테스트 케이스(일부만 구현)

# 구현 과정
* 사용자 API
  * 회원가입 - 요청한 이메일로 이메일 조회 후 없으면 비밀번호 hash 후 DB 등록
  * 로그인 - 요청한 이메일로 이메일 조회 후 hash된 비밀번호와 요청 비밀번호 비교, 일치하면 토큰 발급 및 전달
  * 로그아웃 - 따로 구현하지 않고 클라이언트에서 처리하는걸로 결정
* 토큰 발급, 검증 및 접근 제한
  * 접근 제한 - 가계부 API 요청 전 토큰 검증하는 미들웨어에서 확인하고 가계부 처리 / 토큰 이상 시 에러
  * 발금, 검증 - jsonwebtoken 라이브러리 사용하여 발급 및 검증 구현
  * 재발급 - access 토큰 만료 시 재요청, refresh 검증 및 DB 토큰과 비교, 일치하면 토큰 발급 및 전달

# 구동 방법
### 환경변수 설정
.env 파일에 아래의 값 필요
```
SALT_ROUNDS=SALT 값(10 이상)
JWT_ALGORITHM=해쉬 알고리즘 값(ex. HS512, RS512)
JWT_ACCESS_SECRET_KEY=access token base64 encoded 개인 키 값
JWT_REFRESH_SECRET_KEY=refresh token base64 encoded 개인 키 값
JWT_ACCESS_EXPIRESIN=access token 만료 시간(ex. 30m(30분))
JWT_REFRESH_EXPIRESIN=refresh token 만료 시간(ex. 14d(14일))
MYSQL_ROOT_PASSWORD=team-c/payhere
MYSQL_USER=team-c
MYSQL_PASSWORD=team-c/payhere
MYSQL_DATABASE=nodejs_prod
MYSQL_HOSTNAME=mysql
MYSQL_PORT=3306
```
### 설치하기
```
$ git clone https://github.com/pre-onboarding-team-c/02-C-Payhere.git
$ cd 02-C-Payhere
$ npm install
```
### 실행하기
```
$ npm run start:prod
```
### Docker 실행하기
```
$ (sudo) docker-compose build
$ (sudo) docker-compose up -d
```
### Docker 종료하기
```
$ (sudo) docker-compose down
```
### 테스트 실행하기
```
$ npm test
```
