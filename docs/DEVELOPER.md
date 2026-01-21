## 프로젝트 실행 방법

```shell
$ npm install # 프로젝트 관련 모듈 설치
$ npm run dev:https # 이는 초기 설정을 필요로 합니다. 아래의 가이드를 보고 초기 설정을 진행해주세요.
```

## 작업 규칙

### 작업 시작 순서

1. 지라에서 할당된 백로그를 확인하고, IN PROGRESS 상태로 변경한다.
2. 지라에서 브랜치를 레포에 생성한다. 브랜치 네이밍 규칙은 아래를 참고한다.
3. 기능명세서와 UI 디자인(혹은 와이어 프레임)을 기반으로 subtask나 설명을 추가한다.
4. 로컬에서 작업을 시작한다.

### 브랜치 네이밍 규칙

!!git-flow를 따르고 있습니다!!

| 브랜치       | 역할                                   | 생성 시점                         | 병합 대상／삭제 시점                    | 네이밍 예시           |
| ------------ | -------------------------------------- | --------------------------------- | --------------------------------------- | --------------------- |
| **main**     | 운영 환경에 배포된 코드를 항상 반영    | 최초 초기화                       | 삭제하지 않음                           | `main`                |
| **develop**  | 다음 배포를 위한 개발 통합 공간        | `main` 초기화 직후                | 배포 준비 완료 시 `main`·`develop` 병합 | `develop`             |
| **feature-** | 개별 기능 개발                         | `develop` 브랜치에서 기능 시작 시 | 기능 완료 시 `develop`에 병합           | `feature-login-page`  |
| **release-** | 배포 전 최종 점검·버전 태깅 및 준비    | 배포 일정 직전                    | 준비 완료 시 `main`·`develop` 병합      | `release-v1.2.0`      |
| **hotfix-**  | 운영 중인 버전의 치명적 버그 긴급 수정 | `main` 브랜치에서 버그 발견 시    | 수정 완료 시 `main`·`develop` 병합      | `hotfix-critical-fix` |

### commit convention

커밋 컨벤션이 포함된 .gitmessage.txt 파일을 생성해두었습니다. 적용 방법은 아래를 참고해주세요.

| Type                 | Description                                                  |
| -------------------- | ------------------------------------------------------------ |
| **Feat**             | 새로운 기능 추가                                             |
| **Fix**              | 버그 수정                                                    |
| **Docs**             | 문서 수정                                                    |
| **Style**            | 코드 formatting, 세미콜론 누락, 코드 자체의 변경이 없는 경우 |
| **Refactor**         | 코드 리팩토링                                                |
| **Test**             | 테스트 코드, 리팩토링 테스트 코드 추가                       |
| **Chore**            | 패키지 매니저 수정, 그 외 기타 수정 (예: .gitignore)         |
| **Design**           | CSS 등 사용자 UI 디자인 변경                                 |
| **Comment**          | 필요한 주석 추가 및 변경                                     |
| **Rename**           | 파일 또는 폴더 명을 수정하거나 옮기는 작업만인 경우          |
| **Remove**           | 파일을 삭제하는 작업만 수행한 경우                           |
| **!BREAKING CHANGE** | 커다란 API 변경의 경우                                       |
| **!HOTFIX**          | 급하게 치명적인 버그를 고쳐야 하는 경우                      |

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

---

## 🔐 로컬 HTTPS 개발 가이드 (macOS & Windows)

프론트는 **https://localhost:3000** 으로 접속하고, 내부적으로는 프록시가 Next(dev:3001)와 백엔드(`NEXT_PUBLIC_API_URL`)로 라우팅됩니다.  
프로젝트에는 `scripts/dev-proxy.mjs`가 포함되어 있으며, 아래 절차로 자가서명 인증서를 만들고 서버를 실행하세요.

### 0) 사전 준비

- Node.js 18+ (권장 20+)
- 개발 의존성 설치(없다면)
  ```bash
  npm i -D concurrently http-proxy dotenv
  ```
- `.env` 설정 (필수)

  ```dotenv
  # 백엔드 엔드포인트(베이스 경로 포함 가능). 예: https://api.example.com/api
  NEXT_PUBLIC_API_URL=https://dev.api.example.com/api

  # 선택: 프론트에서 사용할 프록시 프리픽스(기본 /api)
  # API_PREFIX=/api
  ```

> 프런트에서 API는 반드시 **/api/** 경로로 호출하세요. 예) `fetch('/api/users')`

---

### 1) macOS: 자가서명 인증서 발급

#### ✅ 방법 A: mkcert (가장 간단, 신뢰 자동)

```bash
brew install mkcert nss        # nss는 Firefox 신뢰에 필요(선택)
mkcert -install                # 로컬 루트 CA 설치(한 번만)
mkdir -p certs
mkcert -key-file certs/localhost-key.pem -cert-file certs/localhost.pem localhost 127.0.0.1 ::1
```

- 생성 파일: `certs/localhost-key.pem`, `certs/localhost.pem`

#### 🔁 방법 B: OpenSSL (대안)

> 경고 배너가 뜰 수 있음. Keychain에서 해당 인증서를 "항상 신뢰"로 바꾸면 해결됩니다.

```bash
brew install openssl
mkdir -p certs
openssl req -x509 -nodes -days 825 -newkey rsa:2048   -keyout certs/localhost-key.pem -out certs/localhost.pem   -subj "/CN=localhost"   -addext "subjectAltName=DNS:localhost,IP:127.0.0.1,IP:::1"
```

---

### 2) Windows: 자가서명 인증서 발급

#### ✅ 방법 A: mkcert (권장)

- Chocolatey
  ```powershell
  choco install mkcert -y
  mkcert -install
  mkdir certs
  mkcert -key-file certs/localhost-key.pem -cert-file certs/localhost.pem localhost 127.0.0.1 ::1
  ```
- Scoop
  ```powershell
  scoop install mkcert
  mkcert -install
  mkdir certs
  mkcert -key-file certs/localhost-key.pem -cert-file certs/localhost.pem localhost 127.0.0.1 ::1
  ```

#### 🔁 방법 B: OpenSSL (대안)

```powershell
choco install openssl -y
mkdir certs
# 한 줄로 실행하세요 (PowerShell)
openssl req -x509 -nodes -days 825 -newkey rsa:2048 -keyout certs/localhost-key.pem -out certs/localhost.pem -subj "/CN=localhost" -addext "subjectAltName=DNS:localhost,IP:127.0.0.1,IP:::1"
```

> Windows에서 WSL2로 개발 중이면 브라우저가 Windows에 설치된 인증서를 신뢰합니다. 이 경우 **Windows 호스트에서 mkcert를 실행해 생성한 PEM 파일을 프로젝트 폴더로 복사**하는 것을 권장합니다.

---

### 3) 서버 실행

`package.json` 스크립트가 아래와 같다고 가정합니다.

```jsonc
{
  "scripts": {
    "dev": "next dev -p 3001",
    "proxy": "node scripts/dev-proxy.mjs",
    "dev:https": "concurrently -k -n NEXT,SSL \"npm run dev\" \"npm run proxy\"",
  },
}
```

실행:

```bash
npm run dev:https
```

접속:

- 프론트: https://localhost:3000
- client 컴포넌트에서 API 호출: `/api/...` → `.env`의 `NEXT_PUBLIC_API_URL`로 프록시
- server 컴포넌트에서 API 호출: createAxiosServer로 인스턴스 생성 후, 인스턴스에 주소를 `/...` -> `.env`의 `NEXT_PUBLIC_API_URL`로
  !! 이때 앞에 백엔드 서버 URL이나 `/api`를 앞에 붙이면 안됩니다. endpoint만 넣어야합니다 !!

```tsx
const api = await createAxiosServer();
const { data } = await api.get("/centers");
```

---

### 4) 트러블슈팅

- **`ENOENT: ./certs/localhost-key.pem`**  
  → 인증서가 없거나 경로가 다릅니다. 위의 발급 과정을 다시 진행하고, 파일이 **프로젝트 루트의 `certs/`**에 있는지 확인하세요.

- **브라우저 "안전하지 않음"/경고 페이지**  
  → OpenSSL 방식은 신뢰루트 자동설치가 없습니다. 가능한 **mkcert 사용**을 권장합니다.

- **`ETIMEDOUT/ECONNREFUSED` (백엔드 연결 실패)**  
  → `.env`의 `NEXT_PUBLIC_API_URL`이 접근 가능한지 확인하세요.
  - 백엔드가 로컬(예: 127.0.0.1:8080)에서만 리슨하면 외부 접속 불가 → `0.0.0.0` 바인딩 필요
  - EC2/Nginx/ALB 환경이면 공개 포트(80/443)로 접근하거나 보안그룹/방화벽을 열어야 합니다.
  - 임시 우회(SSH 터널):
    ```bash
    ssh -N -L 18080:127.0.0.1:8080 ubuntu@<server-ip>
    # 이후
    NEXT_PUBLIC_API_URL=http://localhost:18080/api npm run dev:https
    ```

- **쿠키가 저장되지 않음**  
  → 개발 프록시가 HTTPS를 제공하므로 `Secure` 쿠키 요건은 충족됩니다. 다만 도메인이 다르면 서드파티로 간주될 수 있습니다. 개발 중에는 브라우저가 `localhost`를 1st‑party로 취급하므로, 프론트는 항상 `https://localhost:3000`을 사용하고 API는 `/api/...`로만 호출하세요.

---

### 5) 확인 체크리스트

- [ ] `certs/localhost-key.pem`, `certs/localhost.pem` 존재
- [ ] `.env`에 `NEXT_PUBLIC_API_URL` 설정
- [ ] `npm run dev:https` 실행 후 `https://localhost:3000` 접속 OK
- [ ] API 호출은 `/api/...` 경로로만 사용
