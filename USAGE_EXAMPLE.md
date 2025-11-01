# 사용 예시

외부 프로젝트에서 이 데이터를 사용하는 방법입니다.

## GitHub Pages URL로 데이터 가져오기

### 1. 기본 fetch 사용

```javascript
// 시나리오 데이터 가져오기
async function loadScenarioData() {
  const GITHUB_PAGES_BASE_URL = 'https://[username].github.io/peerline-sceanario/data';
  
  // scenarioData 가져오기
  const response = await fetch(`${GITHUB_PAGES_BASE_URL}/scenarioData/메인.json`);
  const scenarioData = await response.json();
  console.log(scenarioData);
  
  // PassData 가져오기
  const passDataResponse = await fetch(`${GITHUB_PAGES_BASE_URL}/PassData/passData.json`);
  const passData = await passDataResponse.json();
  console.log(passData);
}
```

### 2. 모든 시나리오 파일 가져오기

```javascript
async function loadAllScenarios() {
  const GITHUB_PAGES_BASE_URL = 'https://[username].github.io/peerline-sceanario/data';
  
  // 시나리오 파일 목록 (실제로는 별도 API 필요)
  const scenarioFiles = [
    '메인.json',
    '검색.json',
    '회원서비스_로그인.json',
    // ... 기타 파일들
  ];
  
  const scenarioDataMap = {};
  
  for (const file of scenarioFiles) {
    const response = await fetch(`${GITHUB_PAGES_BASE_URL}/scenarioData/${encodeURIComponent(file)}`);
    const data = await response.json();
    scenarioDataMap[file] = data;
  }
  
  return scenarioDataMap;
}
```

### 3. index.js 로직 구현 (동적 로드 버전)

`index.js`의 로직을 동적 로드 방식으로 구현:

```javascript
class ScenarioChecker {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.passDataIds = null;
    this.fileToIdSetMap = {};
  }
  
  async loadPassData() {
    if (this.passDataIds === null) {
      const response = await fetch(`${this.baseUrl}/PassData/passData.json`);
      const passData = await response.json();
      const mapping = Array.isArray(passData?.mapping) ? passData.mapping : [];
      this.passDataIds = new Set(mapping.map((m) => String(m.id)));
    }
    return this.passDataIds;
  }
  
  async loadScenarioFile(fileName) {
    if (!this.fileToIdSetMap[fileName]) {
      const response = await fetch(`${this.baseUrl}/scenarioData/${encodeURIComponent(fileName)}`);
      const data = await response.json();
      const mapping = Array.isArray(data?.mapping) ? data.mapping : [];
      const idSet = new Set(mapping.map((m) => String(m.id)));
      this.fileToIdSetMap[fileName] = { ids: idSet, mapping };
    }
    return this.fileToIdSetMap[fileName];
  }
  
  async isSameScenarioGroup(fromId, toId) {
    const a = String(fromId);
    const b = String(toId);
    
    // 이미 로드된 파일들 확인
    for (const { ids: idSet } of Object.values(this.fileToIdSetMap)) {
      if (idSet.has(a) && idSet.has(b)) {
        return true;
      }
    }
    
    return false;
  }
  
  async isCommonScenario(fromId, toId) {
    const a = String(fromId);
    const b = String(toId);
    const passDataIds = await this.loadPassData();
    return passDataIds.has(a) || passDataIds.has(b);
  }
  
  async isEntryToOut(fromId, toId) {
    const a = String(fromId);
    const b = String(toId);
    
    for (const { mapping } of Object.values(this.fileToIdSetMap)) {
      const fromItem = mapping.find((m) => String(m.id) === a);
      const toItem = mapping.find((m) => String(m.id) === b);
      
      if (fromItem?.entryPoint === true && toItem?.outPoint === true) {
        return true;
      }
    }
    
    return false;
  }
  
  async checkScenarioGroup(fromId, toId) {
    // 공통 시나리오면 무조건 true
    if (await this.isCommonScenario(fromId, toId)) {
      return true;
    }
    
    // 같은 시나리오 그룹 내인지 확인
    if (await this.isSameScenarioGroup(fromId, toId)) {
      // entry → out 이동이면 false 반환
      if (await this.isEntryToOut(fromId, toId)) {
        return false;
      }
      return true;
    }
    
    return false;
  }
}

// 사용 예시
const checker = new ScenarioChecker('https://[username].github.io/peerline-sceanario/data');
const result = await checker.checkScenarioGroup('1722', '1683');
console.log(result);
```

### 4. React 컴포넌트에서 사용

```jsx
import { useEffect, useState } from 'react';

function ScenarioViewer({ scenarioName }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchData() {
      const GITHUB_PAGES_BASE_URL = 'https://[username].github.io/peerline-sceanario/data';
      const response = await fetch(`${GITHUB_PAGES_BASE_URL}/scenarioData/${scenarioName}.json`);
      const jsonData = await response.json();
      setData(jsonData);
      setLoading(false);
    }
    
    fetchData();
  }, [scenarioName]);
  
  if (loading) return <div>Loading...</div>;
  if (!data) return <div>No data</div>;
  
  return (
    <div>
      <h2>{scenarioName}</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```

## 참고사항

1. **CORS**: GitHub Pages는 기본적으로 CORS를 지원합니다.
2. **캐싱**: 브라우저 자동 캐싱 활용 가능
3. **상대 경로**: 실제 GitHub Pages URL로 교체해야 합니다
4. **한글 파일명**: `encodeURIComponent()`로 인코딩 필요

