## 프로젝트 실행 방법

```shell
$ npm install # 프로젝트 관련 모듈 설치
$ npm run dev # 개발자 모드로 실행 이후 http://localhost:3000으로 접근 가능
```

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
