# API 명세서

백엔드 API와의 통신을 위한 엔드포인트 및 응답 형식 정의

## 기본 설정

- **Base URL**: `https://api-x-ink.store` (개발 환경)
- **인증 방식**: 쿠키 기반 (HttpOnly Cookie에 액세스 토큰 저장)
- **Content-Type**: `application/json`

## 엔드포인트

### 1. 사용자 정보 조회

**GET** `/api/auth/me`

현재 로그인한 사용자의 정보를 반환합니다.

**Headers:**
```
Cookie: accessToken={token}
```

**Response (개인 회원 - 로컬):**
```json
{
  "id": "user123",
  "userType": "individual",
  "loginType": "local",
  "email": "user@example.com",
  "name": "홍길동",
  "profileImage": null,
  "applicationCount": 3,
  "notificationCount": 2
}
```

**Response (개인 회원 - 카카오):**
```json
{
  "id": "user456",
  "userType": "individual",
  "loginType": "kakao",
  "email": "kakaouser@kakao.com",
  "name": "김철수",
  "profileImage": "https://k.kakaocdn.net/dn/.../profile.jpg",
  "applicationCount": 5,
  "notificationCount": 1
}
```

**Response (기업 회원):**
```json
{
  "id": "company789",
  "userType": "company",
  "loginType": "local",
  "email": "company@example.com",
  "companyName": "ABC 기업",
  "profileImage": null,
  "jobCount": 8,
  "notificationCount": 7
}
```

**Error Response (401 Unauthorized):**
```json
{
  "error": "UNAUTHORIZED",
  "message": "로그인이 필요합니다."
}
```

---

### 2. 로컬 로그인

**POST** `/api/auth/login`

이메일과 비밀번호로 로그인합니다.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "로그인 성공",
  "user": {
    "id": "user123",
    "userType": "individual",
    "loginType": "local",
    "email": "user@example.com",
    "name": "홍길동"
  }
}
```

**Set-Cookie:**
```
accessToken={token}; HttpOnly; Secure; SameSite=Strict; Max-Age=86400
```

---

### 3. 로그아웃

**POST** `/api/auth/logout`

현재 사용자를 로그아웃합니다.

**Response:**
```json
{
  "message": "로그아웃 성공"
}
```

**Set-Cookie:**
```
accessToken=; HttpOnly; Secure; SameSite=Strict; Max-Age=0
```

---

### 4. 회원가입

**POST** `/api/auth/register`

새로운 사용자를 등록합니다.

**Request Body (개인):**
```json
{
  "userType": "individual",
  "email": "newuser@example.com",
  "password": "password123",
  "name": "새사용자",
  "phone": "010-1234-5678"
}
```

**Request Body (기업):**
```json
{
  "userType": "company",
  "email": "newcompany@example.com",
  "password": "password123",
  "companyName": "새기업",
  "businessNumber": "123-45-67890",
  "phone": "02-1234-5678"
}
```

**Response:**
```json
{
  "message": "회원가입 성공",
  "userId": "user123"
}
```

---

### 5. 카카오 로그인 콜백

**GET** `/api/auth/kakao/callback`

카카오 OAuth 인증 후 콜백을 처리합니다.

**Query Parameters:**
```
code={kakao_auth_code}
```

**Response:**
```json
{
  "message": "카카오 로그인 성공",
  "user": {
    "id": "user456",
    "userType": "individual",
    "loginType": "kakao",
    "email": "kakaouser@kakao.com",
    "name": "김철수",
    "profileImage": "https://k.kakaocdn.net/dn/.../profile.jpg"
  }
}
```

**Set-Cookie:**
```
accessToken={token}; HttpOnly; Secure; SameSite=Strict; Max-Age=86400
```

---

### 6. 전체 공고 목록 조회

**GET** `/jobs`

모든 채용 공고를 조회합니다.

**Query Parameters (선택):**
```
position={포지션}  // 예: "프론트엔드", "백엔드"
status={상태}      // 예: "OPEN", "CLOSE"
```

**Response:**
```json
[
  {
    "id": 1,
    "companyId": 1,
    "companyName": "1등기업",
    "title": "24시간 풀근무 가능한 개발자 찾습니다.",
    "dday": "D-22",
    "position": "프론트엔드",
    "status": "OPEN"
  },
  {
    "id": 2,
    "companyId": 2,
    "companyName": "2등기업",
    "title": "우리회사의 발닦개 개발자를 찾습니다",
    "dday": "D-22",
    "position": "프론트엔드",
    "status": "OPEN"
  }
]
```

**필드 설명:**
- `id`: 공고 고유 ID
- `companyId`: 공고를 올린 기업 ID
- `companyName`: 기업명
- `title`: 공고 제목
- `dday`: 마감일까지 남은 일수 (백엔드에서 계산)
- `position`: 포지션 (프론트엔드, 백엔드, 블록체인 등)
- `status`: 공고 상태 ("OPEN", "CLOSE")

**Note:** 
- `dday`는 백엔드에서 DEAD_LINE과 현재 시간을 계산하여 "D-{일수}" 형식으로 반환
- 프론트엔드에서 별도 가공 불필요

---

## 데이터 타입 정의

### User (개인 회원)
```typescript
{
  id: string;
  userType: "individual";
  loginType: "local" | "kakao";
  email: string;
  name: string;
  profileImage: string | null;
  applicationCount: number;  // 지원한 기업 수
  notificationCount: number;  // 알림 개수
}
```

### User (기업 회원)
```typescript
{
  id: string;
  userType: "company";
  loginType: "local";
  email: string;
  companyName: string;
  profileImage: string | null;
  jobCount: number;  // 등록한 채용 공고 수
  notificationCount: number;  // 알림 개수 (지원자 등)
}
```

### Job (공고)
```typescript
{
  id: number;
  companyId: number;
  companyName: string;
  title: string;
  dday: string;  // "D-22" 형식 (백엔드에서 계산)
  position: string;  // "프론트엔드", "백엔드", "블록체인" 등
  status: "OPEN" | "CLOSE";
}
```

---

## 에러 코드

| 상태 코드 | 설명 |
|---------|------|
| 200 | 성공 |
| 201 | 생성 성공 |
| 204 | 성공 (컨텐츠 없음) |
| 400 | 잘못된 요청 |
| 401 | 인증 필요 |
| 403 | 권한 없음 |
| 404 | 찾을 수 없음 |
| 500 | 서버 오류 |

---

## 프론트엔드 사용 예시

```javascript
import { getCurrentUser, loginLocal, logout, getJobs } from './services/api';

// 1. 사용자 정보 조회
const user = await getCurrentUser();

// 2. 로그인
const loginData = await loginLocal('user@example.com', 'password123');

// 3. 로그아웃
await logout();

// 4. 전체 공고 목록 조회
const jobs = await getJobs();

// 5. 필터링된 공고 목록 조회
const frontendJobs = await getJobsFiltered({ position: '프론트엔드', status: 'OPEN' });
```

---

## 환경 변수 설정

`.env` 파일에 다음을 추가하세요:

```env
REACT_APP_API_URL=http://localhost:8000
```

프로덕션 환경:
```env
REACT_APP_API_URL=https://api.yourapp.com
```

