# 기여 가이드 (Contribution Guide)

이 문서는 프로젝트의 일관성 있는 코드 스타일과 개발 문화를 위해 작성되었습니다. 프로젝트에 기여하는 모든 개발자는 아래 가이드를 숙지하고 따라주시기 바랍니다.

## 💻 기술 스택 (Technology Stack)

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Emotion, Material-UI (MUI)
- **State Management**: Zustand
- **Data Fetching**: Axios, TanStack Query (React Query)
- **Component Development**: Storybook
- **Linting & Formatting**: ESLint, Prettier

## 📁 디렉토리 구조 (Directory Structure)

```
src/
├── apis/         # API 요청 함수 (Axios 인스턴스 포함)
├── app/          # Next.js App Router 기반 페이지 및 레이아웃
├── assets/       # 이미지, 로고, 폰트 등 정적 에셋
├── components/   # 공통 재사용 컴포넌트
├── constants/    # 전역 상수
├── hooks/        # 공통 재사용 커스텀 훅
├── states/       # Zustand 기반 전역 상태 관리 스토어
├── stories/      # Storybook 파일
├── types/        # 공통 타입 및 인터페이스
└── utils/        # 순수 함수 유틸리티
```

## ✨ 코드 스타일 및 포맷팅 (Code Style & Formatting)

- **포맷팅**: [Prettier](https://prettier.io/)를 사용하여 코드 스타일을 통일합니다.
  - `singleQuote`: `false` (큰따옴표 사용)
  - `printWidth`: 80자
- **린팅**: [ESLint](https://eslint.org/)를 사용하여 코드 품질을 유지합니다.
  - `eslint.config.mjs` 설정 파일을 따릅니다.
  - `React.FC`, `React.FunctionComponent` 타입 사용을 금지합니다.
  - `prettier/prettier` 규칙을 `error`로 설정하여 Prettier 규칙 위반 시 에러를 발생시킵니다.

> **중요**: 커밋 전 `npm run lint` 명령어를 실행하여 린트 에러가 없는지 확인해주세요.

## ✍️ 네이밍 컨벤션 (Naming Convention)

- **Components**: `PascalCase` (예: `SenifitHeader.tsx`)
- **Hooks**: `use` 접두사를 사용한 `camelCase` (예: `useTimer.ts`)
- **Interfaces**: `I` 접두사를 사용한 `PascalCase` (예: `IMember.ts`)
- **Types**: `T` 접두사를 사용한 `PascalCase` (예: `TControl.ts`)
- **Zustand Stores**: `use`로 시작하고 `Store`로 끝나는 `camelCase` (예: `useProgramStore.ts`)

## ⚛️ 상태 관리 (State Management)

- **전역 상태**: [Zustand](https://github.com/pmndrs/zustand)를 사용하여 관리합니다.
  - `src/states` 디렉토리 내에 기능별로 스토어를 생성합니다.
- **서버 상태**: [TanStack Query](https://tanstack.com/query/latest) (React Query)를 사용하여 관리합니다.
  - API 관련 데이터 캐싱, 동기화, 재요청 등을 처리합니다.

## 📖 컴포넌트 개발 (Component Development)

- **컴포넌트 원자성**: 가능한 한 작고 재사용 가능한 단위로 컴포넌트를 분리합니다.
- **Storybook**: 새로운 컴포넌트를 개발하거나 수정할 때, 해당 컴포넌트의 `stories.tsx` 파일을 작성하여 다양한 상태를 시각적으로 테스트하고 문서화합니다.
  - `npm run storybook` 명령어로 Storybook을 실행할 수 있습니다.

## 💬 커밋 메시지 컨벤션 (Commit Message Convention)

커밋 메시지는 아래 형식을 따릅니다. 이는 `.gitmessage.txt` 파일에 정의되어 있습니다.

```
<타입>: <제목>

(선택) 본문

(선택) 푸터
```

- **제목**: 50자 이내로 변경 사항을 명확히 작성하며, 끝에 마침표를 붙이지 않습니다.
- **타입**: 아래 타입 중 하나를 사용합니다.
  - `Feat`: 새로운 기능 추가
  - `Fix`: 버그 수정
  - `Docs`: 문서 수정
  - `Style`: 코드 포맷팅, 세미콜론 등 (로직 변경 없음)
  - `Refactor`: 코드 리팩토링
  - `Test`: 테스트 코드 추가/수정
  - `Chore`: 빌드, 패키지 매니저 설정 등
  - `Design`: CSS 등 UI 디자인 변경
  - `Comment`: 주석 추가/변경
  - `Rename`: 파일/폴더명 수정
  - `Remove`: 파일 삭제

## 🌿 Git 브랜치 전략

(프로젝트의 브랜치 전략을 여기에 추가하세요. 예: Git-flow, GitHub-flow 등)

- **main**: 배포 가능한 프로덕션 코드
- **develop**: 다음 릴리즈를 위한 개발 코드
- **feature/**: 기능 개발 브랜치 (예: `feature/login`)
- **fix/**: 버그 수정 브랜치 (예: `fix/header-bug`)
