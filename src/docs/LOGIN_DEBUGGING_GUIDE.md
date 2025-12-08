# 로그인 디버깅 가이드

## 🐛 헤더가 업데이트되지 않는 문제

### 증상
- 로그인 알럿은 나옴 ✅
- 메인 페이지로 리다이렉트 됨 ✅
- 하지만 헤더가 로그인 상태로 변경되지 않음 ❌

---

## 🔍 디버깅 단계

### 1단계: 브라우저 콘솔 확인

로그인 시도 후 콘솔에서 다음 로그를 확인하세요:

```
📝 로그인 시도: test1@test.com
===== API 요청 =====
📍 URL: https://api.x-ink.store/auth/login
🔧 Method: POST
📦 Body: {"email":"test1@test.com","password":"..."}
===================
📥 응답 상태: 200 OK
✅ 로그인 API 응답: { ... }
🔐 로그인 처리: { ... }
✅ AuthContext에 사용자 정보 저장 완료
🔄 메인 페이지로 이동
🎨 Header 렌더링: { ... }
```

### 2단계: 응답 데이터 확인

**콘솔에서 확인해야 할 것:**

```javascript
✅ 로그인 API 응답: {
  message: "로그인 성공",
  user: {
    id: "user123",
    userType: "individual",  // ⭐ 중요!
    loginType: "local",      // ⭐ 중요!
    email: "test1@test.com",
    name: "홍길동",
    profileImage: null,
    applicationCount: 3,
    notificationCount: 2
  }
}
```

**필수 필드:**
- ✅ `user.userType`: "individual" 또는 "company"
- ✅ `user.loginType`: "local" 또는 "kakao"
- ✅ `user.name` 또는 `user.companyName`

### 3단계: AuthContext 상태 확인

```javascript
🔐 로그인 처리: {
  id: "user123",
  userType: "individual",
  name: "홍길동",
  ...
}
```

### 4단계: Header 렌더링 확인

```javascript
🎨 Header 렌더링: {
  isAuthenticated: true,  // ⭐ true여야 함!
  isCompany: false,
  user: {
    name: "홍길동",
    userType: "individual",
    loginType: "local"
  },
  loading: false
}
```

---

## ❌ 문제별 해결 방법

### 문제 1: `user` 객체가 `undefined`

**증상:**
```javascript
🔐 로그인 처리: undefined
```

**원인:**
백엔드 응답에 `user` 필드가 없음

**해결:**
백엔드에서 다음 형식으로 응답해야 함:
```json
{
  "message": "로그인 성공",
  "user": { ... }  // ⭐ 필수!
}
```

---

### 문제 2: `userType` 또는 `loginType` 누락

**증상:**
```javascript
🎨 Header 렌더링: {
  isAuthenticated: true,
  isCompany: false,  // userType이 없어서 false
  user: {
    name: "홍길동"
    // userType 없음!
  }
}
```

**원인:**
백엔드 응답에 `userType` 또는 `loginType` 필드가 없음

**해결:**
백엔드에서 필수 필드 포함:
```json
{
  "user": {
    "userType": "individual",  // ⭐ 필수!
    "loginType": "local",      // ⭐ 필수!
    "name": "홍길동"
  }
}
```

---

### 문제 3: Header가 리렌더링되지 않음

**증상:**
```javascript
// 로그인 후
🔐 로그인 처리: { ... }  // ✅ 호출됨
✅ AuthContext에 사용자 정보 저장 완료

// 하지만 Header 렌더링 로그가 없음
```

**원인:**
AuthContext의 상태 변경이 전파되지 않음

**해결:**
1. `src/App.js`에서 `AuthProvider`가 `BrowserRouter` 바깥에 있는지 확인
2. 현재 코드는 올바름:
```javascript
<AuthProvider>
  <BrowserRouter>
    ...
  </BrowserRouter>
</AuthProvider>
```

---

### 문제 4: 로그인 후 즉시 로그아웃 상태로 돌아감

**증상:**
```javascript
🔐 로그인 처리: { ... }
🎨 Header 렌더링: { isAuthenticated: false }  // ❌
```

**원인:**
AuthContext의 초기 `loadUser()`가 실패해서 user를 null로 설정

**해결:**
1. 백엔드 `/auth/me` 엔드포인트 구현
2. 또는 LoginForm에서 `refresh()` 호출 제거 (현재 상태)

---

## ✅ 백엔드 체크리스트

### 로그인 엔드포인트 (`POST /auth/login`)

```json
요청:
{
  "email": "test1@test.com",
  "password": "password123"
}

응답 (개인 회원):
{
  "message": "로그인 성공",
  "user": {
    "id": "user123",
    "userType": "individual",     // ⭐ 필수
    "loginType": "local",         // ⭐ 필수
    "email": "test1@test.com",
    "name": "홍길동",              // ⭐ 필수
    "profileImage": null,
    "applicationCount": 3,
    "notificationCount": 2
  }
}

응답 (기업 회원):
{
  "message": "로그인 성공",
  "user": {
    "id": "company123",
    "userType": "company",        // ⭐ 필수
    "loginType": "local",         // ⭐ 필수
    "email": "company@test.com",
    "companyName": "ABC 기업",    // ⭐ 필수
    "profileImage": null,
    "jobCount": 8,
    "notificationCount": 7
  }
}
```

### 쿠키 설정

```
Set-Cookie: accessToken=xxx; HttpOnly; Secure; SameSite=None; Max-Age=86400
```

**⚠️ 중요:**
- `HttpOnly`: JavaScript에서 접근 불가 (보안)
- `Secure`: HTTPS만 전송
- `SameSite=None`: 크로스 도메인 허용 (개발 환경)

---

## 🧪 테스트 방법

### 1. 로컬 Mock 테스트

```
http://localhost:3000/play/header-test
```

이 페이지에서 백엔드 없이 로그인 상태를 테스트할 수 있습니다.

### 2. 실제 API 테스트

1. **서버 재시작**
```bash
npm start
```

2. **로그인 시도**
```
http://localhost:3000/login
```

3. **콘솔 확인**
   - F12 → Console 탭
   - 위의 디버깅 로그 확인

4. **Network 탭 확인**
   - F12 → Network 탭
   - `/auth/login` 요청 클릭
   - Response 탭에서 응답 데이터 확인

---

## 🔧 일시적 해결 방법 (백엔드 미구현 시)

백엔드가 아직 완전히 구현되지 않았다면:

### 옵션 1: Mock 응답 사용

`src/services/api.js`에 임시 Mock 추가:

```javascript
export const loginLocal = async (email, password) => {
  // TODO: 백엔드 구현 후 제거
  if (process.env.NODE_ENV === 'development' && email === 'test@test.com') {
    return {
      message: '로그인 성공 (Mock)',
      user: {
        id: 'mock123',
        userType: 'individual',
        loginType: 'local',
        email: email,
        name: '테스트 유저',
        profileImage: null,
        applicationCount: 3,
        notificationCount: 2,
      }
    };
  }
  
  return await fetchAPI(`${AUTH_PREFIX}/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};
```

### 옵션 2: HeaderTestPlay 사용

```
http://localhost:3000/play/header-test
```

여기서 버튼으로 로그인 상태를 시뮬레이션할 수 있습니다.

---

## 📞 백엔드 개발자에게 전달할 내용

1. **필수 응답 필드:**
   - `user.userType`: "individual" | "company"
   - `user.loginType`: "local" | "kakao"
   - `user.name` (개인) 또는 `user.companyName` (기업)

2. **쿠키 설정:**
   - `accessToken` HttpOnly 쿠키로 설정
   - CORS 설정: `credentials: true`

3. **엔드포인트 우선순위:**
   - ✅ 필수: `POST /auth/login`
   - ⏳ 나중: `GET /auth/me`
   - ⏳ 나중: `POST /auth/logout`

4. **테스트 계정:**
   - 개인: `test1@test.com`
   - 기업: `company@test.com`

---

## 🎉 성공 확인

로그인이 성공하면:

1. **콘솔:**
```
✅ 로그인 API 응답: { ... }
🔐 로그인 처리: { ... }
✅ AuthContext에 사용자 정보 저장 완료
🎨 Header 렌더링: { isAuthenticated: true, ... }
```

2. **헤더:**
   - "OOO님 환영합니다" 메시지 표시
   - 프로필 이미지 표시
   - 드롭다운 메뉴 표시

3. **네트워크:**
   - `/auth/login` 요청 200 OK
   - 쿠키에 `accessToken` 설정

**축하합니다! 🎊**

