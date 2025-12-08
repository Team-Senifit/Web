# 단 1분 만에 노인 운동 전문가처럼, 시니핏

<center>
<img src="https://senifit.co.kr/_next/static/media/senifit-logo.978bf302.svg" height="48px"  />
<a href="https://myhits.vercel.app"><img src="https://myhits.vercel.app/api/hit/https%3A%2F%2Fgithub.com%2FTeam-Senifit%2FWeb?color=green&label=hits&size=medium" alt="hits" /></a>
</center>

---

## 개요

> (주) 튼튼한거북이 기획<br />
> 개발 기간 25.7 ~

### 배포 링크

[https://senifit.co.kr/](https://senifit.co.kr/)

### 프론트엔드 팀

|                                             프로필                                             |                  이름                  | 역할 | 담당                                      |
| :--------------------------------------------------------------------------------------------: | :------------------------------------: | :--: | ----------------------------------------- |
| <img src="https://avatars.githubusercontent.com/u/177602235?v=4" width="48px" height="48px" /> | [김현수](https://github.com/HYUN-SIUU) | 팀원 | 로그인 페이지, 기록 탭 개발               |
| <img src="https://avatars.githubusercontent.com/u/91731260?v=4" width="48px" height="48px" />  | [나현](https://github.com/SaltySalt77) | 팀원 | 디자인 시스템, 운동 탭, 우리 센터 탭 개발 |

## 프로젝트 소개

### 배경 및 필요성

대한민국은 이미 초고령화 사회에 진입했습니다. 노인 인구가 증가함에 따라 노인 복지 시설, 요양원 등 관련 기관의 수요가 늘어나고 있으며, 동시에 부모님을 케어해야 하는 가족들의 부담도 커지고 있습니다.
노인의 건강한 삶을 위해 가장 중요한 요소 중 하나는 바로 운동입니다. 그러나 현재 노인복지시설에서는 ▲전문 강사 수급의 어려움 ▲예산 부족 문제로 인해 체계적이고 지속적인 운동 프로그램을 운영하기 어렵습니다. 특히 지방으로 갈수록 이러한 문제는 더욱 심각해지고 있습니다.
따라서 전문적이면서도 경제적인 노인 맞춤형 운동 프로그램의 필요성이 대두되고 있습니다.

---

### 프로젝트 개요

시니핏은 이러한 문제를 해결하기 위해 탄생한 맞춤형 노인 운동 콘텐츠 플랫폼입니다.

- 다양한 운동 형태와 흥미 유도형 콘텐츠 제공
- 신체 건강뿐 아니라 인지 자극 운동까지 포함
- 맞춤형 알고리즘 기반 운동 추천 및 기록 관리

시니핏은 단순한 운동 서비스가 아니라, 데이터 기반으로 점점 더 개인화되는 노인 운동 프로그램을 제공함으로써 시설과 보호자의 부담을 줄이고, 어르신들의 삶의 질을 높이고자 합니다.

---

### 주요 기능

1. 맞춤형 운동 프로그램 제공
   진행 시간, 인지 운동 여부, 주요 운동 부위, 노래체조 포함 여부 등을 선택하면 이에 맞는 운동 프로그램을 자동 생성합니다.
   조건에 따라 최적화된 영상이 재생되어 어르신들이 즐겁고 안전하게 운동할 수 있습니다.
   인기 루틴, 부위별 루틴 등 다양한 카테고리 제공으로 선택의 폭을 넓힙니다.

2. 운동 기록 관리

   루틴 완료 후 ▲운동 참여 태도 ▲운동 수행 능력 ▲운동 중 불편 사항 등을 기록할 수 있습니다.
   개별 어르신별 기록 기능을 통해 개인별 맞춤 데이터가 축적됩니다.
   축적된 데이터는 이후 운동 추천 및 관리에 반영되어 점차 정교해지는 프로그램을 제공합니다.

### 프로젝트 목표

시니핏은 복지사와 보호자들의 부담을 덜고, 언제 어디서든 어르신과 함께할 수 있는 운동 솔루션을 제공하는 것을 목표로 합니다.

이를 통해 전국의 모든 어르신이 시니핏과 함께

1. 운동의 즐거움
2. 신체 능력 향상
3. 인지 능력 개선

을 경험하며, 더 건강하고 활기찬 노년을 누릴 수 있도록 하는 것이 시니핏의 비전입니다.

### 시작 가이드

#### 요구 사항

웹 앱 빌드를 위해서는 다음을 필요로 합니다.

- Node.js >= 22.0.0
- Npm >= 10.6.0

#### 설치 및 실행 방법

프론트엔드 실행을 위해서는 자가서명 인증서를 발급해둔 게 있어야합니다.

```shell
$ git clone git@github.com:Team-Senifit/Web.git Senifit_FE
$ cd Senifit_FE
$ npm install
$ npm run dev:https
```

#### 빌드 방법

```shell
$ npm run build
```

### 기술 스택

#### 환경

<div>
<img display=inline-block src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<img display=inline-block src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
</div>

#### 프론트엔드

<div>
<img display=inline-block src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
<img display=inline-block src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
<img display=inline-block src="https://img.shields.io/badge/typescript-2D79C7?style=for-the-badge&logo=typescript&logoColor=white"> 
<img display=inline-block src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img display=inline-block src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white"> 
<img display=inline-block src="https://img.shields.io/badge/mui-007FFF?style=for-the-badge&logo=mui&logoColor=white"> 
<img display=inline-block src="https://img.shields.io/badge/storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white"> 
</div>

#### 소통

<div>
<img display=inline-block src="https://img.shields.io/badge/notion-F6F5F4?style=for-the-badge&logo=notion&logoColor=black">
<img display=inline-block src="https://img.shields.io/badge/discord-5462EB?style=for-the-badge&logo=discord&logoColor=white">

</div>

## 기여 가이드

docs/CONTRIBUTORS.md에 간단한 프로젝트 정책 개요를, docs/DEVELOPER.md에 자가서명인증서 발급 방법 등을 정리해두었습니다. 확인 후 작업 부탁드립니다.
