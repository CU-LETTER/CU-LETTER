# CU;LETTER

<img src="README.assets/Logo.png" alt="Logo" width="500" />

&nbsp;

**See U Later**

> 다시 만날 날을 기대하며 인사한다는 의미를 담아 프로젝트 이름을 CU;LETTER로 정하였습니다.
> 
> CU;LETTER는 사용자가 작성한 편지 내용에 어울리는 편지지와 음악을 추천해주고 상대에게 편지를 전송하는 기능을 제공합니다. 편지를 쓰기 위해서는 정성을 들여 편지의 내용을 작성하는 것 뿐만 아니라 예쁜 편지지를 고르고 우표를 붙이고 이를 우체국에 전달하기 위한 과정 또한 포함됩니다. 마음을 담는 과정을 제외한 나머지 과정을 최소한으로 줄이고 소중한 편지를 반영구적으로 저장하기 위해 디지털 매체를 통한 편지 전달 서비스를 기획했습니다.

------

## 👪 팀원 & 역할

   - 김도현 : 팀장, Back-end
   - 강민수 : Front-end
   - 김경협 : Back-end
   - 김은송 : Front-end
   - 김정연 : Front-end
   - 정유환 : Back-end

## 🔨 기술 스택

- **이슈 관리**
  - Jira
- **형상 관리**
  - Gitlab
- **와이어 프레임**
  - Figma
- **ERD**
  - MySQL
- **커뮤니케이션**
  - Mattermost
  - Notion
  - Google 스프레드시트
  - Google 프레젠테이션
- **IDE**
  - Visual Studio Code
  - IntelliJ IDEA Community
- **Front-end**
  - React
  - React Hooks
  - Next.js
  - Material-UI
- **Back-end**
  - Spring Boot
  - Spring Security
  - Spring Data JPA
  - QueryDSL
- **AI**
  - PyTorch
- **Database**
  - MySQL
- **Server**
  - AWS EC2
- **DevOps**
  - Jenkins
  - Docker

## 📒 프로젝트 기획

### [Notion](https://caramel-garden-eaf.notion.site/PJT-409d7b93bd074da9b318141c793ca097)

<img src="README.assets/Notion.png" alt="Notion" width="500" />

### [기능명세서](https://docs.google.com/spreadsheets/d/1M-Tj_9stk1RYr7TkYBQLlRbTxCMwEtcMLWN7hLk0FFw/edit#gid=0)

<img src="README.assets/Functional_Specification.png" alt="Functional_Specification" width="500" />

### [와이어 프레임](https://www.figma.com/file/d6ihfp4yZV1Oy2B0XqMMcW/%ED%8A%B9%ED%99%94%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%3A-A201?node-id=0%3A1)

<img src="README.assets/Wireframe.png" alt="Wireframe" width="500" />

### [ERD](README.assets/ERD.PNG)

<img src="README.assets/ERD.PNG" alt="ERD" width="500" />

### [API 명세서](https://docs.google.com/spreadsheets/d/1PFSrwoFqF-2cbXGW0iAQ9UX8ulqPsUkS6NJEa9XhySA/edit#gid=0)

<img src="README.assets/API_Docs.png" alt="API_Docs" width="500" />

### [개발 환경 세팅](https://caramel-garden-eaf.notion.site/Infra-ef70bdd4fb3b4d048aab6faa930f9cf8)

<img src="README.assets/Dev_Env.PNG" alt="Eev_Env" width="500" />

## 🎞 프로젝트 진행상황

### Web - 모바일 뷰 (https://www.culetter.site)

#### Front-end

- 로그인

  ![로그인](/uploads/5ec7669ca961b24254da76b268a98f8b/로그인.gif)

- 회원가입  
  > 이메일, 비밀번호, 이름 입력하여 회원가입

  ![회원가입](/uploads/e9b20af2b1a588976dab7e233129afdf/회원가입.gif)

- 랜딩 페이지
  > 로그인 성공 시 랜딩 페이지로 전환

  ![랜딩](/uploads/009252ea878a8730738426cd8e490c66/랜딩.gif)

- 메인페이지
  > 편지쓰기, 받은편지, 보낸편지, 작성중인 편지 확인 

  ![메인페이지](/uploads/0a4c74f36f4a7e053adb512992d819c8/메인페이지.gif)

- 수신인 선택 가능
  > 큐레터 친구 또는 비회원 중 선택가능  

  ![수신인](/uploads/8faa0671994e464a951cd766a8bd987f/수신인.gif)


- 편지 형식 선택
  > 포토카드, 편지, 엽서 중 형식 선택

  ![형식선택](/uploads/ea446cdd86504c3067d8670dc52bd436/형식선택.gif)

- 편지 쓰기
  > 편지의 제목과 내용을 입력  

  ![작성](/uploads/e8b2ea1aba2c3bcd20b7110e864c605d/작성.gif)

- 노래 추천
  > 편지의 내용과 어울리는 노래 추천

  ![노래추천](/uploads/a7f4d52141063df0227803cfef066099/노래추천.gif)

- 받은 편지함
  > 받은 편지 확인 

  ![받은편지함](/uploads/b0598491fbde70b90f156910609b4685/받은펹지함.gif)

- 보낸 편지함
  > 보낸 편지 확인

  ![보낸편지함](/uploads/e236927c8c3fb3919178a8a4a6c83f58/보낸편지함.gif)

- 친구목록
  > 친구로 등록해놓은 사용자, 친구 요청, 즐겨찾기로 등록한 친구를 확인

  ![친구](/uploads/d7cef8492784173d4396bc3aa51fdb5a/친구.gif)

#### Back-end
> [API 명세서](https://docs.google.com/spreadsheets/d/1PFSrwoFqF-2cbXGW0iAQ9UX8ulqPsUkS6NJEa9XhySA/edit#gid=0)
- 회원 관리 API 구현
- 친구 관리 API 구현
- 편지 관리 API 구현 (진행 중)

------

### AI
> [자연어 처리-감정 분석 모델 정리](https://caramel-garden-eaf.notion.site/83b84e4471a2481492976fdd87dc0cb4)







