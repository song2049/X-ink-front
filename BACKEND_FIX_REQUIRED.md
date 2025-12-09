# 🚨 백엔드 수정 필요 사항

## 문제 상황

현재 로그인은 성공하지만, **프론트엔드 헤더가 업데이트되지 않음**

## 원인

백엔드 `/auth/login` 응답에 **`user` 필드가 없음**

---

## ❌ 현재 백엔드 응답 (문제)

```json
{
  "message": "유저 로그인 성공"
}
```

**문제:**
- `user` 객체가 없어서 프론트엔드에서 사용자 정보를 받을 수 없음
- 헤더에 프로필이 표시되지 않음
- 로그인 상태 분기 처리가 작동하지 않음

---

## ✅ 수정된 백엔드 응답 (필수)

### 개인 회원 로그인

```json
{
  "message": "유저 로그인 성공",
  "user": {
    "id": "user_123456",
    "userType": "individual",
    "loginType": "local",
    "email": "test1@test.com",
    "name": "홍길동",
    "profileImage": null,
    "applicationCount": 0,
    "notificationCount": 0
  }
}
```

### 기업 회원 로그인

```json
{
  "message": "기업 로그인 성공",
  "user": {
    "id": "company_123456",
    "userType": "company",
    "loginType": "local",
    "email": "company@test.com",
    "companyName": "ABC 주식회사",
    "profileImage": null,
    "jobCount": 0,
    "notificationCount": 0
  }
}
```

---

## 📋 필수 필드 명세

### 공통 필드 (모든 사용자)

| 필드 | 타입 | 설명 | 예시 |
|-----|------|------|-----|
| `id` | String | 사용자 고유 ID | "user_123456" |
| `userType` | String | **"individual"** 또는 **"company"** | "individual" |
| `loginType` | String | **"local"** 또는 **"kakao"** | "local" |
| `email` | String | 이메일 | "test1@test.com" |
| `profileImage` | String \| null | 프로필 이미지 URL | null 또는 "https://..." |
| `notificationCount` | Number | 알림 개수 | 0 |

### 개인 회원 전용 필드

| 필드 | 타입 | 설명 | 예시 |
|-----|------|------|-----|
| `name` | String | 사용자 이름 | "홍길동" |
| `applicationCount` | Number | 지원한 공고 수 | 0 |

### 기업 회원 전용 필드

| 필드 | 타입 | 설명 | 예시 |
|-----|------|------|-----|
| `companyName` | String | 기업명 | "ABC 주식회사" |
| `jobCount` | Number | 등록한 공고 수 | 0 |

---

## 💻 백엔드 수정 예시 (Node.js/Express)

### 현재 코드 (❌)

```javascript
router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  // 인증 로직...
  const user = await User.findOne({ email });
  
  // 토큰 생성...
  const token = generateToken(user);
  
  // 쿠키 설정...
  res.cookie('accessToken', token, { httpOnly: true });
  
  // ❌ user 정보 없이 응답
  res.json({
    message: '유저 로그인 성공'
  });
});
```

### 수정된 코드 (✅)

```javascript
router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  // 인증 로직...
  const user = await User.findOne({ email });
  
  // 토큰 생성...
  const token = generateToken(user);
  
  // 쿠키 설정...
  res.cookie('accessToken', token, { httpOnly: true });
  
  // ✅ user 정보와 함께 응답
  res.json({
    message: '유저 로그인 성공',
    user: {
      id: user._id,
      userType: user.userType,  // 'individual' 또는 'company'
      loginType: user.loginType,  // 'local' 또는 'kakao'
      email: user.email,
      name: user.name,  // 개인 회원
      // companyName: user.companyName,  // 기업 회원
      profileImage: user.profileImage || null,
      applicationCount: user.applicationCount || 0,  // 개인
      // jobCount: user.jobCount || 0,  // 기업
      notificationCount: user.notificationCount || 0
    }
  });
});
```

---

## 🧪 테스트 방법

### 1. Postman/Thunder Client로 테스트

**요청:**
```
POST https://api.x-ink.store/auth/login
Content-Type: application/json

{
  "email": "test1@test.com",
  "password": "admin"
}
```

**예상 응답:**
```json
{
  "message": "유저 로그인 성공",
  "user": {
    "id": "...",
    "userType": "individual",
    "loginType": "local",
    "email": "test1@test.com",
    "name": "홍길동",
    ...
  }
}
```

### 2. 프론트엔드에서 확인

수정 후 프론트엔드에서 로그인 시도:

**예상 콘솔 로그:**
```javascript
✅ 로그인 API 응답: {
  message: "유저 로그인 성공",
  user: {
    userType: "individual",
    name: "홍길동",
    ...
  }
}

🔐 로그인 처리: {
  userType: "individual",
  name: "홍길동",
  ...
}

🎨 Header 렌더링: {
  isAuthenticated: true,  // ⭐ true로 변경!
  user: { ... }
}
```

---

## ⚠️ 중요 사항

1. **`userType` 필드는 필수!**
   - "individual" 또는 "company"
   - 이 값으로 헤더 메뉴가 분기됨

2. **`loginType` 필드는 필수!**
   - "local" 또는 "kakao"
   - 카카오 로그인 시 프로필 이미지 표시 여부 결정

3. **`name` 또는 `companyName` 필수!**
   - 개인: `name`
   - 기업: `companyName`
   - 헤더에 "OOO님 환영합니다" 표시

---

## 📊 수정 체크리스트

- [ ] `/auth/login` 엔드포인트에서 `user` 객체 반환
- [ ] `userType` 필드 포함 ("individual" 또는 "company")
- [ ] `loginType` 필드 포함 ("local" 또는 "kakao")
- [ ] 개인 회원: `name` 필드 포함
- [ ] 기업 회원: `companyName` 필드 포함
- [ ] Postman으로 응답 형식 확인
- [ ] 프론트엔드에서 로그인 테스트
- [ ] 헤더가 자동으로 변경되는지 확인

---

## 🎯 수정 후 결과

✅ 로그인 성공  
✅ 헤더에 프로필 표시  
✅ "OOO님 환영합니다" 메시지  
✅ 드롭다운 메뉴 표시  
✅ 개인/기업 회원 구분  
✅ 카테고리 분기 처리 (기업: "구직자 탐색" 추가)  

---

## 📞 문의

프론트엔드 개발자에게 문의:
- 응답 형식이 올바른지 확인 필요
- 추가 필드 필요 시 협의

