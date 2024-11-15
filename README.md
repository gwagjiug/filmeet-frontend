# filmeet-frontend
필름밋 프론트엔드

## 📏 컨벤션

<details>
<summary > 1️⃣ Coding </summary>

### 변수

- var 금지.
- `const`  → `let` 순서로 위부터 선언
- 상수는 영문 대문자 스네이크케이스 : `API_KEY`
- 변수명 : 의미를 확실하게 알 수 있는 정도 (줄임말 금지) `img` 는 허용
- boolean 경우에는 is 접두사 붙히기

### 함수

- 화살표 함수 `only` , `function` 키워드 쓰지말기
- 함수명 : 어떤 일을 하는지 명확히 묘사. 동사 + 명사의 형식
    - `get` : 어떤 값을 얻는 함수
    - `create` : 갖고 있는 변수를 활용, 새로운 값과 변수를 만듦
    - `check` : 함수 안의 로직을 확인.
- 이벤트 핸들링 함수는 `handle`  로 시작.
- 중복함수는 `utils` 폴더에 모아서 재사용

### 컴포넌트

- 공통 컴포넌트는 `common` 폴더 하위에 만들어주세요
- `PascalCase` 로 작성해주세요 (컴포넌트 만!)

### 폴더명
- 무조건 소문자로 시작
- 뒤에 s 붙이기
- 카멜케이스

### Style

- 최대한 시맨틱 태그 잘 활용하기
- style 파일 분리가 기본, but 작은 컴포넌트 단위나 재사용성 떨어지면 그냥 컴포넌트 내부 선언 해주세요
- assets 폴더 안에 있는 모든 파일들은 `스네이크 케이스` `all_background_img_black`
- 어디서(공용으로 사용되면 `all`)_어떻게(파일의 역할)_상세설명(색상 등)
- `px` X | `rem OR %` O

</details>
