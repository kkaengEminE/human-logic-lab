# 찌릿! — 인간 논리회로 실험실

3D 사람 부품으로 AND, OR, NOT, XOR를 실험하는 작은 브라우저 게임입니다.

## 실행

[GitHub Pages에서 플레이](https://kkaengemine.github.io/human-logic-lab/)

로컬에서는 `python3 -m http.server 4173 --directory dist`로 실행한 뒤 `http://localhost:4173`을 엽니다. 별도 빌드나 패키지 설치는 필요 없습니다.

## 조작

- 실험 선택: AND, OR, NOT, XOR. 처음에는 한 개의 게이트를 테스트합니다.
- 입력: A·B 스위치 또는 키보드 A·B. NOT은 A만 사용합니다.
- 배치: 실험장 사람을 드래그하거나, 부품 버튼을 선택하고 바닥을 클릭합니다. 표시된 자리에 가까이 놓으면 자동으로 연결됩니다.
- 키보드 배치: 부품 버튼 선택 후 Enter로 배치. 실험장에 초점을 두고 1·2·3으로 사람 선택, 방향키로 이동, Enter로 제자리, F로 간식을 줍니다.
- 간식: 간식 도구로 사람 클릭 또는 모두에게 간식 주기. 간식 없이 22초가 지나면 움직여 연결이 끊깁니다.
- 시점: 빈 바닥 드래그로 회전, 스크롤로 확대/축소.
- 일시 정지, 다시 세우기, 시점 초기화 버튼을 사용할 수 있습니다.

신호가 1인 사람은 머리카락이 서고 몸을 떨며, 전구가 최종 0/1을 표시합니다. 사람이 자리를 벗어나면 계산식에는 연결 끊김을 표시하고 전구를 끕니다.

## 배포

이 프로젝트의 기본 배포 대상은 **GitHub Pages**입니다. GitHub 저장소 `kkaengEminE/human-logic-lab`의 `main`에 푸시하면 `.github/workflows/deploy-pages.yml`이 `dist`를 배포합니다. 모든 자산 경로는 상대 경로이므로 저장소 하위 경로에서 실행됩니다.

`.openai/hosting.json`은 최초 Sites 배포의 식별 정보로 보존되어 있습니다. 이후 변경은 사용자가 요청한 GitHub Pages로 배포합니다.

## 의존성

Three.js 0.180.0을 `dist/vendor`에 포함하며 해당 MIT 라이선스를 함께 배포합니다. 글꼴은 Google Fonts의 Noto Sans KR을 사용하며 불러오지 못하면 시스템 글꼴로 표시합니다.
