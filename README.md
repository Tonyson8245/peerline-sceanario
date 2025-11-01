# peerline-scenario

Peerline 시나리오 데이터 저장소

## GitHub Pages URL

이 저장소의 데이터는 GitHub Pages를 통해 정적 파일로 제공됩니다.

### 기본 URL
```
https://[username].github.io/peerline-sceanario/data/
```

### 사용 예시

#### JSON 파일 직접 접근
```javascript
// scenarioData의 JSON 파일
const response = await fetch('https://[username].github.io/peerline-sceanario/data/scenarioData/메인.json');
const data = await response.json();

// PassData
const passDataResponse = await fetch('https://[username].github.io/peerline-sceanario/data/PassData/passData.json');
const passData = await passDataResponse.json();
```

#### 인덱스 사용 (index.js 참고)
```javascript
import {
  checkScenarioGroup,
  isSameScenarioGroup,
  isCommonScenario,
  isEntryToOut
} from 'https://[username].github.io/peerline-sceanario/data/index.js';

// 동적 로드가 필요한 경우, fetch로 가져온 후 모듈화
```

## 로컬 개발

### 설치 및 실행
```bash
# 이 저장소를 클론
git clone https://github.com/[username]/peerline-sceanario.git
cd peerline-sceanario

# npm 의존성 설치 (필요시)
npm install
```

## 파일 구조

```
data/
├── scenarioData/          # 시나리오별 JSON 데이터
│   ├── 메인.json
│   ├── 검색.json
│   └── ...
├── PassData/             # 공통 데이터
│   └── passData.json
├── authPageMap.js        # 인증 페이지 맵
└── index.js             # 시나리오 체크 함수
```

## 배포

저장소 설정에서 GitHub Pages를 활성화하면 자동으로 배포됩니다.

### 수동 배포
1. `main` 브랜치에 푸시
2. GitHub Actions가 자동으로 배포 실행
3. Settings > Pages에서 배포 URL 확인

## 라이선스

Copyright (c) 2025 Peerline. All rights reserved.
