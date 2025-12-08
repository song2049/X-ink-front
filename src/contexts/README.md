# 인증 컨텍스트 (AuthContext)

사용자 인증 상태를 전역으로 관리하는 React Context입니다.

## 사용 방법

### 1. AuthProvider로 앱 감싸기

`App.js`에서 전체 앱을 `AuthProvider`로 감싸야 합니다.

```javascript
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* 라우트들... */}
      </BrowserRouter>
    </AuthProvider>
  );
}
```

### 2. useAuth 훅 사용하기

컴포넌트에서 `useAuth` 훅을 사용하여 인증 정보에 접근합니다.

```javascript
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, isCompany, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>로그인이 필요합니다.</div>;
  }

  return (
    <div>
      <p>환영합니다, {user.name}님!</p>
      <button onClick={logout}>로그아웃</button>
    </div>
  );
}
```

## useAuth 반환값

| 속성 | 타입 | 설명 |
|-----|------|------|
| `user` | `Object \| null` | 현재 로그인한 사용자 정보 |
| `loading` | `boolean` | 사용자 정보 로딩 중 여부 |
| `error` | `string \| null` | 에러 메시지 |
| `isAuthenticated` | `boolean` | 로그인 여부 |
| `isCompany` | `boolean` | 기업 회원 여부 |
| `isIndividual` | `boolean` | 개인 회원 여부 |
| `isKakaoUser` | `boolean` | 카카오 로그인 여부 |
| `login(userData)` | `function` | 로그인 처리 (사용자 정보 설정) |
| `logout()` | `function` | 로그아웃 처리 |
| `refresh()` | `function` | 사용자 정보 새로고침 |

## User 객체 구조

### 개인 회원 (로컬)
```javascript
{
  id: "user123",
  userType: "individual",
  loginType: "local",
  email: "user@example.com",
  name: "홍길동",
  profileImage: null,
  applicationCount: 3,
  notificationCount: 2
}
```

### 개인 회원 (카카오)
```javascript
{
  id: "user456",
  userType: "individual",
  loginType: "kakao",
  email: "kakaouser@kakao.com",
  name: "김철수",
  profileImage: "https://k.kakaocdn.net/.../profile.jpg",
  applicationCount: 5,
  notificationCount: 1
}
```

### 기업 회원
```javascript
{
  id: "company789",
  userType: "company",
  loginType: "local",
  email: "company@example.com",
  companyName: "ABC 기업",
  profileImage: null,
  jobCount: 8,
  notificationCount: 7
}
```

## 사용 예시

### 1. 조건부 렌더링

```javascript
function Header() {
  const { isAuthenticated, isCompany, user } = useAuth();

  return (
    <header>
      {isAuthenticated ? (
        <>
          <span>{user.name}님 환영합니다</span>
          {isCompany && <Link to="/job-management">공고 관리</Link>}
        </>
      ) : (
        <>
          <Link to="/login">로그인</Link>
          <Link to="/signup">회원가입</Link>
        </>
      )}
    </header>
  );
}
```

### 2. 페이지 접근 제한

```javascript
function ProtectedPage() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return <div>보호된 페이지 내용</div>;
}
```

### 3. 기업 전용 페이지

```javascript
function CompanyOnlyPage() {
  const { isCompany, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isCompany) {
      navigate('/');
      alert('기업 회원만 접근 가능합니다.');
    }
  }, [isCompany, loading, navigate]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return <div>기업 전용 페이지</div>;
}
```

### 4. 로그아웃 처리

```javascript
function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      alert('로그아웃 되었습니다.');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return <button onClick={handleLogout}>로그아웃</button>;
}
```

## 주의사항

1. **AuthProvider 위치**: 반드시 Router보다 바깥에 위치해야 합니다.
2. **초기 로딩**: 컴포넌트 마운트 시 `loading`이 `true`이므로 로딩 상태를 처리해야 합니다.
3. **쿠키 기반 인증**: 백엔드에서 HttpOnly Cookie로 액세스 토큰을 관리합니다.
4. **자동 로그인**: 페이지 새로고침 시 자동으로 사용자 정보를 불러옵니다.

## 테스트

헤더 분기 처리를 테스트하려면:

```
http://localhost:3000/header-test
```

위 페이지에서 다양한 로그인 상태를 테스트할 수 있습니다.

