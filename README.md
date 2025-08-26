## 프로젝트 실행 방법

```shell
$ npm install # 프로젝트 관련 모듈 설치
$ npm run dev # 개발자 모드로 실행 (HTTP 서버는 포트 3001에서 실행됩니다)
```

로컬에서 HTTPS로 개발 서버를 띄우려면 아래 가이드를 참고하세요. 이 레포는 HTTPS 프록시를 사용해 `https://localhost:3000`으로 접근하도록 설정되어 있습니다.

주의: 인증서 파일(`localhost.pem`, `localhost-key.pem`)은 프로젝트 루트에 생성되며, 커밋하지 않도록 `.gitignore`에 추가되어 있습니다.

### macOS (권장 방법: mkcert + local-ssl-proxy)

1. mkcert 설치 및 로컬 CA 신뢰 (한 번만 수행)

```bash
brew install mkcert
brew install nss        # Firefox 사용 시 필요
mkcert -install
```

2. 프로젝트 루트에서 로컬 인증서 생성

```bash
cd /Users/nahyeon/goinfre/senifit-front
mkcert -cert-file localhost.pem -key-file localhost-key.pem localhost 127.0.0.1 ::1
```

3. 의존성 설치(이미 실행하셨다면 건너뛰세요)

```bash
npm install
```

4. 개발 서버와 HTTPS 프록시 실행

터미널 A (Next 개발 서버 — HTTP, 포트 3001):

```bash
npm run dev
```

터미널 B (HTTPS 프록시 — 포트 3000에서 HTTPS로 제공):

```bash
npm run dev:https
```

브라우저에서 https://localhost:3000 으로 접속하세요.

### Windows PowerShell (mkcert + local-ssl-proxy)

1. PowerShell을 관리자 권한으로 실행한 후 mkcert 설치

추천 (Chocolatey 사용 시):

```powershell
choco install mkcert -y
mkcert -install
```

대체 (Scoop 사용 시):

```powershell
scoop install mkcert
mkcert -install
```

2. 프로젝트 루트에서 인증서 생성 (PowerShell)

```powershell
cd C:\path\to\senifit-front
mkcert -cert-file localhost.pem -key-file localhost-key.pem localhost 127.0.0.1 ::1
```

3. 의존성 설치

```powershell
npm install
```

4. 개발 서버와 HTTPS 프록시 실행

PowerShell 창 1:

```powershell
npm run dev
```

PowerShell 창 2:

```powershell
npm run dev:https
```

그런 다음 브라우저에서 https://localhost:3000 으로 접속합니다. Windows에서는 mkcert가 로컬 루트 CA를 시스템에 설치하므로 인증서 경고가 사라져야 합니다(관리자 권한 필요).

### 기타 참고
- 포트 충돌이 있으면 `package.json`의 포트 값을 조정하세요. 이 레포의 설정은 Next 개발 서버를 3001에서 실행하고, HTTPS 프록시는 3000에서 받아 3001로 포워딩합니다.
- 인증서 파일은 절대 레포지토리에 커밋하지 마세요. (`.gitignore`에 이미 추가되어 있음)

---

## 작업 규칙

### 작업 시작 순서
1. 지라에서 할당된 백로그를 확인하고, IN PROGRESS 상태로 변경한다.
2. 지라에서 브랜치를 레포에 생성한다. 브랜치 네이밍 규칙은 아래를 참고한다.
3. 기능명세서와 UI 디자인(혹은 와이어 프레임)을 기반으로 subtask나 설명을 추가한다.
4. 로컬에서 작업을 시작한다.

### 브랜치 네이밍 규칙
!!git-flow를 따르고 있습니다!!

| 브랜치| 역할| 생성 시점 | 병합 대상／삭제 시점 | 네이밍 예시 |
|---|---|---|---|---|
| **main**| 운영 환경에 배포된 코드를 항상 반영 | 최초 초기화| 삭제하지 않음| `main`|
| **develop** | 다음 배포를 위한 개발 통합 공간 | `main` 초기화 직후 | 배포 준비 완료 시 `main`·`develop` 병합 | `develop` |
| **feature-**| 개별 기능 개발| `develop` 브랜치에서 기능 시작 시 | 기능 완료 시 `develop`에 병합 | `feature-login-page`|
| **release-**| 배포 전 최종 점검·버전 태깅 및 준비| 배포 일정 직전 | 준비 완료 시 `main`·`develop` 병합 | `release-v1.2.0` |
| **hotfix-** | 운영 중인 버전의 치명적 버그 긴급 수정 | `main` 브랜치에서 버그 발견 시| 수정 완료 시 `main`·`develop` 병합 | `hotfix-critical-fix` |


### commit convention
커밋 컨벤션이 포함된 .gitmessage.txt 파일을 생성해두었습니다. 적용 방법은 아래를 참고해주세요.

| Type | Description|
| --- | --- |
| **Feat** | 새로운 기능 추가 |
| **Fix**| 버그 수정|
| **Docs** | 문서 수정|
| **Style**| 코드 formatting, 세미콜론 누락, 코드 자체의 변경이 없는 경우 |
| **Refactor** | 코드 리팩토링|
| **Test** | 테스트 코드, 리팩토링 테스트 코드 추가 |
| **Chore**| 패키지 매니저 수정, 그 외 기타 수정 (예: .gitignore) |
| **Design** | CSS 등 사용자 UI 디자인 변경 |
| **Comment**| 필요한 주석 추가 및 변경 |
| **Rename** | 파일 또는 폴더 명을 수정하거나 옮기는 작업만인 경우|
| **Remove** | 파일을 삭제하는 작업만 수행한 경우 |
| **!BREAKING CHANGE** | 커다란 API 변경의 경우 |
| **!HOTFIX**| 급하게 치명적인 버그를 고쳐야 하는 경우|

#### `.gitmessage.txt` 적용 법 (클론된 레포에만 적용)

```shell
$ git config commit.template .gitmessage.txt
```

이후 터미널에서 `git commit`하고 엔터 누르면 메시지가 뜹니다. 혹시 nano 에디터가 뜬다면 다음 명령어를 입력해주세요. 글로벌로 적용됩니다.

```shell
$ git config --global core.editor "code --wait" # vscode 사용 시 (강추)
$ git config --global core.editor "vim" # vim 사용 시
```

### pull request 규칙

1. 제목은 항시 `[작업 페이지] 작업 내용 한 줄 요약`으로 작성한다.
2. 본문은 템플릿을 따라 성실히 작성한다.
3. pr이 커지지 않도록 작업일이 2~3일을 넘어가면 pr을 꼭 올린다.

### 코드 리뷰 규칙
1. 코드를 꼼꼼히 읽고 궁금한 점이나 제안사항이 있다면 코멘드로 단다.
2. 문제가 없다면 Approve를 선택하여 submit한다.
3. 문제가 있다면 Request changes를 선택하여 submit한다.

### Storybook에 관하여

공용컴포넌트의 쉬운 관리를 위해 스토리북을 도입하였습니다. 다음의 명령어를 통해 `localhost:6006`로 확인할 수 있으니 참고부탁드리겠습니다.

```shell
$ npm run storybook
```
