# peerline-scenario

Peerline 시나리오 데이터 저장소

## GitHub Pages URL

이 저장소의 데이터는 GitHub Pages를 통해 정적 파일로 제공됩니다.

### 기본 URL

```
https://[username].github.io/peerline-sceanario/data/
```

### 사용 예시

#### 1. 전체 시나리오 목록 가져오기 (scenarioList.json)

```javascript
const response = await fetch(
  "https://tonyson8245.github.io/peerline-sceanario/data/scenarioList.json"
);
const scenarioList = await response.json();
console.log("전체 시나리오 파일 목록:", scenarioList);
```

#### 2. 개별 시나리오 데이터 가져오기

```javascript
// 특정 시나리오 파일
const response = await fetch(
  "https://tonyson8245.github.io/peerline-sceanario/data/scenarioData/메인.json"
);
const data = await response.json();
console.log(data);

// 시나리오 목록을 먼저 가져온 후 동적으로 로드
const scenarioList = await fetch(
  "https://tonyson8245.github.io/peerline-sceanario/data/scenarioList.json"
).then((r) => r.json());
for (const fileName of scenarioList) {
  const encodedFileName = encodeURIComponent(fileName);
  const response = await fetch(
    `https://tonyson8245.github.io/peerline-sceanario/data/scenarioData/${encodedFileName}`
  );
  const data = await response.json();
  console.log(`${fileName}:`, data);
}
```

#### 3. PassData 가져오기

```javascript
const passDataResponse = await fetch(
  "https://tonyson8245.github.io/peerline-sceanario/data/PassData/passData.json"
);
const passData = await passDataResponse.json();
console.log("PassData:", passData);
```

#### 4. authPageMap 가져오기

```javascript
const authResponse = await fetch(
  "https://tonyson8245.github.io/peerline-sceanario/data/authPageMap.json"
);
const authPageMap = await authResponse.json();
console.log("Auth Page Map:", authPageMap);

// 특정 페이지의 인증 정보 조회
const pageId = "1713";
const authInfo = authPageMap[pageId];
console.log(`페이지 ${pageId} 인증 정보:`, authInfo);
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
├── scenarioData/          # 시나리오별 JSON 데이터 (82개 파일)
│   ├── 메인.json
│   ├── 검색.json
│   └── ...
├── PassData/             # 공통 데이터
│   └── passData.json
├── scenarioList.json     # 전체 시나리오 파일 목록
├── authPageMap.json      # 인증 페이지 맵
├── authPageMap.js        # 인증 페이지 맵 (원본 JS)
└── index.js             # 시나리오 체크 함수
```

## 주요 엔드포인트

- **시나리오 목록**: `https://tonyson8245.github.io/peerline-sceanario/data/scenarioList.json`
- **개별 시나리오**: `https://tonyson8245.github.io/peerline-sceanario/data/scenarioData/{파일명}.json`
- **PassData**: `https://tonyson8245.github.io/peerline-sceanario/data/PassData/passData.json`
- **AuthPageMap**: `https://tonyson8245.github.io/peerline-sceanario/data/authPageMap.json`

## 배포

저장소 설정에서 GitHub Pages를 활성화하면 자동으로 배포됩니다.

### 수동 배포

1. `main` 브랜치에 푸시
2. GitHub Actions가 자동으로 배포 실행
3. Settings > Pages에서 배포 URL 확인

## 라이선스

Copyright (c) 2025 Peerline. All rights reserved.
