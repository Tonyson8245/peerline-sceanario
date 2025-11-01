# API 사용 가이드

GitHub Pages에서 제공하는 JSON 데이터를 API처럼 사용하는 방법입니다.

## 기본 URL

```
https://tonyson8245.github.io/peerline-sceanario/data/
```

## 엔드포인트 목록

### 1. 시나리오 목록 가져오기

```javascript
const response = await fetch('https://tonyson8245.github.io/peerline-sceanario/data/scenarioList.json');
const scenarioList = await response.json();
console.log('전체 시나리오 파일:', scenarioList);
```

**응답 예시:**
```json
[
  "검색.json",
  "메인.json",
  "회원서비스_로그인.json",
  ...
]
```

### 2. 개별 시나리오 데이터 가져오기

```javascript
// 파일명을 encodeURIComponent로 인코딩해야 함
const fileName = '메인.json';
const encodedFileName = encodeURIComponent(fileName);
const response = await fetch(`https://tonyson8245.github.io/peerline-sceanario/data/scenarioData/${encodedFileName}`);
const scenarioData = await response.json();
console.log(scenarioData);
```

**응답 예시:**
```json
{
  "categories": ["CST-CMN-CTG", "CST-FRO-MAN"],
  "mapping": [
    {
      "name": "메뉴",
      "id": "1722",
      "code": "CST-CMN-CTG-M00100",
      "parentCode": ["CST-FRO-MAN-M00100"],
      "entryPoint": false
    }
  ]
}
```

### 3. PassData 가져오기

```javascript
const response = await fetch('https://tonyson8245.github.io/peerline-sceanario/data/PassData/passData.json');
const passData = await response.json();
console.log('PassData:', passData);
```

### 4. AuthPageMap 가져오기

```javascript
const response = await fetch('https://tonyson8245.github.io/peerline-sceanario/data/authPageMap.json');
const authPageMap = await response.json();

// 특정 페이지의 인증 정보 조회
const pageId = '1713';
const authInfo = authPageMap[pageId];
console.log(`페이지 ${pageId} 인증 정보:`, authInfo);
// { auth: "X", action: "continue" }
```

## 통합 사용 예시

### 전체 시나리오 로드하기

```javascript
async function loadAllScenarios() {
  const baseUrl = 'https://tonyson8245.github.io/peerline-sceanario/data';
  
  // 1. 시나리오 목록 가져오기
  const scenarioList = await fetch(`${baseUrl}/scenarioList.json`).then(r => r.json());
  
  // 2. 각 시나리오 파일 로드
  const scenarios = {};
  for (const fileName of scenarioList) {
    const encodedFileName = encodeURIComponent(fileName);
    const data = await fetch(`${baseUrl}/scenarioData/${encodedFileName}`).then(r => r.json());
    scenarios[fileName] = data;
  }
  
  return scenarios;
}

// 사용
const allScenarios = await loadAllScenarios();
console.log('전체 시나리오 데이터:', allScenarios);
```

### 특정 ID로 시나리오 찾기

```javascript
async function findScenarioById(pageId) {
  const baseUrl = 'https://tonyson8245.github.io/peerline-sceanario/data';
  
  // 1. 시나리오 목록 가져오기
  const scenarioList = await fetch(`${baseUrl}/scenarioList.json`).then(r => r.json());
  
  // 2. 각 시나리오를 확인하며 ID 검색
  for (const fileName of scenarioList) {
    const encodedFileName = encodeURIComponent(fileName);
    const data = await fetch(`${baseUrl}/scenarioData/${encodedFileName}`).then(r => r.json());
    
    const found = data.mapping?.find(m => m.id === String(pageId));
    if (found) {
      return { fileName, scenarioData: data, mapping: found };
    }
  }
  
  return null;
}

// 사용
const result = await findScenarioById('1722');
console.log('찾은 시나리오:', result);
```

### React Hook으로 사용하기

```jsx
import { useState, useEffect } from 'react';

function useScenarioData(fileName) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const encodedFileName = encodeURIComponent(fileName);
        const response = await fetch(
          `https://tonyson8245.github.io/peerline-sceanario/data/scenarioData/${encodedFileName}`
        );
        
        if (!response.ok) {
          throw new Error(`Failed to load ${fileName}`);
        }
        
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    if (fileName) {
      loadData();
    }
  }, [fileName]);
  
  return { data, loading, error };
}

// 사용
function ScenarioViewer({ fileName }) {
  const { data, loading, error } = useScenarioData(fileName);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data</div>;
  
  return (
    <div>
      <h2>{fileName}</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```

### 인증 체크 유틸리티

```javascript
const AUTH_MAP_URL = 'https://tonyson8245.github.io/peerline-sceanario/data/authPageMap.json';

class AuthChecker {
  constructor() {
    this.authMap = null;
    this.loadPromise = null;
  }
  
  async load() {
    if (this.authMap) return this.authMap;
    if (this.loadPromise) return this.loadPromise;
    
    this.loadPromise = fetch(AUTH_MAP_URL)
      .then(r => r.json())
      .then(data => {
        this.authMap = data;
        return data;
      });
    
    return this.loadPromise;
  }
  
  async checkAuth(pageId) {
    await this.load();
    return this.authMap[String(pageId)] || { auth: "X", action: "continue" };
  }
  
  async requiresAuth(pageId) {
    const authInfo = await this.checkAuth(pageId);
    return authInfo.auth === "O";
  }
  
  async getAction(pageId) {
    const authInfo = await this.checkAuth(pageId);
    return authInfo.action;
  }
}

// 사용
const checker = new AuthChecker();

// 인증 필요 여부 확인
const requiresAuth = await checker.requiresAuth('1713');
console.log('인증 필요:', requiresAuth); // false

// 액션 확인
const action = await checker.getAction('1604');
console.log('액션:', action); // "login"
```

## 주의사항

1. **한글 파일명 인코딩**: `encodeURIComponent()` 필수
2. **CORS**: GitHub Pages는 CORS를 지원하므로 외부 도메인에서도 사용 가능
3. **캐싱**: 브라우저 기본 캐싱 활용
4. **에러 처리**: 네트워크 오류나 파일 누락에 대한 처리 필요
5. **동시 요청 제한**: 여러 파일을 한번에 로드할 때는 Promise.all 활용

```javascript
// 효율적인 병렬 로드
const scenarioList = await fetch(`${baseUrl}/scenarioList.json`).then(r => r.json());
const dataPromises = scenarioList.map(fileName => {
  const encoded = encodeURIComponent(fileName);
  return fetch(`${baseUrl}/scenarioData/${encoded}`).then(r => r.json());
});
const allData = await Promise.all(dataPromises);
```

