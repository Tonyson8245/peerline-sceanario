// scenarioData 폴더의 모든 JSON을 정적 임포트하여 검색용 인덱스를 구성한다
const scenarioModules = import.meta.glob("./scenarioData/*.json", {
  eager: true,
  import: "default",
});

// passData.json 로드
const passData = import.meta.glob("./PassData/passData.json", {
  eager: true,
  import: "default",
});
const passDataIds = (() => {
  try {
    const passDataModule = Object.values(passData)[0];
    const mapping = Array.isArray(passDataModule?.mapping)
      ? passDataModule.mapping
      : [];
    return new Set(mapping.map((m) => String(m.id)));
  } catch (e) {
    return new Set();
  }
})();

// 파일별로 포함된 id 집합과 상세 정보를 미리 구성
const fileToIdSetMap = Object.entries(scenarioModules).reduce(
  (acc, [filePath, data]) => {
    try {
      const mapping = Array.isArray(data?.mapping) ? data.mapping : [];
      const idSet = new Set(mapping.map((m) => String(m.id)));
      acc[filePath] = { ids: idSet, mapping };
    } catch (e) {
      // JSON 구조가 예상과 다를 경우를 대비한 안전 처리
      acc[filePath] = { ids: new Set(), mapping: [] };
    }
    return acc;
  },
  {}
);

// 1. 같은 시나리오 그룹 내인지 확인 (scenarioData 기반)
export const isSameScenarioGroup = (fromId, toId) => {
  const a = String(fromId);
  const b = String(toId);

  for (const { ids: idSet } of Object.values(fileToIdSetMap)) {
    if (idSet.has(a) && idSet.has(b)) {
      return true;
    }
  }
  return false;
};

// 2. 공통 시나리오인지 확인 (PassData 기반)
export const isCommonScenario = (fromId, toId) => {
  const a = String(fromId);
  const b = String(toId);
  return passDataIds.has(a) || passDataIds.has(b);
};

// 3. entry → out 이동인지 확인
export const isEntryToOut = (fromId, toId) => {
  const a = String(fromId);
  const b = String(toId);

  for (const { mapping } of Object.values(fileToIdSetMap)) {
    const fromItem = mapping.find((m) => String(m.id) === a);
    const toItem = mapping.find((m) => String(m.id) === b);

    if (fromItem?.entryPoint === true && toItem?.outPoint === true) {
      return true;
    }
  }
  return false;
};

// 통합 체크 함수
export const checkScenarioGroup = (fromId, toId) => {
  // 공통 시나리오면 무조건 true
  if (isCommonScenario(fromId, toId)) {
    return true;
  }

  // 같은 시나리오 그룹 내인지 확인
  if (isSameScenarioGroup(fromId, toId)) {
    // entry → out 이동이면 false 반환
    if (isEntryToOut(fromId, toId)) {
      return false;
    }
    return true;
  }

  return false;
};
