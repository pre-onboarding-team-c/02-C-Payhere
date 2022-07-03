# Team-C payhere
`프로젝트 진행 기간 2022.07.04 ~ 2022.07.08`

# 환경
![node](https://img.shields.io/badge/nodejs-v16.15.1-339933?style=plastic&logo=Node.js&logoColor=white)
![npm](https://img.shields.io/badge/npm-v8.13.1-7986cb?&style=plastic&logo=npm&logoColor=white)
![mysql](https://img.shields.io/badge/MySQL-v5.7-00758f?&style=plastic&logo=mysql&logoColor=white)
![docker](https://img.shields.io/badge/docker-v5.7-2596ed?&style=plastic&logo=docker&logoColor=white)

# 구동 방법
### 환경변수 설정
.env 파일에 SECRET_KEY(base64 encoded)값 필요
```
SECRET_KEY=secret base64 encoded
```
### 설치하기
```
$ npm install
```
### 실행하기
```
$ npm start
```
### REST API 요청
```
$ curl http://localhost:8081/api/?
```
### 테스트 실행하기
```
$ npm test
```

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
API 링크

# 프로젝트 담당 역할
### 김지유
* - [ ] DB 모델링
* - [ ] 가계부 CRUD
  * - [ ] 가계부 등록
  * - [ ] 가계부 수정
  * - [ ] 가계부 삭제
  * - [ ] 가계부 조회
  * - [ ] 가계부 상세 조회
  
### 김영우
* - [ ] README.md 작성
* - [ ] 접근 제한 처리
* - [ ] 토큰 인증 제어

### 황시우
* - [ ] 프로젝트 초기화, lint, formatting
* - [ ] 회원가입
* - [ ] 로그인
* - [ ] 로그아웃

### 공통
* - [ ] Docker 서버 실행
* - [ ] 테스트 케이스
