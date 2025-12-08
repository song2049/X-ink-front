import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, logout as logoutAPI } from '../services/api';

const AuthContext = createContext(null);

/**
 * 인증 상태 관리 Provider
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 사용자 정보 로드
  const loadUser = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔄 사용자 정보 로드 중...');
      const userData = await getCurrentUser();
      console.log('✅ 사용자 정보 로드 성공:', userData);
      setUser(userData);
    } catch (err) {
      console.error('❌ 사용자 정보 로드 실패:', err.message);
      if (err.message === 'UNAUTHORIZED') {
        setUser(null);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // 로그인 처리
  const login = (userData) => {
    console.log('🔐 로그인 처리:', userData);
    setUser(userData);
    setLoading(false);
  };

  // 로그아웃 처리
  const logout = async () => {
    try {
      await logoutAPI();
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
      // 에러가 발생해도 로컬 상태는 초기화
      setUser(null);
    }
  };

  // 컴포넌트 마운트 시 사용자 정보 로드
  useEffect(() => {
    loadUser();
  }, []);

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    isCompany: user?.userType === 'company',
    isIndividual: user?.userType === 'individual',
    isKakaoUser: user?.loginType === 'kakao',
    login,
    logout,
    refresh: loadUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * 인증 정보를 사용하기 위한 커스텀 훅
 * @returns {Object} 인증 관련 상태와 함수들
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;

